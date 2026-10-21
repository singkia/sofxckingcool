/**
 * [INPUT]: 依赖 Void 页面扫描器与 Vite+ 测试
 * [OUTPUT]: 验证文档不会成为公开页面
 * [POS]: lib 的迁移回归保护，约束固定版本兼容补丁
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { test, expect } from "vite-plus/test";
import { scanPages } from "void/pages";

test("页面扫描排除开发文档，保留首页、字形页与兜底", async () => {
  const scan = await scanPages(process.cwd());
  expect(scan.pages.map((page) => page.componentPath).sort()).toEqual([
    "[...path].tsx",
    "font.tsx",
    "index.tsx",
  ]);
});
