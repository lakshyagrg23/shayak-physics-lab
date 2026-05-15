/**
 * Graph utilities for terminal-level circuit connectivity.
 * Nodes: "componentId:terminalId"
 */

export const terminalKey = (componentId, terminalId) =>
  `${componentId}:${terminalId}`

export const parseTerminalKey = (key) => {
  const sep = key.indexOf(':')
  return {
    componentId: key.slice(0, sep),
    terminalId: key.slice(sep + 1),
  }
}

/**
 * Build adjacency list from wires + internal component connections.
 */
export const buildTerminalGraph = (placedComponents, wires, switchStates) => {
  const adj = new Map()

  const addEdge = (a, b) => {
    if (!adj.has(a)) adj.set(a, new Set())
    if (!adj.has(b)) adj.set(b, new Set())
    adj.get(a).add(b)
    adj.get(b).add(a)
  }

  for (const wire of wires) {
    addEdge(
      terminalKey(wire.fromComponentId, wire.fromTerminal),
      terminalKey(wire.toComponentId, wire.toTerminal)
    )
  }

  for (const comp of placedComponents) {
    switch (comp.type) {
      case 'battery':
        addEdge(
          terminalKey(comp.id, 'positive'),
          terminalKey(comp.id, 'negative')
        )
        break
      case 'bulb':
      case 'resistor':
        addEdge(
          terminalKey(comp.id, 'left'),
          terminalKey(comp.id, 'right')
        )
        break
      case 'switch':
        if (switchStates[comp.id]) {
          addEdge(
            terminalKey(comp.id, 'input'),
            terminalKey(comp.id, 'output')
          )
        }
        break
      default:
        break
    }
  }

  return adj
}

/**
 * BFS from a terminal — returns Set of reachable terminal keys.
 */
export const bfsReachable = (adj, start) => {
  if (!adj.has(start)) return new Set()

  const visited = new Set([start])
  const queue = [start]

  while (queue.length > 0) {
    const node = queue.shift()
    const neighbors = adj.get(node) || new Set()

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        queue.push(neighbor)
      }
    }
  }

  return visited
}

/**
 * Terminals on a component that have at least one wire attached.
 */
export const getWiredTerminals = (componentId, wires) => {
  const wired = new Set()
  for (const wire of wires) {
    if (wire.fromComponentId === componentId) {
      wired.add(wire.fromTerminal)
    }
    if (wire.toComponentId === componentId) {
      wired.add(wire.toTerminal)
    }
  }
  return wired
}

export const isComponentFullyWired = (componentId, requiredTerminals, wires) => {
  const wired = getWiredTerminals(componentId, wires)
  return requiredTerminals.every((t) => wired.has(t))
}

/**
 * Component-level adjacency (undirected) from terminal wires.
 */
export const buildComponentGraph = (placedComponents, wires) => {
  const adj = new Map()

  const addEdge = (a, b) => {
    if (a === b) return
    if (!adj.has(a)) adj.set(a, new Set())
    if (!adj.has(b)) adj.set(b, new Set())
    adj.get(a).add(b)
    adj.get(b).add(a)
  }

  for (const wire of wires) {
    addEdge(wire.fromComponentId, wire.toComponentId)
  }

  for (const comp of placedComponents) {
    if (!adj.has(comp.id)) adj.set(comp.id, new Set())
  }

  return adj
}

/**
 * Check if component graph has a path visiting battery → switch → bulb → battery.
 */
export const hasRequiredLoop = (
  componentGraph,
  batteryId,
  switchId,
  bulbId
) => {
  const visited = new Set()

  const dfs = (currentId, pathTypes) => {
    if (currentId === batteryId && pathTypes.length >= 4) {
      const types = pathTypes.map((id) => {
        if (id === batteryId) return 'battery'
        if (id === switchId) return 'switch'
        if (id === bulbId) return 'bulb'
        return 'other'
      })
      return (
        types.includes('battery') &&
        types.includes('switch') &&
        types.includes('bulb')
      )
    }

    if (pathTypes.length > 12) return false

    const neighbors = componentGraph.get(currentId) || new Set()

    for (const neighbor of neighbors) {
      const edgeKey = `${currentId}-${neighbor}`
      if (visited.has(edgeKey)) continue

      visited.add(edgeKey)
      const result = dfs(neighbor, [...pathTypes, neighbor])
      visited.delete(edgeKey)
      if (result) return true
    }

    return false
  }

  return dfs(batteryId, [batteryId])
}
