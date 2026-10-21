/**
 * [INPUT]: 依赖全局样式、本地 Noto 字体
 * [OUTPUT]: 导出 RootLayout 页面布局
 * [POS]: pages 的根布局，Void 生成 HTML 外壳，此处只包裹页面内容
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import "./styles.css";
import "@fontsource/noto-sans-sc/400.css";
import "@fontsource/noto-sans-sc/700.css";
import "@fontsource/noto-sans-tc/400.css";
import "@fontsource/noto-sans-tc/700.css";
import "@fontsource/noto-sans-jp/400.css";
import "@fontsource/noto-sans-jp/700.css";
import "@fontsource/noto-sans-kr/400.css";
import "@fontsource/noto-sans-kr/700.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
