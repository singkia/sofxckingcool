/**
 * [INPUT]: 依赖 Vite+、Void React 适配器与 Tailwind Vite 插件
 * [OUTPUT]: 提供统一开发、构建与测试配置
 * [POS]: 根目录的工具链入口，测试不启动 Cloudflare 运行时
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite-plus";
import { voidPlugin } from "void";
import { voidReact } from "@void/react/plugin";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  plugins: mode === "test" ? [] : [voidPlugin(), voidReact(), tailwindcss()],
  resolve: { alias: { "@": fileURLToPath(new URL(".", import.meta.url)) } },
  test: { include: ["lib/*.test.ts"] },
  fmt: {
    ignorePatterns: [
      "dist/**",
      ".void/**",
      ".next/**",
      ".open-next/**",
      ".wrangler/**",
      "pnpm-lock.yaml",
      "void.lock.json",
    ],
    semi: true,
    singleQuote: false,
    trailingComma: "es5",
    sortPackageJson: false,
  },
  lint: {
    ignorePatterns: ["dist/**", ".void/**", ".next/**", ".open-next/**", ".wrangler/**"],
    options: { typeAware: true, typeCheck: true },
    plugins: ["typescript", "react", "jsx-a11y"],
  },
}));
