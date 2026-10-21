/**
 * [INPUT]: 依赖已登录的 gh、Node 文件 API 与 lib/public-projects.ts
 * [OUTPUT]: 更新 lib/public-projects.json 的公开自建项目快照
 * [POS]: scripts 的手动同步入口，不参与页面请求或部署鉴权
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { execFileSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { PROJECT_OWNERS, selectPublicProjects } from "../lib/public-projects.ts";

const repositories = PROJECT_OWNERS.flatMap(({ login, type }) => {
  const endpoint =
    type === "user"
      ? `users/${login}/repos?type=owner&per_page=100`
      : `orgs/${login}/repos?type=public&per_page=100`;
  const result = execFileSync("gh", ["api", endpoint, "--paginate", "--slurp"], {
    encoding: "utf8",
    maxBuffer: 16 * 1024 * 1024,
  });
  return JSON.parse(result).flat();
});

const projects = selectPublicProjects(repositories);
if (projects.length === 0) {
  throw new Error("未读取到公开自建项目，保留原快照。");
}

await writeFile(
  new URL("../lib/public-projects.json", import.meta.url),
  JSON.stringify({ syncedAt: new Date().toISOString(), projects }, null, 2) + "\n"
);
process.stdout.write(`已同步 ${projects.length} 个公开自建项目。\n`);
