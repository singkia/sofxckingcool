/**
 * Property-Based Tests for Geometric Font Renderer
 * Using fast-check library
 */
import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { charDefinitions } from './GeometricFont'

const supportedChars = Object.keys(charDefinitions)

/**
 * **Feature: antiwork-style-redesign, Property 3: SVG letter rendering produces valid output**
 * **Validates: Requirements 1.2**
 */
describe('Property 3: SVG letter rendering produces valid output', () => {
  const supportedCharArb = fc.constantFrom(...supportedChars)
  const hexColorArb = fc
    .array(
      fc.constantFrom('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'),
      { minLength: 6, maxLength: 6 }
    )
    .map((arr) => `#${arr.join('')}`)
  const sizeArb = fc.integer({ min: 10, max: 200 })

  it('should have render function for all supported characters', () => {
    fc.assert(
      fc.property(supportedCharArb, (char) => {
        const charDef = charDefinitions[char]
        expect(charDef).toBeDefined()
        expect(typeof charDef.render).toBe('function')
        expect(typeof charDef.width).toBe('number')
      }),
      { numRuns: 100 }
    )
  })

  it('should return valid JSX element with correct props', () => {
    fc.assert(
      fc.property(supportedCharArb, hexColorArb, sizeArb, (char, color, size) => {
        const charDef = charDefinitions[char]
        const result = charDef.render(color, size) as { type: string; props: { height: number } }
        
        // Check it's a valid React element
        expect(result).toBeDefined()
        expect(result.type).toBe('svg')
        expect(result.props.height).toBe(size)
      }),
      { numRuns: 100 }
    )
  })
})
