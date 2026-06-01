/**
 * [INPUT]: 依赖首页容器断点与品牌字形实测宽度常量
 * [OUTPUT]: 对外提供 getHomeLogoSize、getHomeLogoWidth、getHomeHeaderReservedWidth
 * [POS]: lib 的首页布局规则源，供 app/page.tsx 与视觉测试共享
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

const LOGO_WIDTH_PER_SIZE = 15.9;
const MIN_LOGO_SIZE = 20;
const SHUFFLE_BUTTON_MIN_WIDTH = 640;

function getPageInlinePadding(viewportWidth: number) {
  if (viewportWidth >= 1024) {
    return 64;
  }

  if (viewportWidth >= 768) {
    return 48;
  }

  return 32;
}

function getHeaderActionReserve(viewportWidth: number) {
  if (!shouldShowHomeShuffleButton(viewportWidth)) {
    return 0;
  }

  return viewportWidth >= 1280 ? 88 : 64;
}

function getMaxLogoSize(viewportWidth: number) {
  if (viewportWidth >= 1920) {
    return 112;
  }

  if (viewportWidth >= 1280) {
    return 82;
  }

  if (viewportWidth >= 1024) {
    return 72;
  }

  if (viewportWidth >= 640) {
    return 48;
  }

  return 36;
}

export function shouldShowHomeShuffleButton(viewportWidth: number) {
  return viewportWidth >= SHUFFLE_BUTTON_MIN_WIDTH;
}

export function getHomeHeaderReservedWidth(viewportWidth: number) {
  return (
    getPageInlinePadding(viewportWidth) + getHeaderActionReserve(viewportWidth)
  );
}

export function getHomeLogoWidth(size: number) {
  return Math.ceil(size * LOGO_WIDTH_PER_SIZE);
}

export function getHomeLogoSize(viewportWidth: number) {
  const availableWidth =
    viewportWidth - getHomeHeaderReservedWidth(viewportWidth);
  const fittedSize = Math.floor(availableWidth / LOGO_WIDTH_PER_SIZE);

  return Math.max(
    MIN_LOGO_SIZE,
    Math.min(getMaxLogoSize(viewportWidth), fittedSize)
  );
}
