/**
 * [INPUT]: 依赖 Void 路由与 server/logo 的图片渲染器
 * [OUTPUT]: 导出 GET /api/logo
 * [POS]: routes 的标识图片入口，保持原 PNG 地址
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { defineHandler } from "void";
import { renderLogo } from "@/server/logo";
export const GET = defineHandler(() => renderLogo());
