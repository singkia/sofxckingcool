# sofxcking.cool

FXCK Studio 多语言项目展示站。使用 Vite+、Void、React 与 Cloudflare Workers。

## 本地运行

使用 `.node-version` 指定的 Node.js 24.22.1。

```bash
pnpm install --frozen-lockfile
pnpm dev
```

`pnpm dev` 使用 Vite+。Void 提供页面 SSR 与 API 路由。
Noto 字体随构建发布，不在浏览器或构建时依赖 Google Fonts。

## 项目清单

首页保留原有网站展示，另列 `singkia` 与 `daftAI2026` 的公开自建项目。
网站展示包含 Billflare，文案覆盖六种语言。
`billflare-reports` 是公开投稿入口，不是 Billflare 网站源码。
统一展示项目，不按个人或组织分组。
Fork、私有仓库和 `daftAI2026/homebrew-tap` 不进入清单。数据存放在 `lib/public-projects.json`，无需后台。

登录本机 GitHub CLI 后更新：

```bash
pnpm sync:projects
```

同步命令读取全部分页，两账号均成功后才覆盖快照。
项目链接取 GitHub 的 homepage 字段。字段缺失时补齐已核验网址。
Billflare 与本站网址的补充规则随同步保留。
许可证缺失时保持空值，不把公开可见视为已获得开源许可。
发布前检查快照差异。GitHub 凭据不会进入浏览器包。

## 验收

```bash
pnpm format
pnpm check
pnpm test
pnpm build
pnpm preview
# 保持预览运行，在另一终端验收
pnpm smoke
```

Vite+ 统一格式、检查、类型与测试入口。
只维护 `pnpm-lock.yaml`，不混用 npm 锁文件。

## 清理本地产物

验收结束后，先关闭开发、预览与浏览器会话。

```bash
pnpm clean --dry-run
pnpm clean
```

清理固定清单中的构建、工具缓存、测试报告与 `output/`。
命令不删除源码测试、依赖、部署连接或模拟器数据。
不清理全局缓存，不删除线上版本。
临时目录中的任务日志、下载包与一次性脚本由任务结束时删除。
清理后，运行 `pnpm build` 再启动预览。

## 部署

```bash
pnpm run deploy
```

部署由 Void 执行，目标是现有 Cloudflare Worker `sofxckingcool`。
`void.config.ts` 保存部署声明；`void.lock.json` 保存已接管资源。
`.void/` 保存本机连接信息，不提交 Git。
首次接管保留现有域名、远端密钥与 WAF，不新增数据库或缓存资源。

`/api/og`、`/api/logo`、`/icon` 保留 PNG 响应。
`/api/subscribe` 保留 Resend 联系人接口。
订阅密钥缺失时返回 503，不影响公开页面。
本地环境变量放入被 Git 忽略的 `.env`。
生产密钥通过 `pnpm exec void secret put NAME` 设置，不写入源码。

### Git 自动部署

推送 `main` 后，现有 Cloudflare Builds 自动发布。
仓库保持唯一 Git 发布连接，不新增 GitHub Actions。

| 阶段       | 命令                                                        |
| ---------- | ----------------------------------------------------------- |
| 安装与验收 | `pnpm install --frozen-lockfile && pnpm check && pnpm test` |
| 构建与发布 | `pnpm run deploy`                                           |

`pnpm run deploy` 调用 Void；Void 内部调用 Vite+ 构建。
任一检查或测试失败时，不执行发布命令。
Cloudflare 构建环境固定以下非密钥变量：

| 变量                           | 值        |
| ------------------------------ | --------- |
| `NODE_VERSION`                 | `24.22.1` |
| `PNPM_VERSION`                 | `10.8.0`  |
| `SKIP_DEPENDENCY_INSTALL`      | `1`       |
| `CLOUDFLARE_WORKERS_SUBDOMAIN` | `daftai`  |

构建令牌沿用原连接，不写入仓库。
非 `main` 分支只运行安装、检查、测试与构建：

```bash
pnpm install --frozen-lockfile && pnpm check && pnpm test && pnpm build
```

非生产部署命令为 `true`，不上传预览，不覆盖正式站。
分支构建沿用相同 Node.js、pnpm 与依赖安装变量。
只有 `main` 使用 Void 发布生产版本。

2026-10-21 的 Void 发布来自本机，GitHub 当时仍为 `128a262`。
2026-10-22 将生产构建连接切换到上述命令。
本机手动发布保留作故障恢复，不作为日常发布路径。

## 图片资产许可

