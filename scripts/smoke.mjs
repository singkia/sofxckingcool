/**
 * [INPUT]: 依赖运行中的站点、网站清单、公开项目快照与 Node 断言
 * [OUTPUT]: 验证 SSR、静态资源、404、重定向与 PNG 尺寸
 * [POS]: scripts 的部署验收入口，不提交有效订阅或修改远端数据
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import assert from "node:assert/strict";
import snapshot from "../lib/public-projects.json" with { type: "json" };
import { SITES } from "../lib/home-i18n.ts";

const base = process.argv[2] ?? "http://127.0.0.1:4173";
const request = (path, options = {}) =>
  fetch(new URL(path, base), {
    signal: AbortSignal.timeout(30000),
    redirect: "manual",
    ...options,
  });

const home = await request("/");
assert.equal(home.status, 200, "首页响应");
const html = await home.text();
for (const site of SITES) {
  assert.ok(html.includes(site.url), `缺少网站地址：${site.id}`);
  assert.ok(html.includes(site.copies.en.title), `缺少网站卡片：${site.id}`);
}
assert.ok(!html.includes("homebrew-tap"), "排除 Homebrew tap");
assert.ok(
  !html.includes("Personal projects") && !html.includes("Organization projects"),
  "目录不按账号分组"
);
for (const project of snapshot.projects) {
  assert.ok(html.includes(project.sourceUrl), `缺少源码地址：${project.fullName}`);
  if (project.websiteUrl)
    assert.ok(html.includes(project.websiteUrl), `缺少网址：${project.fullName}`);
}
for (const path of ["/font"]) assert.equal((await request(path)).status, 200, path);
for (const path of ["/migration-smoke-missing", "/CLAUDE.md", "/pages/CLAUDE.md"]) {
  assert.equal((await request(path)).status, 404, path);
}
const missing = await request("/migration-smoke-missing", { headers: { "X-VoidPages": "true" } });
assert.equal(missing.status, 404, "客户端导航也必须返回 404");
const redirect = await request("/bounties");
assert.equal(redirect.status, 308);
assert.equal(new URL(redirect.headers.get("location"), base).pathname, "/");
const assets = [
  ...new Set(
    [...html.matchAll(/(?:src|href)="(\/assets\/[^"?]+\.(?:js|css))"/g)].map((match) => match[1])
  ),
];
assert.ok(assets.length > 0, "构建资源链接");
for (const path of assets) {
  const asset = await request(path);
  assert.equal(asset.status, 200, path);
  assert.match(
    asset.headers.get("content-type"),
    path.endsWith(".js") ? /javascript/ : /text\/css/
  );
}
for (const [path, width, height] of [
  ["/api/og", 1200, 630],
  ["/api/logo", 512, 512],
  ["/icon", 32, 32],
]) {
  const image = await request(path);
  assert.equal(image.status, 200, path);
  assert.match(image.headers.get("content-type"), /image\/png/);
  const bytes = Buffer.from(await image.arrayBuffer());
  assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a", path);
  assert.equal(bytes.readUInt32BE(16), width, path);
  assert.equal(bytes.readUInt32BE(20), height, path);
}
for (const body of ["{}", "{", '{"email":"invalid"}']) {
  const result = await request("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  assert.equal(result.status, 400, "无效订阅不得发送邮件");
}
process.stdout.write(
  `验收通过：${base}，${SITES.length} 个网站，${snapshot.projects.length} 个公开项目，${assets.length} 个页面资源，3 个 PNG 接口。\n`
);
