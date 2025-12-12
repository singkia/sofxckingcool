/**
 * Project Links Component
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5
 */
import { motion } from 'framer-motion'

interface ProjectLink {
  name: string
  url: string
}

const projects: ProjectLink[] = [
  { name: 'Lomopic', url: 'https://www.lomopic.com/' },
  { name: 'Wordcounter', url: 'https://www.wordcounter.cv/' },
]

interface ProjectLinksProps {
  color: string
}

export function ProjectLinks({ color }: ProjectLinksProps) {
  return (
    <motion.ul
      className="list-disc pl-6"
      style={{ color }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      {projects.map((project) => (
        <li key={project.name} className="mb-2">
          <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl underline hover:no-underline transition-all"
            style={{ color }}
            whileHover={{ scale: 1.02 }}
          >
            {project.name}
          </motion.a>
        </li>
      ))}
    </motion.ul>
  )
}
