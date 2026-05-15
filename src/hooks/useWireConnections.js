import { useState, useCallback } from 'react'

/**
 * Hook for managing wire connections between components
 */
export const useWireConnections = () => {
  const [wires, setWires] = useState([])
  const [selectedTerminal, setSelectedTerminal] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const generateWireId = () =>
    `wire-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`

  const isTerminalConnectingToItself = (from, to) =>
    from.componentId === to.componentId && from.terminalId === to.terminalId

  const wireDuplicateExists = useCallback((from, to, wireList) => {
    return wireList.some(
      (wire) =>
        (wire.fromComponentId === from.componentId &&
          wire.fromTerminal === from.terminalId &&
          wire.toComponentId === to.componentId &&
          wire.toTerminal === to.terminalId) ||
        (wire.fromComponentId === to.componentId &&
          wire.fromTerminal === to.terminalId &&
          wire.toComponentId === from.componentId &&
          wire.toTerminal === from.terminalId)
    )
  }, [])

  const handleTerminalClick = useCallback(
    (componentId, terminalId, terminalName) => {
      const clickedTerminal = { componentId, terminalId, terminalName }

      setSelectedTerminal((current) => {
        if (!current) {
          return clickedTerminal
        }

        if (
          current.componentId === componentId &&
          current.terminalId === terminalId
        ) {
          return null
        }

        if (isTerminalConnectingToItself(current, clickedTerminal)) {
          return null
        }

        setWires((prevWires) => {
          if (wireDuplicateExists(current, clickedTerminal, prevWires)) {
            return prevWires
          }

          return [
            ...prevWires,
            {
              id: generateWireId(),
              fromComponentId: current.componentId,
              fromTerminal: current.terminalId,
              toComponentId: componentId,
              toTerminal: terminalId,
            },
          ]
        })

        return null
      })
    },
    [wireDuplicateExists]
  )

  const removeWire = useCallback((wireId) => {
    setWires((prev) => prev.filter((wire) => wire.id !== wireId))
  }, [])

  const removeWiresForComponent = useCallback((componentId) => {
    setWires((prev) =>
      prev.filter(
        (wire) =>
          wire.fromComponentId !== componentId &&
          wire.toComponentId !== componentId
      )
    )
  }, [])

  const updateMousePosition = useCallback((x, y) => {
    setMousePosition({ x, y })
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedTerminal(null)
  }, [])

  const clearAllWires = useCallback(() => {
    setWires([])
  }, [])

  return {
    wires,
    selectedTerminal,
    mousePosition,
    handleTerminalClick,
    clearSelection,
    removeWire,
    removeWiresForComponent,
    clearAllWires,
    updateMousePosition,
    wireDuplicateExists,
  }
}
