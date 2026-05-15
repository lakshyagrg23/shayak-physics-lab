import { useMemo } from 'react'
import { validateCircuit } from '../engine/validateCircuit'
import { propagatePower } from '../engine/powerPropagation'

/**
 * Runs circuit validation whenever components, wires, or switch states change.
 */
export function useCircuitSimulation(placedComponents, wires) {
  const switchStates = useMemo(() => {
    const states = {}
    for (const comp of placedComponents) {
      if (comp.type === 'switch') {
        states[comp.id] = comp.switchOn === true
      }
    }
    return states
  }, [placedComponents])

  return useMemo(() => {
    const validation = validateCircuit(placedComponents, wires, switchStates)
    const power = propagatePower(validation, placedComponents, wires)

    return {
      ...validation,
      ...power,
      switchStates,
    }
  }, [placedComponents, wires, switchStates])
}
