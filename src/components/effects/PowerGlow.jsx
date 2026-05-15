export default function PowerGlow({ active, variant = 'bulb' }) {
  return (
    <div
      className={`power-glow power-glow-${variant} ${active ? 'is-active' : ''}`}
      aria-hidden
    >
      <span className="power-glow-bloom" />
      <span className="power-glow-core" />
      <span className="power-glow-ring" />
    </div>
  )
}
