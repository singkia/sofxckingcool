# routes/api/

> L2 | 父级: ../CLAUDE.md

成员清单
og.ts: GET /api/og，调用分享图渲染器。
logo.ts: GET /api/logo，调用标识图片渲染器。
subscribe.ts: POST /api/subscribe，校验邮件并通过 Resend 创建联系人。

依赖边界
图片 JSX 位于 server，不进入浏览器依赖。
订阅密钥只从 void/env 读取。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
