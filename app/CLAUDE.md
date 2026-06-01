# app/

> L2 | 父级: /Users/luo/Desktop/ClaudeCode/web/sofxckingcool/CLAUDE.md

成员清单
globals.css: Tailwind 4 入口与 chart CSS 变量，支撑全站样式基础。
layout.tsx: Next Metadata 与 RootLayout，注入 Vercel Analytics。
page.tsx: 首页客户端入口，渲染品牌字形、随机主题与项目卡片。
not-found.tsx: 404 客户端页面，复用几何字形与随机主题。
icon.tsx: Next 动态图标入口，生成站点 favicon。
api/: 动态 API 路由，输出 OG 图、logo 与订阅能力。
components/: App 内品牌组件，封装几何字形与旧 logo。
font/: 几何字体调试工具页，编辑文本、主题与字号。

依赖边界
app/page.tsx 只消费 lib 的数据/规则与 utils 的配色，不直接复制布局或颜色算法。

变更日志
2026-06-01: 首页接入 lib/home-layout，随机按钮在移动端可见，URL 配色需通过可访问性校验。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
