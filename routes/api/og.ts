/**
 * [INPUT]: 依赖 Void 路由与 server/og 的图片渲染器
 * [OUTPUT]: 导出 GET /api/og
 * [POS]: routes 的分享图入口，保持原 PNG 地址
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { defineHandler } from "void";
import { renderOg } from "@/server/og";
export const GET = defineHandler(() => renderOg());
