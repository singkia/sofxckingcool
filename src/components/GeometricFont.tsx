/**
 * Geometric Font Renderer Component
 * Requirements: 1.1, 1.2
 */
import { motion } from 'framer-motion'
import { ReactElement } from 'react'

interface CharDefinition {
  width: number
  render: (color: string, size: number) => ReactElement
}

const charDefinitions: Record<string, CharDefinition> = {
  F: {
    width: 176,
    render: (color, size) => (
      <svg
        width={(212 * size) / 176}
        height={size}
        viewBox="0 0 212 176"
        preserveAspectRatio="xMidYMid meet"
      >
        <polygon points="0,0 176,0 0,88" fill={color} />
        <polygon points="0,88 176,88 0,176" fill={color} />
      </svg>
    ),
  },
  X: {
    width: 212,
    render: (color, size) => (
      <svg
        width={(212 * size) / 176}
        height={size}
        viewBox="0 0 212 176"
        preserveAspectRatio="xMidYMid meet"
      >
        <polygon points="0,0 176,0 88,88" fill={color} />
        <polygon points="0,176 176,176 88,88" fill={color} />
      </svg>
    ),
  },
  C: {
    width: 212,
    render: (color, size) => (
      <svg
        width={(212 * size) / 176}
        height={size}
        viewBox="0 0 212 176"
        preserveAspectRatio="xMidYMid meet"
      >
        <polygon points="176,0 0,88 176,176" fill={color} />
      </svg>
    ),
  },
  K: {
    width: 200,
    render: (color, size) => (
      <svg
        width={(212 * size) / 176}
        height={size}
        viewBox="0 0 212 176"
        preserveAspectRatio="xMidYMid meet"
      >
        <rect x="0" y="0" width="38" height="176" fill={color} />
        <polygon points="176,0 176,176 38,88" fill={color} />
      </svg>
    ),
  },
}

interface GeometricFontProps {
  text: string
  color: string
  size: number
}

export function GeometricFont({ text, color, size }: GeometricFontProps) {
  return (
    <motion.div
      className="flex flex-wrap justify-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {text.toUpperCase().split('').map((char, index) => {
        const charDef = charDefinitions[char]
        if (!charDef) return null

        return (
          <motion.div
            key={index}
            style={{
              width: (charDef.width * size) / 176,
              height: size,
              margin: `0 ${(10 * size) / 176}px`,
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            {charDef.render(color, size)}
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export { charDefinitions }
