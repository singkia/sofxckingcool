/**
 * [INPUT]: 依赖 Tailwind 类型与 Typography 插件
 * [OUTPUT]: 提供内容扫描与保留动画配置
 * [POS]: pages/styles.css 加载的 Tailwind 扩展
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      keyframes: {
        starwars: {
          "0%": { transform: "translateY(100vh)" },
          "100%": { transform: "translateY(-100vh)" },
        },
      },
      animation: {
        starwars: "starwars 30s linear forwards",
      },
    },
  },
  plugins: [typography],
};

export default config;
