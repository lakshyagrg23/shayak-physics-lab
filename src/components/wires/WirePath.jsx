import React from 'react'
import { computeQuadraticWirePath } from '../../utils/wireGeometry'
import { getWireAnimationMetrics } from '../../utils/wireAnimations'

const WirePath = ({
  from,
  to,
  isHovered,
  isPowered,
  onClick,
  wireId,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { pathData } = computeQuadraticWirePath(from, to)
  const { groupStyle, particleDuration } = getWireAnimationMetrics(
    from,
    to,
    isPowered
  )

  return (
    <g
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`wire-path-group ${isHovered ? 'is-hovered' : ''} ${isPowered ? 'is-powered' : 'is-dim'}`}
      data-wire-id={wireId}
      style={groupStyle}
    >
      <path
        d={pathData}
        className="wire-glow"
        strokeWidth={isPowered ? 10 : 6}
        fill="none"
      />

      {isPowered && (
        <>
          <path
            d={pathData}
            className="wire-energy-band"
            strokeWidth="8"
            fill="none"
          />
          <path
            d={pathData}
            className="wire-current-flow"
            strokeWidth="2"
            fill="none"
          />
        </>
      )}

      <path
        d={pathData}
        className="wire-line"
        strokeWidth={isPowered ? 4 : 3}
        fill="none"
      />

      {isPowered && (
        <>
          <circle className="wire-particle wire-particle-1" r="3">
            <animateMotion
              dur={particleDuration}
              repeatCount="indefinite"
              path={pathData}
            />
          </circle>
          <circle className="wire-particle wire-particle-2" r="2.5">
            <animateMotion
              dur={particleDuration}
              repeatCount="indefinite"
              path={pathData}
              begin="0.66s"
            />
          </circle>
          <circle className="wire-particle wire-particle-3" r="2">
            <animateMotion
              dur={particleDuration}
              repeatCount="indefinite"
              path={pathData}
              begin="1.33s"
            />
          </circle>
        </>
      )}

      <path
        d={pathData}
        className="wire-hitbox"
        strokeWidth="12"
        fill="none"
        style={{ cursor: 'pointer' }}
      />
    </g>
  )
}

export default WirePath
