import { useState } from 'react'

interface useDrag {
  draggedItem: string | null
  setDraggedItem: (itemId: string | null) => void
  dropTarget: string | null
  setDropTarget: (itemId: string | null) => void
  handleDrop: () => void
}

export function useDrag(moveItem: (songId: string, underSongId: string) => void): useDrag {
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
