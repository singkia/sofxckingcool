# app/components/

> L2 | 父级: /Users/luo/Desktop/ClaudeCode/web/sofxckingcool/app/CLAUDE.md

成员清单
Font.tsx: 几何 SVG 字形渲染器，接收 text/color/size 与可选 O 字母交互参数。
Logo.tsx: 旧 Gum 风格 logo 组件，保留 `.new` 徽标展示能力。

依赖边界
Font.tsx 只负责字形，不决定首页响应式尺寸；尺寸规则属于 lib/home-layout.ts。

变更日志
2026-06-01: 为 Font.tsx 补充 L3 契约，明确布局规则外置。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
