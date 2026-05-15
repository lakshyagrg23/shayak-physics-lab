import React, { useState, useMemo } from 'react'
import WirePath from './WirePath'
import { COMPONENT_CONFIG } from '../../data/componentRegistry'
import { getTerminalWorkspacePosition } from '../../utils/workspaceCoordinates'
import { computeQuadraticWirePath } from '../../utils/wireGeometry'

/**
 * SVG wire overlay — shares workspace-canvas as coordinate origin.
 */
const WireLayer = ({
  wires,
  placedComponents,
  selectedTerminal,
  mousePosition,
  poweredWireIds = [],
  onWireClick,
  onMouseMove,
  workspaceCanvasRef,
}) => {
  const poweredSet = useMemo(() => new Set(poweredWireIds), [poweredWireIds])
  const [hoveredWireId, setHoveredWireId] = useState(null)

  const getTerminalPosition = (componentId, terminalId) => {
    const component = placedComponents.find((c) => c.id === componentId)
    if (!component) return null

    const config = COMPONENT_CONFIG[component.type]
    if (!config) return null

    return getTerminalWorkspacePosition(component, terminalId, config)
  }

  return (
    <svg
      className="wire-layer"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <defs>
        <linearGradient id="wireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#39ff14" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="wireGradientPowered" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="50%" stopColor="#39ff14" />
          <stop offset="100%" stopColor="#ffe566" />
        </linearGradient>
      </defs>

      {wires.map((wire) => {
        const fromPos = getTerminalPosition(wire.fromComponentId, wire.fromTerminal)
        const toPos = getTerminalPosition(wire.toComponentId, wire.toTerminal)

        if (!fromPos || !toPos) return null

        return (
          <WirePath
            key={wire.id}
            wireId={wire.id}
            from={fromPos}
            to={toPos}
            isPowered={poweredSet.has(wire.id)}
            isHovered={hoveredWireId === wire.id}
            onClick={() => onWireClick(wire.id)}
            onMouseEnter={() => setHoveredWireId(wire.id)}
            onMouseLeave={() => setHoveredWireId(null)}
          />
        )
      })}

      {selectedTerminal && (() => {
        const fromPos = getTerminalPosition(
          selectedTerminal.componentId,
          selectedTerminal.terminalId
        )

        if (!fromPos) return null

        const toPos = mousePosition
        const dx = toPos.x - fromPos.x
        const dy = toPos.y - fromPos.y
        if (dx === 0 && dy === 0) return null

        const { pathData } = computeQuadraticWirePath(fromPos, toPos)

        return (
          <g className="preview-wire-group">
            <path
              d={pathData}
              className="preview-wire-glow"
              strokeWidth="6"
              fill="none"
            />
            <path
              d={pathData}
              className="preview-wire-line"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx={fromPos.x}
              cy={fromPos.y}
              r="5"
              className="preview-wire-start"
              fill="none"
            />
            <circle
              cx={toPos.x}
              cy={toPos.y}
              r="4"
              className="preview-wire-cursor"
            />
          </g>
        )
      })()}
    </svg>
  )
}

export default WireLayer
