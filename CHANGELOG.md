# Changelog

## [2.0.0] - 2025-12-12

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
