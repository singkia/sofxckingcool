/**
 * [INPUT]: 依赖 clsx 与 tailwind-merge
 * [OUTPUT]: 导出 cn 类名合并函数
 * [POS]: lib 的样式工具，统一条件类名与 Tailwind 冲突规则
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
