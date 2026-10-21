/**
 * [INPUT]: 依赖 React、Font、Void Link 与随机配色工具
 * [OUTPUT]: 导出 NotFound 页面
 * [POS]: pages 的兜底 404 页面，提供返回首页的导航
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
/* oxlint-disable react/set-state-in-effect -- SSR 首次渲染保持确定；挂载后同步浏览器偏好与随机主题。 */

import React, { useState, useEffect, useCallback } from "react";
import { Font } from "@/components/Font";
import { generateRandomColors } from "../utils/colors";
import { Link } from "@void/react";

export default function NotFound() {
  const [backgroundColor, setBackgroundColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [fontSize, setFontSize] = useState(60);

  const setInitialColorsForPage = useCallback(() => {
    const { backgroundColor, textColor } = generateRandomColors();
    setBackgroundColor(backgroundColor);
    setTextColor(textColor);
  }, []);

  useEffect(() => {
    setInitialColorsForPage();
  }, [setInitialColorsForPage]);

  useEffect(() => {
    document.documentElement.style.backgroundColor = backgroundColor;
    document.body.style.backgroundColor = backgroundColor;
  }, [backgroundColor]);

  useEffect(() => {
    const updateFontSize = () => {
      if (window.innerWidth >= 1280) {
        setFontSize(120);
      } else if (window.innerWidth >= 1024) {
        setFontSize(100);
      } else if (window.innerWidth >= 640) {
        setFontSize(80);
      } else {
        setFontSize(60);
      }
    };

    updateFontSize();
    window.addEventListener("resize", updateFontSize);

    return () => {
      window.removeEventListener("resize", updateFontSize);
    };
  }, []);

  return (
    <div
      className="min-h-screen font-sans transition-colors duration-300"
      style={{
        fontFamily: "Helvetica Neue, sans-serif",
        backgroundColor: backgroundColor,
        color: textColor,
      }}
    >
      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12 md:px-6 lg:px-8 lg:py-16 xl:py-24">
        <main className="flex flex-col items-center justify-center text-center">
          <div className="mb-8">
            <Font text="FOUR" color={textColor} size={fontSize} />
          </div>
          <div className="mb-8">
            <Font text="OH" color={textColor} size={fontSize} />
          </div>
          <div className="mb-12">
            <Font text="FOUR" color={textColor} size={fontSize} />
          </div>

          <p className="mb-8 text-sm sm:text-base lg:text-lg xl:text-2xl">
            this page doesn&apos;t exist, but our work does.
          </p>

          <Link
            href="/"
            className="rounded px-6 py-3 text-sm font-bold transition-colors duration-300 hover:opacity-80 sm:text-base lg:text-lg xl:px-8 xl:py-4 xl:text-xl"
            style={{
              backgroundColor: textColor,
              color: backgroundColor,
            }}
          >
            go home
          </Link>
        </main>
      </div>
    </div>
  );
}
