import React, { useState } from 'react'
import { ExternalLink, Edit, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'

const LinkCard = ({ link, onEdit, onDelete, isEditing = false, onReorder }) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleEdit = () => {
    onEdit?.(link)
  }

  const handleDelete = () => {
    onDelete?.(link.id)
  }

  return (
    <motion.div
      className="glass rounded-xl p-6 border border-white/10 relative overflow-hidden group cursor-pointer"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Background glow effect on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="relative z-10">
        {/* Header with icon and actions */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            {link.icon && (
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center"
              >
                <span className="text-primary text-sm font-semibold">{link.icon}</span>
              </motion.div>
            )}
            <div>
              <h3 className="font-semibold text-light mb-1">{link.title}</h3>
              <p className="text-xs text-white/60 truncate max-w-xs">{link.url}</p>
            </div>
          </div>

          {isEditing && (
            <div className="flex space-x-2">
              <button
                onClick={handleEdit}
                className="p-1 rounded-md hover:bg-white/10 transition-colors"
                aria-label="Edit link"
              >
                <Edit className="w-4 h-4 text-white/70 hover:text-light" />
              </button>
              <button
                onClick={handleDelete}
                className="p-1 rounded-md hover:bg-red-500/20 transition-colors"
                aria-label="Delete link"
              >
                <Trash2 className="w-4 h-4 text-white/70 hover:text-red-400" />
              </button>
            </div>
          )}
        </div>

        {/* Click area */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/80">
            {link.clicks || 0} clicks
          </span>
          <ExternalLink className="w-4 h-4 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Subtle border glow */}
      <div className={`absolute inset-0 rounded-xl border-2 transition-opacity duration-300 ${
        isHovered ? 'border-primary/50 shadow-neon' : 'border-transparent'
      }`} />
    </motion.div>
  )
}

export default LinkCard
