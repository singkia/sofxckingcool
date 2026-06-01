# sofxcking.cool - FXCK Studio 多语言项目展示站

Next.js 16 + React 19 + Tailwind CSS 4 + OpenNext Cloudflare + pnpm

<directory>
app/ - App Router 页面、API、全局样式与图标入口 (4子目录: api, components, font...)
components/ - 共享 React UI 与遗留组件 (1子目录: ui)
lib/ - 首页站点数据、国际化、布局规则与回归测试
utils/ - 跨页面工具函数，目前承载可访问随机配色
public/ - Cloudflare Pages 静态头配置
</directory>

<config>
package.json - pnpm 脚本、Next/OpenNext 依赖与测试入口
.gitignore - Git 忽略依赖、生成产物、Playwright 日志与本地 Codex 环境
eslint.config.mjs - ESLint/Prettier 规则与生成目录忽略表
.prettierignore - Prettier 忽略生成目录、锁文件与 Wrangler JSONC
tailwind.config.ts - Tailwind 内容扫描与动画扩展
tsconfig.json - TypeScript 严格模式、Next 插件与 @/* 路径
wrangler.jsonc - Cloudflare Workers 部署配置
open-next.config.ts - OpenNext Cloudflare 构建配置
</config>

## 架构决策

首页视觉规则进入 lib/home-layout.ts，避免组件里继续堆断点分支。
随机配色由 utils/colors.ts 统一判定，常规文字与 70% 弱化文字共享同一个 AA 下限。
模块变更必须同步 L2 CLAUDE.md；业务文件变更必须同步 L3 头部契约。

## 开发规范

修改文件后运行 `pnpm format`。
提交前至少运行 `pnpm test`、`pnpm lint`、`pnpm exec tsc --noEmit`、`pnpm exec next build`。

## 变更日志

2026-06-01: 修复首页 header 横向溢出、移动端随机按钮不可见、弱化文字对比度与 lint/test 入口。
