export default function StatusBar({
  isMissionComplete,
  isCircuitValid,
  xp = 0,
  xpGoal = 1000,
  objective = 'Build Battery → Switch → Bulb → Battery',
  completedObjective = 'Circuit brought to life!',
}) {
  const xpPercent = Math.min(100, Math.max(0, (xp / xpGoal) * 100))
  const statusLabel = isMissionComplete
    ? 'Complete'
    : isCircuitValid
      ? 'Powered'
      : 'In Progress'

  return (
    <footer
      className={`status-bar sticky bottom-0 w-full glass-panel border-t border-electric-blue border-opacity-20 ${
        isMissionComplete ? 'status-bar-complete' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wider">Mission Status</span>
            <span
              className={`mission-status-value text-sm font-semibold mt-1 ${
                isMissionComplete ? 'is-complete' : 'is-active'
              }`}
            >
              {statusLabel}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wider">Experience Points</span>
            <span className={`xp-value text-sm font-semibold mt-1 ${xp > 0 ? 'has-xp' : ''}`}>
              {xp} / {xpGoal} XP
            </span>
            <span className="xp-meter" aria-hidden>
              <span
                className="xp-meter-fill"
                style={{ width: `${xpPercent}%` }}
              />
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wider">Current Objective</span>
            <span className="text-sm font-semibold text-gray-300 mt-1">
              {isMissionComplete
                ? completedObjective
                : objective}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
