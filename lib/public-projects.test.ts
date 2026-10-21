/**
 * [INPUT]: 依赖 Vite+ 测试、React SSR、项目规则与目录组件
 * [OUTPUT]: 验证筛选、链接安全、补充网址、快照与统一展示
 * [POS]: lib 的项目目录回归测试，防止 Fork、私有仓库和排除项目进入首页
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PublicProjects } from "../components/PublicProjects";
import { test } from "vite-plus/test";
import assert from "node:assert/strict";
import {
  normalizeWebsiteUrl,
  PROJECT_OWNERS,
  PROJECTS_SYNCED_AT,
  PUBLIC_PROJECTS,
  selectPublicProjects,
  type GitHubRepository,
} from "./public-projects.ts";

function repository(overrides: Partial<GitHubRepository> = {}): GitHubRepository {
  return {
    full_name: "singkia/example",
    owner: { login: "singkia" },
    private: false,
    visibility: "public",
    fork: false,
    description: null,
    homepage: null,
    license: null,
    archived: false,
    ...overrides,
  };
}

test("only public non-fork repositories owned by configured accounts survive", () => {
  const projects = selectPublicProjects([
    repository(),
    repository({ full_name: "singkia/fork", fork: true }),
    repository({ full_name: "singkia/private", private: true }),
    repository({ full_name: "singkia/internal", visibility: "internal" }),
    repository({ full_name: "someone/example", owner: { login: "someone" } }),
    repository({ full_name: "someone/mismatch" }),
    repository({ full_name: "singkia/unknown", fork: undefined }),
    repository({ full_name: "singkia/unknown-visibility", visibility: undefined }),
    repository({ full_name: "singkia/unknown-private", private: undefined }),
    repository({
      full_name: "daftAI2026/example",
      owner: { login: "daftAI2026" },
    }),
  ]);
  assert.deepEqual(
    projects.map(({ fullName }) => fullName),
    ["daftAI2026/example", "singkia/example"]
  );
});

test("sync deduplicates repositories and preserves source metadata", () => {
  const repo = repository({
    description: " Example ",
    homepage: "example.com",
    license: { spdx_id: "MIT" },
    archived: true,
  });
  assert.deepEqual(selectPublicProjects([repo, repo]), [
    {
      fullName: "singkia/example",
      description: "Example",
      sourceUrl: "https://github.com/singkia/example",
      websiteUrl: "https://example.com/",
      license: "MIT",
      archived: true,
    },
  ]);
});

test("missing websites and unrecognized licenses remain absent", () => {
  const [project] = selectPublicProjects([repository({ license: { spdx_id: "NOASSERTION" } })]);
  assert.equal(project.websiteUrl, null);
  assert.equal(project.license, null);
});

test("website URLs accept HTTP links but reject executable schemes and credentials", () => {
  assert.equal(normalizeWebsiteUrl(" https://example.com/a "), "https://example.com/a");
  assert.equal(normalizeWebsiteUrl("http://example.com"), "http://example.com/");
  for (const value of [
    null,
    "",
    "javascript:alert(1)",
    "data:text/html,hi",
    "ftp://example.com",
    "https://user:secret@example.com",
    "not a url",
  ]) {
    assert.equal(normalizeWebsiteUrl(value), null);
  }
});

test("the checked-in snapshot contains unique projects and valid source links", () => {
  assert.ok(Number.isFinite(Date.parse(PROJECTS_SYNCED_AT)));
  assert.ok(PUBLIC_PROJECTS.length > 0);
  assert.equal(
    new Set(PUBLIC_PROJECTS.map(({ fullName }) => fullName)).size,
    PUBLIC_PROJECTS.length
  );
  for (const project of PUBLIC_PROJECTS) {
    assert.ok(PROJECT_OWNERS.some(({ login }) => project.fullName.startsWith(`${login}/`)));
    assert.equal(project.sourceUrl, `https://github.com/${project.fullName}`);
    if (project.websiteUrl) {
      assert.equal(normalizeWebsiteUrl(project.websiteUrl), project.websiteUrl);
    }
  }
});

test("同步持续排除用户指定的 Homebrew tap", () => {
  const projects = selectPublicProjects([
    repository({ full_name: "daftAI2026/homebrew-tap", owner: { login: "daftAI2026" } }),
    repository({ full_name: "DAFTAI2026/Homebrew-Tap", owner: { login: "DAFTAI2026" } }),
    repository(),
  ]);
  assert.deepEqual(
    projects.map(({ fullName }) => fullName),
    ["singkia/example"]
  );
  assert.ok(
    PUBLIC_PROJECTS.every(({ fullName }) => fullName.toLowerCase() !== "daftai2026/homebrew-tap")
  );
});

test("项目目录统一展示，不分个人或组织", () => {
  const html = renderToStaticMarkup(createElement(PublicProjects, { locale: "zh-Hans" }));
  assert.ok(!html.includes("个人项目") && !html.includes("组织项目"));
  assert.ok(!html.includes("homebrew-tap"));
  assert.equal((html.match(/class="mt-8 grid /g) ?? []).length, 1);
  for (const project of PUBLIC_PROJECTS) assert.ok(html.includes(project.sourceUrl));
});

test("Billflare 投稿仓库在同步后保留项目网址", () => {
  const repo = repository({
    full_name: "daftAI2026/billflare-reports",
    owner: { login: "daftAI2026" },
  });
  assert.equal(selectPublicProjects([repo])[0].websiteUrl, "https://billflare.dev/");
  assert.equal(
    selectPublicProjects([{ ...repo, homepage: "https://billflare.dev/cases" }])[0].websiteUrl,
    "https://billflare.dev/cases"
  );
  assert.equal(
    PUBLIC_PROJECTS.find(({ fullName }) => fullName === repo.full_name)?.websiteUrl,
    "https://billflare.dev/"
  );
});
