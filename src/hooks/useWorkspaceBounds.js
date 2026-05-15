import { useState, useEffect } from 'react'

const DEFAULT_BOUNDS = { width: 800, height: 600 }

/**
 * Tracks workspace canvas dimensions via ResizeObserver.
 */
export function useWorkspaceBounds(workspaceCanvasRef) {
  const [bounds, setBounds] = useState(DEFAULT_BOUNDS)

  useEffect(() => {
    const element = workspaceCanvasRef.current
    if (!element) return

    const updateBounds = () => {
      const { width, height } = element.getBoundingClientRect()
      if (width > 0 && height > 0) {
        setBounds({ width, height })
      }
    }

    updateBounds()

    const observer = new ResizeObserver(updateBounds)
    observer.observe(element)

    return () => observer.disconnect()
  }, [workspaceCanvasRef])

  return bounds
}
