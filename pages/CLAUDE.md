# pages/

> L2 | 父级: ../CLAUDE.md

成员清单
index.tsx: React 首页，渲染品牌、随机主题、站点卡片与公开源码目录。
font.tsx: 字形调试页，本地保存文本、主题与字号，宽字形在面板内滚动。
layout.tsx: Void 根布局，加载本地 Noto 字体。
styles.css: Tailwind 入口，定义图表颜色与多语言字体。
[...path].tsx: 未知页面的返回首页入口，复用随机配色与品牌字形。
[...path].server.ts: 先返回静态资源；未找到则返回 404 并禁止索引。

依赖边界
页面只消费 lib 的规则与项目快照。
Void 生成 HTML 外壳与服务端页面响应。
浏览器环境只在 effect 或事件中访问。
首页字标在 SSR 阶段按 320px 视口定尺寸。
挂载后从 lib 计算实际视口的字标尺寸。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
