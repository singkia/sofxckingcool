# lib/

> L2 | 父级: ../CLAUDE.md

成员清单
void-routing.test.ts: 页面扫描回归测试，禁止开发文档成为路由。
bounties.ts: 遗留 bounty 数据表，当前首页未消费。
home-i18n.ts: 人工维护的网站清单、locale 检测、随机 locale 与 UI 文案源，收录 Billflare。
home-i18n.test.ts: 国际化回归测试，覆盖语言检测、文案完整性与 Billflare 展示入口。
home-layout.ts: 首页响应式布局规则，按可用宽度缩放字标，计算左边线、header 占位宽度与按钮断点。
home-visual.test.ts: 视觉规则回归测试，逐像素验证 320–2560px 的 header 宽度，约束左边线、按钮断点与文字对比度。
utils.ts: cn 类名合并工具，连接 clsx 与 tailwind-merge。
public-projects.json: GitHub 公开自建项目快照，保存源码地址、项目链接与许可证标识。
public-projects.ts: 项目目录边界，按账号、公开状态、非 Fork 与排除名单筛选快照。
public-projects.test.ts: 项目目录回归测试，约束筛选、去重、补充网址、链接安全与统一展示。

依赖边界
lib 保存可测试的业务规则；pages 只消费结果，不复制算法。
项目快照由 `pnpm sync:projects` 更新。
首页不请求 GitHub，不接触 GitHub 凭据。
未标注许可证的仓库保留空值，不推断授权。
仓库未配置 homepage 时，补齐已核验的项目网址。
billflare-reports 是投稿入口，不代表网站源码。

变更日志
2026-06-01: 新增 home-layout.ts 与 home-visual.test.ts，修复首页响应式、左边线与配色规则。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
