/**
 * [INPUT]: 依赖 cf-workers-og 与 components/Logo
 * [OUTPUT]: 导出 renderLogo 图片响应函数
 * [POS]: server 的 logo 图片渲染器，输出 512 像素 PNG
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { ImageResponse } from "cf-workers-og/workerd";
import { Logo } from "@/components/Logo";

export function renderLogo() {
  // Generate random colors with full 6-digit hex codes
  const randomBackgroundColor = `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
  const randomLogoColor = `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

  return ImageResponse.create(
    <div
      style={{
        fontSize: 40,
        color: randomLogoColor,
        backgroundColor: randomBackgroundColor,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Logo size={256} color={randomLogoColor} background="transparent" />
    </div>,
    {
      width: 512,
      height: 512,
    }
  );
}
