import React, { useState } from 'react'
import LinkCard from './LinkCard'
import { Plus, GripVertical } from 'lucide-react'

const LinksList = ({ links = [], onAddLink, onEditLink, onDeleteLink, onReorderLinks }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [draggedIndex, setDraggedIndex] = useState(null)

  const handleEdit = (link) => {
    onEditLink?.(link)
  }

  const handleDelete = (id) => {
    onDeleteLink?.(id)
  }

  const handleDragStart = (e, index) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, index) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    // Reorder the links
    const newLinks = [...links]
    const [draggedItem] = newLinks.splice(draggedIndex, 1)
    newLinks.splice(index, 0, draggedItem)

    onReorderLinks?.(newLinks)
    setDraggedIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between md:mt-0 mt-12">
        <div>
          <h2 className="text-2xl font-heading font-bold text-light">Your Links</h2>
          <p className="text-white/60">Manage and organize your links</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isEditing
                ? 'bg-primary text-dark-900'
                : 'glass hover:bg-white/10 text-light'
            }`}
          >
            {isEditing ? 'Done' : 'Edit'}
          </button>
          <button
            onClick={() => onAddLink?.()}
            className="flex items-center space-x-2 px-4 py-2 glass rounded-lg hover:bg-primary/20 transition-colors border border-primary/30 text-light"
          >
            <Plus className="w-4 h-4" />
            <span>Add Link</span>
          </button>
        </div>
      </div>

      {/* Links Grid */}
      {links.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center border border-white/10">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <Plus className="w-8 h-8 text-dark-900" />
          </div>
          <h3 className="text-xl font-semibold text-light mb-2">No links yet</h3>
          <p className="text-white/60 mb-6">Add your first link to get started</p>
          <button
            onClick={() => onAddLink?.()}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold text-dark-900 hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            Add Your First Link
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link, index) => (
            <div
              key={link.id}
              draggable={isEditing}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`relative ${isEditing ? 'cursor-move' : ''}`}
            >
              {isEditing && (
                <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 z-10">
                  <GripVertical className="w-5 h-5 text-white/50" />
                </div>
              )}
              <LinkCard
                link={link}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isEditing={isEditing}
              />
            </div>
          ))}
        </div>
      )}

      {/* Reorder instructions */}
      {isEditing && links.length > 0 && (
        <div className="glass rounded-lg p-4 border border-primary/30">
          <p className="text-center text-white/80">
            <GripVertical className="w-4 h-4 inline mr-2" />
            Drag links to reorder them
          </p>
        </div>
      )}
    </div>
  )
}

export default LinksList
