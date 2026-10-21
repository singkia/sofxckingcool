/**
 * [INPUT]: 依赖 Void 环境变量声明
 * [OUTPUT]: 声明 Resend 服务端密钥与受众标识
 * [POS]: 根目录的环境契约，订阅未配置时返回 503，不阻止展示站启动
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { defineEnv, string } from "void/env";
export default defineEnv({
  RESEND_API_KEY: string().optional(),
  RESEND_AUDIENCE_ID: string().optional(),
});
