/**
 * Maps validation results to per-component and per-wire powered flags.
 */
export const propagatePower = (validationResult, placedComponents, wires) => {
  const poweredByComponent = {}
  const poweredByWire = {}
  const poweredComponentIds = new Set(validationResult.poweredComponentIds)
  const poweredWireIds = new Set(validationResult.poweredWireIds)

  for (const wire of wires) {
    if (!poweredWireIds.has(wire.id)) continue
    poweredComponentIds.add(wire.fromComponentId)
    poweredComponentIds.add(wire.toComponentId)
  }

  for (const comp of placedComponents) {
    poweredByComponent[comp.id] = {
      powered: poweredComponentIds.has(comp.id),
    }
  }

  for (const wire of wires) {
    poweredByWire[wire.id] = poweredWireIds.has(wire.id)
  }

  return {
    poweredByComponent,
    poweredByWire,
    isCircuitValid: validationResult.isValid,
    isMissionComplete: validationResult.isMissionComplete,
    reason: validationResult.reason,
  }
}
