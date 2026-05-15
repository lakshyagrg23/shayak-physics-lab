import React from 'react'

/**
 * TerminalNode - Individual connection terminal on a component
 * 
 * Props:
 *   - terminalId: unique terminal identifier
 *   - terminalName: terminal name (e.g., 'positive', 'left')
 *   - label: terminal label (e.g., '+', 'L', 'IN')
 *   - x: x position relative to component
 *   - y: y position relative to component
 *   - isSelected: whether this terminal is currently selected
 *   - onClick: callback when terminal clicked
 */
const TerminalNode = ({
  terminalId,
  terminalName,
  label,
  x,
  y,
  isSelected,
  isPowered,
  onClick,
}) => {
  const handlePointerDown = (e) => {
    e.stopPropagation()
  }

  const handleClick = (e) => {
    e.stopPropagation()
    onClick?.()
  }

  return (
    <div
      className={`terminal-node ${isSelected ? 'is-selected' : ''} ${isPowered ? 'is-powered' : ''}`}
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)',
      }}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      title={`${terminalName}: ${label}`}
    >
      {/* Outer glow ring */}
      <div className="terminal-glow" />

      {/* Main node circle */}
      <div className="terminal-circle" />

      {/* Inner core */}
      <div className="terminal-core" />

      {/* Label */}
      <div className="terminal-label">{label}</div>
    </div>
  )
}

export default TerminalNode
