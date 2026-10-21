/**
 * [INPUT]: 依赖 Void 路由、服务端环境变量、日志与 Resend
 * [OUTPUT]: 导出 POST /api/subscribe 联系人订阅接口
 * [POS]: routes 的订阅边界，保持原地址，不向客户端暴露密钥
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Resend } from "resend";
import { defineHandler } from "void";
import { env } from "void/env";
import { logger } from "void/log";

export const POST = defineHandler(async (context) => {
  const body = await context.req.json().catch(() => null);
  const email = body?.email;
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return context.json({ error: "valid email is required" }, 400);
  }
  if (!env.RESEND_API_KEY || !env.RESEND_AUDIENCE_ID) {
    return context.json({ error: "subscription is not configured" }, 503);
  }
  try {
    const resend = new Resend(env.RESEND_API_KEY);
    const data = await resend.contacts.create({
      email,
      audienceId: env.RESEND_AUDIENCE_ID,
      unsubscribed: false,
    });
    if (data.error) {
      logger.error("订阅服务拒绝创建联系人", { name: data.error.name });
      return context.json({ error: "failed to add contact to audience" }, 502);
    }
    return context.json(data);
  } catch {
    logger.error("订阅服务请求失败");
    return context.json({ error: "failed to add contact to audience" }, 500);
  }
});
