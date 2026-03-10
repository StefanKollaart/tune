import { useState } from 'react'

interface UseDragType {
  draggedItem: string | null
  setDraggedItem: (itemId: string | null) => void
  dropTarget: string | null
  setDropTarget: (itemId: string | null) => void
  handleDrop: () => void
}

export function useDrag(moveItem: (songId: string, underSongId: string) => void): UseDragType {
  const [draggedItem, setDraggedItem] = useState<null | string>(null)
  const [dropTarget, setDropTarget] = useState<null | string>(null)

  const handleDrop = (): void => {
    if (draggedItem && dropTarget && draggedItem !== dropTarget) {
      moveItem(draggedItem, dropTarget)
    }

    setDraggedItem(null)
    setDropTarget(null)
  }

  return {
    draggedItem,
    setDraggedItem,
    dropTarget,
    setDropTarget,
    handleDrop
  }
}
