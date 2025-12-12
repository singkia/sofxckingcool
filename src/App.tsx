import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GeometricFont } from './components/GeometricFont'
import { ProjectLinks } from './components/ProjectLinks'
import { generateRandomColors, ColorPair } from './utils/colors'

function App() {
  const [colors, setColors] = useState<ColorPair>(() => generateRandomColors())
  const [logoSize, setLogoSize] = useState(120)

  // Handle responsive logo size - doubled from original (60->120, 40->80)
  useEffect(() => {
    const updateSize = () => {
      setLogoSize(window.innerWidth < 768 ? 80 : 120)
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const handleColorChange = useCallback(() => {
    setColors(generateRandomColors())
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        className="min-h-screen w-full flex flex-col items-center justify-center gap-8 px-8 py-16"
        style={{ backgroundColor: colors.backgroundColor }}
        animate={{ backgroundColor: colors.backgroundColor }}
        transition={{ duration: 0.3 }}
      >
        {/* Geometric FXCK Logo */}
        <motion.div
          className="cursor-pointer"
          onClick={handleColorChange}
          role="button"
          aria-label="Click to change colors"
          whileTap={{ scale: 0.95 }}
        >
          <GeometricFont
            text="FXCK"
            color={colors.textColor}
            size={logoSize}
          />
        </motion.div>

        {/* Project Links */}
        <ProjectLinks color={colors.textColor} />
      </motion.div>
    </AnimatePresence>
  )
}

export default App
