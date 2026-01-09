# Changelog

## [0.0.3] - 2025-01-09

### Added
- 新项目链接：中文简繁体转换器 (https://cc.sofxcking.cool/)
- `sitemap.xml` 站点地图
- 结构化数据 (JSON-LD): Organization, WebSite, ItemList
- 完整的 Twitter Card 标签
- AI 爬虫支持 (GPTBot, Claude-Web, PerplexityBot 等)

### Changed
- 优化 SEO meta 标签，更新 title 和 description
- 更新 `robots.txt`，修正 sitemap 指向
- 更新 `llms.txt` 为 FXCK 站点信息

## [0.0.2] - 2025-12-13

### Added
- `public/` 文件夹用于静态资源
- `robots.txt` 和 `llms.txt` 移至 public 目录

### Fixed
- `.gitignore` 添加 `dist/` 忽略构建产物

## [0.0.1] - 2025-12-12

### Added
- Umami Analytics 统计脚本

## [0.0.0] - 2025-12-12

### 🚀 Major Redesign - Antiwork Style

完全重构为现代 React 技术栈，参考 antiwork.com 风格。

### Changed
- **技术栈升级**: 从纯 HTML/JS 迁移到 Vite + React + TypeScript
- **UI 框架**: 添加 Tailwind CSS v4、Framer Motion、Radix UI
- **Logo 大小**: 翻倍 (桌面 120px, 移动端 80px)
- **布局**: 水平垂直居中，极简风格

### Added
- React 19.1 + TypeScript 5.8
- Vite 7.0 构建工具
- Tailwind CSS 4.1 样式
- Framer Motion 12.15 动画
- 几何风格 SVG 字体组件 (GeometricFont)
- WCAG AA 无障碍颜色对比度 (≥4.5:1)
- 属性测试 (fast-check 4.4)

### Removed
- 旧的 effects 目录 (crt.html, gradient.html)
- iframe 随机效果加载器

### Tech Stack
```
react: ^19.1.0
typescript: ^5.8.3
vite: ^7.0.0
tailwindcss: ^4.1.10
framer-motion: ^12.15.0
@radix-ui/react-slot: ^1.2.3
vitest: ^4.0.15
fast-check: ^4.4.0
```
