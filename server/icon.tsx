/**
 * [INPUT]: 依赖 cf-workers-og 与本地 Twemoji SVG
 * [OUTPUT]: 导出 renderIcon、尺寸与内容类型
 * [POS]: server 的 favicon 渲染器，不依赖首页状态
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import middleFinger from "./middle-finger.svg?raw";
import { ImageResponse } from "cf-workers-og/workerd";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export function renderIcon() {
  return ImageResponse.create(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 26,
        background: "transparent",
      }}
    >
      <img src={`data:image/svg+xml;base64,${btoa(middleFinger)}`} width={26} height={26} alt="" />
    </div>,
    {
      ...size,
    }
  );
}
