/**
 * [INPUT]: 依赖 WCAG 相对亮度公式与十六进制颜色字符串
 * [OUTPUT]: 对外提供 generateRandomColors、isAccessibleColorPair、对比度计算工具
 * [POS]: utils 的主题配色源，供首页与测试共享随机色可访问性规则
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

export const MIN_TEXT_CONTRAST_RATIO = 4.5;
export const MUTED_TEXT_ALPHA = 0.7;

const HEX_COLOR_PATTERN = /^#[0-9a-f]{6}$/i;
const MAX_COLOR_VALUE = 16777215;

function generateRandomColor() {
  return `#${Math.floor(Math.random() * MAX_COLOR_VALUE)
    .toString(16)
    .padStart(6, "0")}`;
}

function getRelativeLuminance(color: string) {
  const rgb = parseInt(color.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  const [rr, gg, bb] = [r, g, b].map((channel) => {
    const value = channel / 255;

    return value <= 0.03928
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rr + 0.7152 * gg + 0.0722 * bb;
}

export function isHexColor(color: string) {
  return HEX_COLOR_PATTERN.test(color);
}

export function getContrastRatio(color1: string, color2: string) {
  const l1 = getRelativeLuminance(color1);
  const l2 = getRelativeLuminance(color2);

  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

export function blendHexColors(
  foregroundColor: string,
  backgroundColor: string,
  alpha: number
) {
  const foreground = parseInt(foregroundColor.slice(1), 16);
  const background = parseInt(backgroundColor.slice(1), 16);
  const channels = [16, 8, 0].map((shift) => {
    const foregroundChannel = (foreground >> shift) & 0xff;
    const backgroundChannel = (background >> shift) & 0xff;

    return Math.round(
      foregroundChannel * alpha + backgroundChannel * (1 - alpha)
    );
  });

  return `#${channels
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`;
}

export function getAlphaBlendedContrastRatio(
  foregroundColor: string,
  backgroundColor: string,
  alpha: number
) {
  return getContrastRatio(
    blendHexColors(foregroundColor, backgroundColor, alpha),
    backgroundColor
  );
}

export function isAccessibleColorPair(
  backgroundColor: string,
  textColor: string
) {
  return (
    isHexColor(backgroundColor) &&
    isHexColor(textColor) &&
    getContrastRatio(backgroundColor, textColor) >= MIN_TEXT_CONTRAST_RATIO &&
    getAlphaBlendedContrastRatio(
      textColor,
      backgroundColor,
      MUTED_TEXT_ALPHA
    ) >= MIN_TEXT_CONTRAST_RATIO
  );
}

export const generateRandomColors = () => {
  let backgroundColor: string;
  let textColor: string;

  do {
    backgroundColor = generateRandomColor();
    textColor = generateRandomColor();
  } while (!isAccessibleColorPair(backgroundColor, textColor));

  return { backgroundColor, textColor };
};

export const hexToTailwindBg = (hexColor: string): string => {
  return `bg-[${hexColor}]`;
};

export const hexToTailwindText = (hexColor: string): string => {
  return `text-[${hexColor}]`;
};
