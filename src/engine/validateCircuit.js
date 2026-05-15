import { COMPONENT_TYPES } from '../data/componentTypes'
import {
  buildTerminalGraph,
  buildComponentGraph,
  bfsReachable,
  terminalKey,
  isComponentFullyWired,
  hasRequiredLoop,
} from './graphUtils'

const REQUIRED_TERMINALS = {
  [COMPONENT_TYPES.BATTERY]: ['positive', 'negative'],
  [COMPONENT_TYPES.SWITCH]: ['input', 'output'],
  [COMPONENT_TYPES.BULB]: ['left', 'right'],
}

/**
 * Validates simplified closed loop: Battery → Switch → Bulb → Battery
 * Requirements: switch ON, all terminals wired, battery +/- participate.
 */
export const validateCircuit = (placedComponents, wires, switchStates) => {
  const empty = {
    isValid: false,
    reason: 'missing_components',
    poweredComponentIds: [],
    poweredWireIds: [],
    isMissionComplete: false,
  }

  const batteries = placedComponents.filter(
    (c) => c.type === COMPONENT_TYPES.BATTERY
  )
  const switches = placedComponents.filter(
    (c) => c.type === COMPONENT_TYPES.SWITCH
  )
  const bulbs = placedComponents.filter((c) => c.type === COMPONENT_TYPES.BULB)

  if (batteries.length === 0 || switches.length === 0 || bulbs.length === 0) {
    return { ...empty, reason: 'missing_components' }
  }

  const onSwitches = switches.filter((s) => switchStates[s.id] === true)
  if (onSwitches.length === 0) {
    return { ...empty, reason: 'switch_off' }
  }

  const adj = buildTerminalGraph(placedComponents, wires, switchStates)
  const componentGraph = buildComponentGraph(placedComponents, wires)

  for (const battery of batteries) {
    if (
      !isComponentFullyWired(
        battery.id,
        REQUIRED_TERMINALS[COMPONENT_TYPES.BATTERY],
        wires
      )
    ) {
      continue
    }

    const posKey = terminalKey(battery.id, 'positive')
    const negKey = terminalKey(battery.id, 'negative')
    const reachable = bfsReachable(adj, posKey)

    if (!reachable.has(negKey)) continue

    const activeSwitch = onSwitches.find(
      (s) =>
        isComponentFullyWired(
          s.id,
          REQUIRED_TERMINALS[COMPONENT_TYPES.SWITCH],
          wires
        ) &&
        reachable.has(terminalKey(s.id, 'input')) &&
        reachable.has(terminalKey(s.id, 'output'))
    )

    const activeBulb = bulbs.find(
      (b) =>
        isComponentFullyWired(
          b.id,
          REQUIRED_TERMINALS[COMPONENT_TYPES.BULB],
          wires
        ) &&
        (reachable.has(terminalKey(b.id, 'left')) ||
          reachable.has(terminalKey(b.id, 'right')))
    )

    if (!activeSwitch || !activeBulb) continue

    const loopExists = hasRequiredLoop(
      componentGraph,
      battery.id,
      activeSwitch.id,
      activeBulb.id
    )

    if (!loopExists) continue

    const poweredComponentIds = [battery.id, activeSwitch.id, activeBulb.id]

    const poweredWireIds = wires
      .filter((w) => {
        const from = terminalKey(w.fromComponentId, w.fromTerminal)
        const to = terminalKey(w.toComponentId, w.toTerminal)
        return reachable.has(from) && reachable.has(to)
      })
      .map((w) => w.id)

    return {
      isValid: true,
      reason: 'complete',
      poweredComponentIds,
      poweredWireIds,
      isMissionComplete: true,
      batteryId: battery.id,
      switchId: activeSwitch.id,
      bulbId: activeBulb.id,
    }
  }

  const anyWired =
    wires.length > 0 &&
    batteries.some((b) =>
      isComponentFullyWired(
        b.id,
        REQUIRED_TERMINALS[COMPONENT_TYPES.BATTERY],
        wires
      )
    )

  return {
    ...empty,
    reason: anyWired ? 'incomplete' : 'not_connected',
  }
}
