/**
 * Shared quadratic Bezier wire path geometry.
 */

export const computeWireControlPoint = (from, to, curvature = 0.15) => {
  const midX = (from.x + to.x) / 2
  const midY = (from.y + to.y) / 2

  const dx = to.x - from.x
  const dy = to.y - from.y
  const distance = Math.sqrt(dx * dx + dy * dy) || 1

  const offsetDistance = distance * curvature
  const perpX = (-dy / distance) * offsetDistance
  const perpY = (dx / distance) * offsetDistance

  return {
    controlX: midX + perpX,
    controlY: midY + perpY,
  }
}

export const computeQuadraticWirePath = (from, to, curvature = 0.15) => {
  const { controlX, controlY } = computeWireControlPoint(from, to, curvature)

  return {
    pathData: `M ${from.x} ${from.y} Q ${controlX} ${controlY} ${to.x} ${to.y}`,
    controlX,
    controlY,
  }
}
