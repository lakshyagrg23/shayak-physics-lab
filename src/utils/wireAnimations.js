const clamp = (value, min, max) => Math.max(min, Math.min(value, max))

export const getWireDistance = (from, to) => {
  const dx = to.x - from.x
  const dy = to.y - from.y
  return Math.sqrt(dx * dx + dy * dy)
}

export const getWireAnimationMetrics = (from, to, isPowered) => {
  if (!isPowered) {
    return {
      groupStyle: undefined,
      particleDuration: '2s',
    }
  }

  const distance = getWireDistance(from, to)
  const flowDuration = clamp(distance / 190, 0.85, 2.2)
  const particleDuration = clamp(distance / 150, 1.1, 2.8)
  const phaseDelay = ((from.x + from.y + to.x + to.y) % 90) / 100

  return {
    groupStyle: {
      '--wire-flow-duration': `${flowDuration.toFixed(2)}s`,
      '--wire-particle-duration': `${particleDuration.toFixed(2)}s`,
      '--wire-phase-delay': `${phaseDelay.toFixed(2)}s`,
    },
    particleDuration: `${particleDuration.toFixed(2)}s`,
  }
}