`server/middle-finger.svg` 来源于 [Twemoji](https://github.com/jdecked/twemoji/blob/main/assets/svg/1f595.svg)，遵循 [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/)。
Noto 字体沿用对应 npm 包中的 SIL Open Font License。

## 技术栈迁移 · 2026-10-21

- Vite+ 1.3.0、Void 1.1.12、React 19.3.1、Tailwind CSS 4.3.3。
- 移除 Next.js、OpenNext 与未使用的旧依赖。
- 页面移至 `pages/`，API 移至 `routes/`，图片渲染器移至 `server/`。
- 所有项目数据、源码地址和原有页面能力随迁移保留。
- PNG 使用 cf-workers-og 3.0.1；移除不适用的 Vercel 图片与统计包。
- Void 1.1.12 的文档路由与状态码补丁见 `patches/CLAUDE.md`。

依据：[Void 页面](https://void.cloud/guide/pages-routing/overview)、[接管现有 Worker](https://void.cloud/integrations/cloudflare)、[Vite+](https://viteplus.dev/guide/)。

## 发布验收 · 2026-10-21

线上地址：[www.sofxcking.cool](https://www.sofxcking.cool/)。
当日发布的 Worker 版本：`f944b6e9-9a23-420f-a0d5-e7c369c9dfa9`。
5 个网站与 10 个公开项目统一展示；Fork 与 Homebrew tap 均排除。
Billflare 网站卡片与投稿仓库的项目链接均指向 billflare.dev。
源码与项目链接贴齐卡片底部，不固定卡片高度。
线上 1280 与 390 像素视口的链接底部间距一致。
20 项测试、类型检查与生产 HTTP 验收通过。
`pnpm audit` 未报告已知漏洞。
六种语言在 390 像素视口内无页面横向溢出。
字标取消强制最小字号，SSR 按 320px 视口起步。
六种语言在 320px 视口无横向溢出。
禁用 JavaScript 的 320px 首屏无横向溢出。
404 页在 320px 视口验收通过。
尺寸测试逐像素覆盖 320–2560px。
现有域名路由与预览可见性保留；WAF 规则未修改。
Resend 密钥原先未配置，订阅接口仍不可发送。

```bash
pnpm smoke https://www.sofxcking.cool
pnpm exec void project status
# 仅需撤销 Billflare 收录时，回滚至上一 Void 版本
pnpm exec void project rollback e3db0fe7-7bbe-452c-ad12-cf2e161c6043 --platform cloudflare
```

迁移前的 Next.js 版本为 `f7b49515-dee8-4375-901b-47595ddb1d6e`。
回滚会恢复对应代码，不清空 WAF。

## CPU 调查 · 2026-10-22

以下时间均为北京时间。此次调查未发布新版本。

历史四次 `exceededCpu` 均发生在旧版 `f7b49515`。
请求路径分别为 `/shop/.env`、`/sendgrid_settings.yml`、
`/config/.env.email` 与 `/test.php`。
CPU 分别为 26、13、12、18 ms，HTTP 均为 503。
这些是请求路径，不证明对应文件存在。
旧版 Worker 将非图片请求交给 OpenNext 页面入口。
当时没有 CPU 剖析，不能把开销归因到某个渲染函数。

新版 `f944b6e9` 自 10 月 21 日 19:43:22 起承接全部生产流量。
截至 10 月 22 日 00:16:08，查询返回 343 条调用日志。
这些日志均为 `ok`，未出现 `exceededCpu`。
日志条数不是全量请求指标，不能据此保证今后不超限。

生产验收使用串行、有限次数的 GET 请求。
下表由响应 CF-Ray 与调用日志逐条关联。

| 路径                            | HTTP | CPU    | CF-Ray 标识        |
| ------------------------------- | ---- | ------ | ------------------ |
| `/font`                         | 200  | 38 ms  | `a4e189d19ec1067d` |
| `/cpu-audit-not-found-20261022` | 404  | 10 ms  | `a4e189db595f95ba` |
| `/shop/.env`                    | 404  | 4 ms   | `a4e189e3cd3ae39d` |
| `/sendgrid_settings.yml`        | 404  | 53 ms  | `a4e189ebb8a062db` |
| `/config/.env.email`            | 404  | 5 ms   | `a4e189f67cd7e35f` |
| `/test.php`                     | 404  | 5 ms   | `a4e189fd88d8fd4a` |
| `/api/og`                       | 200  | 826 ms | `a4e18a050bd028ec` |
| `/api/logo`                     | 200  | 144 ms | `a4e18a11bbcb634b` |
| `/icon`                         | 200  | 6 ms   | `a4e18a1d2d6d26cc` |

首页返回 200，包含 Billflare 与构建资源地址。
三个图片接口均返回原约定尺寸的 PNG。
旧版与新版预览地址的两组未知路径也均返回 404。
预览调用未返回可关联 CPU 日志，不据此计算性能改善。

本地重新构建的 28 个拆分模块与线上逐字节一致。
入口差异仅为 Void 发布时注入的版本元数据绑定。
静态响应头与线上一致。
检查、20 项测试、构建和本地完整 HTTP 验收均通过。

结论：已定位历史超限，但本轮未复现新的资源超限。
当前 404 仍执行 SSR，动态图片仍在请求时生成。
53 ms 的 404 与 826 ms 的分享图表明 CPU 风险尚存。
[Cloudflare 免费计划](https://developers.cloudflare.com/workers/platform/limits/#cpu-time)的 CPU 限额为每请求 10 ms。
成功响应不等于开销已低于限额。
上述 CPU 调查阶段未修改运行时代码、WAF、套餐或构建连接。
未制造回归测试失败，也未声称已根治。
后续优化须先复现并测量，再保留失败转成功的回归测试。
