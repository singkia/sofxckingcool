# sofxcking.cool - FXCK Studio 多语言项目展示站

Vite+ 1.3.0 + Void 1.1.12 + React 19.3.1 + Tailwind CSS 4.3.3 + Cloudflare Workers

<directory>
pages/ - Void 页面、根布局与全局样式
routes/ - 保持原地址的图片与订阅 API
server/ - 仅服务端使用的 PNG 图片渲染器
components/ - 品牌组件、源码目录与共享 UI (1子目录: ui)
lib/ - 站点数据、项目快照、国际化、布局规则与测试
utils/ - 跨页面可访问随机配色
scripts/ - 项目同步、HTTP 验收与本地产物清理
patches/ - 固定版本的路由兼容补丁
public/ - Cloudflare 静态资源头
</directory>

<config>
package.json - 本地 vp 与 void 命令、依赖和 Node 版本要求
pnpm-lock.yaml - 唯一依赖锁文件
pnpm-workspace.yaml - Vite+ 版本目录与构建脚本白名单
void.lock.json - Void 迁移来源与已接管资源
components.json - UI 生成器的客户端组件与样式路径
vite.config.ts - Void React、Tailwind、测试、检查与格式配置
void.config.ts - 站点元数据、重定向与部署声明
env.ts - 仅服务端可读的 Resend 环境变量
.node-version - Void 所需 Node.js 24.21.0
.gitignore - 忽略依赖、构建产物与本地凭据
tsconfig.json - 严格类型、Void 生成类型与 @/* 路径
tailwind.config.ts - Typography 与保留的动画扩展
</config>

## 架构决策

Vite+ 统一开发、构建、测试、检查与格式。
Void 负责页面、API 与 Cloudflare 部署。
部署声明保留根域名和 www 的现有路由。
workers.dev 与版本预览沿用原启用状态。
不使用 Next.js、OpenNext 或第二套构建器。
页面 SSR 保留可索引内容，浏览器负责随机主题。
首页视觉规则归 lib/home-layout.ts。
页面 padding 统一决定 logo 左边线。
utils/colors.ts 保证文字与弱化文字满足 AA。
公开源码目录只收录指定账号创建的公开仓库。
筛选规则排除 Fork、私有仓库与其他账号。
排除 daftAI2026/homebrew-tap，后续同步不恢复。
页面统一展示项目，不按个人或组织分组。
页面只读静态快照，不请求 GitHub。
项目链接取 GitHub homepage，缺失时补齐已核验网址。
同步失败时保留原快照。
Noto 字体由本地 npm 包提供，不在构建时请求 Google。
图片渲染器只由 routes 导入，不进入浏览器包。
Void 路由兼容补丁见 patches/CLAUDE.md。
模块变更同步 L2；业务文件变更同步 L3。

## Cloudflare WAF 边界

站点级 WAF 在应用 Worker 前拒绝凭据探测。
仅匹配 `sofxcking.cool` 与 `www.sofxcking.cool`。
阶段为 `http_request_firewall_custom`。
规则集 ID：`0d89b022455c4d1b8a02da18ff0b4a20`。
规则 ref：`sofxckingcool_credential_file_probes`。
动作是 `block`，表达式如下：

```text
(http.host in {"sofxcking.cool" "www.sofxcking.cool"} and lower(http.request.uri.path) in {"/credentials.json" "/google-credentials.json" "/gcp-credentials.json" "/application_default_credentials.json"})
```

不封 IP、ASN 或国家，不修改全站机器人设置。
子域不受此规则约束，包括 `umami.sofxcking.cool`。
配置独立于 Wrangler 制品，不部署应用代码。
CLI 变更先校验 zone 范围与 `--validate-only`。
发布后读回规则，再验收拦截与正常访问。
回滚只停用此 ref，不清空其他规则。
此防护不等于 SSR CPU 优化。

依据：[Cloudflare 自定义规则](https://developers.cloudflare.com/waf/custom-rules/create-api/)。

## 开发规范

使用 .node-version 指定的 Node.js。
修改后运行 `pnpm format`。
验收运行 `pnpm check`、`pnpm test`、`pnpm build`。
部署使用 `pnpm run deploy`，不手工上传生成目录。
现有 Cloudflare Builds 连接 GitHub main。
main 推送先执行锁文件安装、检查与测试。
验收通过后，Cloudflare 执行 pnpm run deploy。
Void 内部执行 Vite+ 构建，再发布生产版本。
构建环境与命令见 README 的 Git 自动部署章节。
复用现有构建连接，不新增第二条发布通道。
验收完成后关闭本项目的本地服务与浏览器会话。
运行 `pnpm clean`，移除构建、缓存与验收输出。
清除任务创建的临时日志、下载包与一次性脚本。
保留源码测试、部署连接、本地数据与未提交变更的备份。

## 变更日志

2026-10-22: 将现有 Git main 发布入口统一为 Void。

2026-10-21: 升级稳定依赖，新增 10 个公开自建项目，迁移 Vite+ 与 Void。
2026-06-01: 修复首页布局、随机按钮与弱化文字对比度。
