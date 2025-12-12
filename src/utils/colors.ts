/**
 * Color Generation Module
 * Requirements: 2.1, 2.2
 */

export interface ColorPair {
  backgroundColor: string
  textColor: string
}

/**
 * Calculate relative luminance of a color (WCAG formula)
 */
export function getLuminance(color: string): number {
  const rgb = parseInt(color.slice(1), 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = (rgb >> 0) & 0xff
  const [rr, gg, bb] = [r, g, b].map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rr + 0.7152 * gg + 0.0722 * bb
}

/**
 * Calculate contrast ratio between two colors (WCAG formula)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const l1 = getLuminance(color1)
  const l2 = getLuminance(color2)
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

/**
 * Generate a random hex color
 */
export function generateRandomColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
}

/**
 * Generate a random color pair that meets WCAG AA contrast requirements
 */
export function generateRandomColors(): ColorPair {
  let backgroundColor: string
  let textColor: string
  let iterations = 0
  const maxIterations = 1000

  do {
    backgroundColor = generateRandomColor()
    textColor = generateRandomColor()
    iterations++
  } while (getContrastRatio(backgroundColor, textColor) < 4.5 && iterations < maxIterations)

  // Fallback to safe colors if max iterations reached
  if (iterations >= maxIterations) {
    backgroundColor = '#000000'
    textColor = '#ffffff'
  }

  return { backgroundColor, textColor }
}
