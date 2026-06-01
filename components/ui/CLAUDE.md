# components/ui/

> L2 | 父级: /Users/luo/Desktop/ClaudeCode/web/sofxckingcool/components/CLAUDE.md

成员清单
card.tsx: Card 组件族，rounded-lg 边框容器与 header/content/footer 分区。
chart.tsx: Recharts 包装层，提供 chart config、context 与 tooltip/legend。
slider.tsx: Radix Slider 包装层，提供统一 track/range/thumb 样式。

依赖边界
ui 组件不持有站点业务状态；调用方通过 className 与 style 注入主题。

变更日志
2026-06-01: Card 从 rounded-xl 调整为 rounded-lg，保持卡片半径不超过 8px。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
