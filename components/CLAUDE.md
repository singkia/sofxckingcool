# components/

> L2 | 父级: ../CLAUDE.md

成员清单
Font.tsx: 几何 SVG 字形渲染器，交互字母使用原生按钮，供首页、调试页与分享图复用。
Logo.tsx: 双三角 SVG 标识，供标识图片 API 使用。
PublicProjects.tsx: 公开自建项目目录，源码与可选项目链接贴齐卡片底部。
gum-new.tsx: 遗留 Gum 标识，当前页面不引用。
ui/: 无业务状态的 Card、Slider 与 Chart 外壳。

依赖边界
Font 不决定首页响应式尺寸，尺寸属于 lib。
PublicProjects 只读 lib 快照，沿用页面主题与语言。
项目卡片使用纵向弹性布局，不固定高度。
图片接口不依赖浏览器状态。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
