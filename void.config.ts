/**
 * [INPUT]: 依赖 Void 配置能力与站点元数据
 * [OUTPUT]: 提供页面元数据、旧地址重定向与 Cloudflare 构建边界
 * [POS]: 根目录的部署声明，保留既有 Worker 名称、兼容标记与服务绑定
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { defineConfig } from "void/config";

const title = "FXCK - So Fxcking Cool | Creative Studio";
const description = "A minimalist creative studio building cool tools and public source projects.";

export default defineConfig({
  cloudflare: {
    name: "sofxckingcool",
    workers_dev: true,
    preview_urls: true,
    keep_vars: true,
    routes: [
      { pattern: "sofxcking.cool/*", zone_name: "sofxcking.cool" },
      { pattern: "www.sofxcking.cool/*", zone_name: "sofxcking.cool" },
    ],
    account_id: "02c398482d28151eb2aafa68818815ce",
    compatibility_date: "2026-03-27",
    compatibility_flags: ["nodejs_compat", "global_fetch_strictly_public"],
    observability: { enabled: true },
    assets: { binding: "ASSETS" },
    services: [{ binding: "WORKER_SELF_REFERENCE", service: "sofxckingcool" }],
  },
  inference: { appType: "void", build: "vp build" },
  routing: {
    isr: false,
    notFound: "none",
    redirects: { "/bounties": { to: "/", status: 308 } },
  },
  head: {
    title,
    htmlAttrs: { lang: "en" },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "description", content: description },
      { name: "application-name", content: "FXCK" },
      { name: "author", content: "FXCK Studio" },
      { name: "creator", content: "FXCK Studio" },
      { name: "publisher", content: "FXCK Studio" },
      { name: "robots", content: "index, follow" },
      {
        name: "googlebot",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sofxcking.cool/" },
      { property: "og:site_name", content: "FXCK" },
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: "https://sofxcking.cool/api/og" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "FXCK - geometric brand preview" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: "https://sofxcking.cool/api/og" },
    ],
    link: [{ rel: "icon", href: "/icon", type: "image/png" }],
  },
});
