/**
 * Canonical workspace-relative coordinate helpers.
 * All positions use the workspace canvas element as origin (top-left).
 */

export const DEFAULT_COMPONENT_SIZE = 80

/**
 * Convert viewport/client coordinates to workspace-local coordinates.
 */
export const clientToWorkspace = (clientX, clientY, workspaceEl) => {
  const rect = workspaceEl.getBoundingClientRect()
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  }
}

/**
 * Clamp a component top-left position inside workspace bounds.
 */
export const clampComponentPosition = (
  x,
  y,
  bounds,
  componentSize = DEFAULT_COMPONENT_SIZE
) => {
  const maxX = Math.max(0, bounds.width - componentSize)
  const maxY = Math.max(0, bounds.height - componentSize)

  return {
    x: Math.max(0, Math.min(x, maxX)),
    y: Math.max(0, Math.min(y, maxY)),
  }
}

/**
 * Center a drop point on the component box, then clamp to bounds.
 */
export const centerAndClampDrop = (
  workspaceX,
  workspaceY,
  bounds,
  componentSize = DEFAULT_COMPONENT_SIZE
) => {
  return clampComponentPosition(
    workspaceX - componentSize / 2,
    workspaceY - componentSize / 2,
    bounds,
    componentSize
  )
}

/**
 * Resolve drop position from a dnd-kit drag end event (workspace-relative).
 */
export const getDropPositionFromDragEvent = (event, workspaceEl) => {
  const translated = event.active?.rect?.current?.translated

  if (translated) {
    return clientToWorkspace(
      translated.left + translated.width / 2,
      translated.top + translated.height / 2,
      workspaceEl
    )
  }

  const activator = event.activatorEvent
  if (activator && 'clientX' in activator) {
    return clientToWorkspace(
      activator.clientX + event.delta.x,
      activator.clientY + event.delta.y,
      workspaceEl
    )
  }

  const rect = workspaceEl.getBoundingClientRect()
  return { x: rect.width / 2, y: rect.height / 2 }
}

/**
 * Terminal position in workspace coordinates (component top-left + terminal offset).
 */
export const getTerminalWorkspacePosition = (component, terminalId, config) => {
  const terminalDef = config.terminals.find((t) => t.id === terminalId)
  if (!terminalDef) return null

  return {
    x: component.x + terminalDef.position.x,
    y: component.y + terminalDef.position.y,
  }
}
