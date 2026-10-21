/**
 * [INPUT]: 依赖 Node 文件 API、固定产物清单与可选 --dry-run 参数
 * [OUTPUT]: 预览或删除项目内可再生成的构建、缓存与验收输出
 * [POS]: scripts 的收尾入口，保留源码、依赖、部署连接与本地数据
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { lstatSync, realpathSync, rmSync } from "node:fs";
import { dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
if (args.some((arg) => arg !== "--dry-run")) {
  throw new Error("只接受 --dry-run；不接受自定义删除路径。");
}
const dryRun = args.includes("--dry-run");
const root = realpathSync(fileURLToPath(new URL("../", import.meta.url)));

// ---- 只清理可再生成的产物，不清空 .void、.wrangler 或 node_modules ----
const artifacts = [
  ".next",
  ".open-next",
  "dist",
  "build",
  "out",
  "coverage",
  "test-results",
  "playwright-report",
  "output",
  ".playwright-cli",
  ".playwright-mcp",
  ".vite",
  ".vitest",
  "node_modules/.vite",
  "node_modules/.vite-temp",
  "node_modules/.vitest-cache",
  "node_modules/.cache",
  ".wrangler/tmp",
  ".wrangler/deploy",
  ".void-wrangler.jsonc",
  ".void/preview-deploy-config.json",
  "tsconfig.tsbuildinfo",
].filter((path) => lstatSync(resolve(root, path), { throwIfNoEntry: false }));

// ---- 先校验所有父目录，拒绝沿符号链接删除项目外文件 ----
for (const path of artifacts) {
  const parent = realpathSync(dirname(resolve(root, path)));
  if (parent !== root && !parent.startsWith(`${root}${sep}`)) {
    throw new Error(`拒绝清理项目外路径：${path}`);
  }
}

for (const path of artifacts) {
  if (!dryRun) rmSync(resolve(root, path), { recursive: true, force: true });
  process.stdout.write(`${dryRun ? "将清理" : "已清理"}：${path}\n`);
}
process.stdout.write(`${dryRun ? "待清理" : "已清理"} ${artifacts.length} 项产物。\n`);
