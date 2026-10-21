/**
 * [INPUT]: 依赖 GitHub 仓库元数据、已核验网址与 public-projects.json 快照
 * [OUTPUT]: 提供公开自建项目、账号范围与快照转换函数
 * [POS]: lib 的源码目录边界，首页只读快照，同步脚本筛除私有仓库、Fork 与排除名单
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import snapshot from "./public-projects.json" with { type: "json" };

export const PROJECT_OWNERS = [
  { login: "singkia", type: "user" },
  { login: "daftAI2026", type: "org" },
] as const;

export interface PublicProject {
  fullName: string;
  description: string | null;
  sourceUrl: string;
  websiteUrl: string | null;
  license: string | null;
  archived: boolean;
}

export interface GitHubRepository {
  full_name: string;
  owner: { login: string };
  private?: boolean;
  visibility?: string;
  fork?: boolean;
  description: string | null;
  homepage: string | null;
  license: { spdx_id: string } | null;
  archived: boolean;
}

// ---- 用户指定不展示的项目，后续同步仍排除 ----
const EXCLUDED_PROJECTS = new Set(["daftai2026/homebrew-tap"]);

// ---- 已核验的补充网址：仅在仓库未配置 homepage 时使用 ----
const WEBSITE_OVERRIDES: Record<string, string> = {
  "singkia/sofxckingcool": "https://sofxcking.cool/",
  "daftAI2026/billflare-reports": "https://billflare.dev/",
};

export const PUBLIC_PROJECTS: readonly PublicProject[] = snapshot.projects;
export const PROJECTS_SYNCED_AT = snapshot.syncedAt;

export function normalizeWebsiteUrl(value: string | null): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) {
      return null;
    }
    return url.href;
  } catch {
    return null;
  }
}

export function selectPublicProjects(repositories: readonly GitHubRepository[]): PublicProject[] {
  const projects = new Map<string, PublicProject>();

  for (const repo of repositories) {
    const owner = PROJECT_OWNERS.find(
      ({ login }) => login.toLowerCase() === repo.owner.login.toLowerCase()
    );
    if (
      !owner ||
      EXCLUDED_PROJECTS.has(repo.full_name.toLowerCase()) ||
      repo.private !== false ||
      repo.visibility !== "public" ||
      repo.fork !== false ||
      !repo.full_name.toLowerCase().startsWith(`${owner.login.toLowerCase()}/`)
    ) {
      continue;
    }

    const license = repo.license?.spdx_id;
    projects.set(repo.full_name.toLowerCase(), {
      fullName: repo.full_name,
      description: repo.description?.trim() || null,
      sourceUrl: `https://github.com/${repo.full_name}`,
      websiteUrl: normalizeWebsiteUrl(repo.homepage || WEBSITE_OVERRIDES[repo.full_name] || null),
      license: license && license !== "NOASSERTION" ? license : null,
      archived: repo.archived,
    });
  }

  return [...projects.values()].sort((a, b) => a.fullName.localeCompare(b.fullName, "en"));
}
