import { useState, useCallback } from 'react'
import { generateComponentId, COMPONENT_TYPES } from '../data/componentRegistry'
import { clampComponentPosition } from '../utils/workspaceCoordinates'

export function usePlacedComponents(workspaceBounds) {
  const [placedComponents, setPlacedComponents] = useState([])

  const clampPosition = useCallback(
    (x, y) => clampComponentPosition(x, y, workspaceBounds),
    [workspaceBounds]
  )

  const addComponent = useCallback(
    (type, x, y) => {
      const { x: clampedX, y: clampedY } = clampPosition(x, y)
      const newComponent = {
        id: generateComponentId(type),
        type,
        x: clampedX,
        y: clampedY,
        timestamp: Date.now(),
        ...(type === COMPONENT_TYPES.SWITCH ? { switchOn: false } : {}),
      }
      setPlacedComponents((prev) => [...prev, newComponent])
      return newComponent
    },
    [clampPosition]
  )

  const toggleSwitch = useCallback((id) => {
    setPlacedComponents((prev) =>
      prev.map((comp) =>
        comp.id === id && comp.type === COMPONENT_TYPES.SWITCH
          ? { ...comp, switchOn: !comp.switchOn }
          : comp
      )
    )
  }, [])

  const updateComponent = useCallback(
    (id, x, y) => {
      const { x: clampedX, y: clampedY } = clampPosition(x, y)
      setPlacedComponents((prev) =>
        prev.map((comp) =>
          comp.id === id ? { ...comp, x: clampedX, y: clampedY } : comp
        )
      )
    },
    [clampPosition]
  )

  const removeComponent = useCallback((id) => {
    setPlacedComponents((prev) => prev.filter((comp) => comp.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setPlacedComponents([])
  }, [])

  return {
    placedComponents,
    addComponent,
    updateComponent,
    removeComponent,
    toggleSwitch,
    clearAll,
  }
}
