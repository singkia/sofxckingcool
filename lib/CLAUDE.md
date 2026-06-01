# lib/

> L2 | 父级: /Users/luo/Desktop/ClaudeCode/web/sofxckingcool/CLAUDE.md

成员清单
bounties.ts: 遗留 bounty 数据表，当前首页未消费。
home-i18n.ts: 首页站点清单、locale 检测、随机 locale 与 UI 文案源。
home-i18n.test.ts: 国际化回归测试，覆盖语言检测与文案完整性。
home-layout.ts: 首页响应式布局规则，计算品牌字形尺寸、logo 左边线、header 占位宽度与随机按钮断点。
home-visual.test.ts: 视觉规则回归测试，约束 header 宽度、logo 左边线、随机按钮断点与弱化文字对比度。
utils.ts: cn 类名合并工具，连接 clsx 与 tailwind-merge。

依赖边界
lib 保存可测试的业务规则；app 只消费结果，不复制算法。

变更日志
2026-06-01: 新增 home-layout.ts 与 home-visual.test.ts，修复首页响应式、左边线与配色规则。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
