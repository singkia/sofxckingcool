/**
 * [INPUT]: 依赖 node:test、lib/home-layout 与 utils/colors 的首页视觉规则
 * [OUTPUT]: 对外提供首页响应式与配色可访问性测试
 * [POS]: lib 的视觉回归测试，约束 header 不溢出与弱化文字对比度
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  getHomeLogoInlineOffset,
  getHomeHeaderReservedWidth,
  getHomeLogoSize,
  getHomeLogoWidth,
  shouldShowHomeShuffleButton,
} from "./home-layout.ts";
import {
  generateRandomColors,
  getAlphaBlendedContrastRatio,
  MIN_TEXT_CONTRAST_RATIO,
  MUTED_TEXT_ALPHA,
} from "../utils/colors.ts";

function randomForHex(hex: string) {
  return (parseInt(hex, 16) + 0.01) / 16777215;
}

function withMockedRandom<T>(values: number[], callback: () => T) {
  const originalRandom = Math.random;
  let index = 0;

  Math.random = () => values[index++ % values.length] ?? 0;

  try {
    return callback();
  } finally {
    Math.random = originalRandom;
  }
}

test("home logo fits inside supported viewport widths", () => {
  for (const viewportWidth of [390, 640, 768, 1280, 1440, 1920]) {
    const logoSize = getHomeLogoSize(viewportWidth);
    const usedWidth =
      getHomeLogoWidth(logoSize) + getHomeHeaderReservedWidth(viewportWidth);

    assert.ok(
      usedWidth <= viewportWidth,
      `logo uses ${usedWidth}px in ${viewportWidth}px viewport`
    );
  }
});

test("home shuffle button stays hidden on mobile widths", () => {
  assert.equal(shouldShowHomeShuffleButton(390), false);
  assert.equal(shouldShowHomeShuffleButton(639), false);
  assert.equal(shouldShowHomeShuffleButton(640), true);
});

test("home logo shares the page content left edge", () => {
  assert.equal(getHomeLogoInlineOffset(), 0);
});

test("random colors keep muted text accessible", () => {
  const colors = withMockedRandom(
    [
      randomForHex("174b07"),
      randomForHex("5fd34a"),
      randomForHex("000000"),
      randomForHex("fefefe"),
    ],
    generateRandomColors
  );

  assert.deepEqual(colors, {
    backgroundColor: "#000000",
    textColor: "#fefefe",
  });
  assert.ok(
    getAlphaBlendedContrastRatio(
      colors.textColor,
      colors.backgroundColor,
      MUTED_TEXT_ALPHA
    ) >= MIN_TEXT_CONTRAST_RATIO
  );
});
