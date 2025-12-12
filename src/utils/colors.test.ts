/**
 * Property-Based Tests for Color Generation Module
 * Using fast-check library
 */
import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { generateRandomColors, getContrastRatio } from './colors'

/**
 * **Feature: antiwork-style-redesign, Property 1: Color pair contrast compliance**
 * **Validates: Requirements 2.1, 2.2**
 */
describe('Property 1: Color pair contrast compliance', () => {
  it('should always generate color pairs with contrast ratio >= 4.5', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 100 }), () => {
        const { backgroundColor, textColor } = generateRandomColors()
        const contrastRatio = getContrastRatio(backgroundColor, textColor)
        expect(contrastRatio).toBeGreaterThanOrEqual(4.5)
      }),
      { numRuns: 100 }
    )
  })
})

/**
 * **Feature: antiwork-style-redesign, Property 2: Color pair format validity**
 * **Validates: Requirements 2.1**
 */
describe('Property 2: Color pair format validity', () => {
  it('should always generate valid hex color strings', () => {
    const hexColorRegex = /^#[0-9a-fA-F]{6}$/

    fc.assert(
      fc.property(fc.integer({ min: 1, max: 100 }), () => {
        const { backgroundColor, textColor } = generateRandomColors()
        expect(backgroundColor).toMatch(hexColorRegex)
        expect(textColor).toMatch(hexColorRegex)
        expect(backgroundColor.length).toBe(7)
        expect(textColor.length).toBe(7)
      }),
      { numRuns: 100 }
    )
  })
})
