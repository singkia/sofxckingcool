# server/

> L2 | 父级: ../CLAUDE.md

成员清单
middle-finger.svg: Twemoji 中指图形，CC-BY 4.0，供图标离线渲染。
og.tsx: ImageResponse 分享图，复用 Font 与本地 Noto 字体，生成随机配色。
logo.tsx: ImageResponse 标识图片，复用 Logo 并输出 512 像素 PNG。
icon.tsx: ImageResponse 图标，输出 32 像素 PNG。

依赖边界
图片响应由 cf-workers-og 的 Workers 入口生成。
字形、字体与图标均随构建发布，不请求外部资产。
此目录只供 routes 引用，不供页面导入。

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
