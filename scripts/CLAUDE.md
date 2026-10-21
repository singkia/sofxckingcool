# scripts/

> L2 | 父级: ../CLAUDE.md

成员清单
clean.mjs: 固定清单清理本地产物，支持 --dry-run，拒绝符号链接越界。
smoke.mjs: HTTP 验收，验证网站卡片、项目链接、资源类型、404、PNG 与无效订阅。
sync-public-projects.mjs: GitHub CLI 分页读取指定账号，成功后覆盖公开自建项目快照。

依赖边界
项目同步复用 lib/public-projects.ts 的筛选规则。
GitHub 凭据由本机 gh 持有，不进入网页。
任一账号读取失败时，保留原快照。
清理保留源码测试、依赖、部署连接与模拟器数据。
先关闭本地开发、预览与浏览器验收会话，再清理。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
