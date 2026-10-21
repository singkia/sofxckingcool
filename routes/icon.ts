/**
 * [INPUT]: 依赖 Void 路由与 server/icon 的图标渲染器
 * [OUTPUT]: 导出 GET /icon
 * [POS]: routes 的 favicon 入口，保持原 PNG 地址
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { defineHandler } from "void";
import { renderIcon } from "@/server/icon";
export const GET = defineHandler(() => renderIcon());
