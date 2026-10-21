/**
 * [INPUT]: 依赖 cf-workers-og、Font 与本地 Noto 字体
 * [OUTPUT]: 导出 renderOg 图片响应函数
 * [POS]: server 的 og 图片渲染器，独立生成随机品牌配色
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { ImageResponse } from "cf-workers-og/workerd";
import chineseFont from "@fontsource/noto-sans-sc/files/noto-sans-sc-chinese-simplified-400-normal.woff?inline";
import latinFont from "@fontsource/noto-sans-sc/files/noto-sans-sc-latin-400-normal.woff?inline";
import { Font } from "@/components/Font";

export function renderOg() {
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
        color: randomLogoColor,
        backgroundColor: randomBackgroundColor,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: "72px 80px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
        <Font text="SO FXCKING COOL" color={randomLogoColor} size={64} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            color: randomLogoColor,
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <div>Creative Studio</div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
              opacity: 0.9,
            }}
          >
            Jikan / Lomopic / Wordcounter / 中文简繁转换器
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          color: randomLogoColor,
          fontSize: 24,
          fontWeight: 600,
          opacity: 0.85,
        }}
      >
        sofxcking.cool
      </div>
    </div>,
    {
      fonts: [chineseFont, latinFont].map((font) => ({
        name: "Noto Sans SC",
        data: Uint8Array.from(atob(font.split(",")[1]), (char) => char.charCodeAt(0)),
        weight: 400,
        style: "normal",
      })),
      width: 1200,
      height: 630,
    }
  );
}
