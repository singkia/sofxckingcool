/**
 * [INPUT]: 依赖 Void 加载器、ASSETS 绑定与头部声明
 * [OUTPUT]: 导出静态资源回退、404 加载器与禁止索引声明
 * [POS]: pages 兜底页面的服务端契约，不把未知路径伪装成成功页面
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { defineHandler, defineHead } from "void";

export const loader = defineHandler(async (context) => {
  const asset = await (context.env.ASSETS as Fetcher).fetch(context.req.raw);
  if (asset.status !== 404) return asset;
  context.status(404);
  return {};
});
export const head = defineHead(() => ({
  title: "404 — So Fxcking Cool",
  meta: [{ name: "robots", content: "noindex" }],
}));
