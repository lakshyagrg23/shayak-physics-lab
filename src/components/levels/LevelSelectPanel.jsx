import checkIcon from '../../assets/ui/check.svg'
import lockIcon from '../../assets/ui/lock.svg'
import { LEVELS } from '../../data/levels'

function LevelCard({
  level,
  selected,
  completed,
  onSelect,
}) {
  const locked = !level.unlocked
  const stateLabel = locked ? 'Locked' : completed ? 'Completed' : 'Available'

  return (
    <button
      type="button"
      className={`level-card level-card-${level.accent} ${
        selected ? 'is-selected' : ''
      } ${completed ? 'is-completed' : ''} ${locked ? 'is-locked' : ''}`}
      onClick={() => {
        if (!locked) onSelect(level.id)
      }}
      disabled={locked}
      aria-pressed={selected}
    >
      <span className="level-card-topline">
        <span className="level-card-index">Level {level.order}</span>
        <span className="level-card-state">
          {(locked || completed) && (
            <img
              src={locked ? lockIcon : checkIcon}
              alt=""
              aria-hidden
              draggable="false"
            />
          )}
          {stateLabel}
        </span>
      </span>

      <span className="level-card-title">{level.title}</span>
      <span className="level-card-difficulty">{level.difficulty}</span>
      <span className="level-card-description">{level.description}</span>
    </button>
  )
}

export default function LevelSelectPanel({
  selectedLevelId,
  completedLevelIds,
  onSelectLevel,
}) {
  return (
    <section className="level-select-panel" aria-label="STEM level selection">
      <div className="level-select-heading">
        <span className="level-select-eyebrow">STEM Campaign</span>
        <h2>Electricity Missions</h2>
      </div>

      <div className="level-card-track">
        {LEVELS.map((level) => (
          <LevelCard
            key={level.id}
            level={level}
            selected={selectedLevelId === level.id}
            completed={completedLevelIds.has(level.id)}
            onSelect={onSelectLevel}
          />
        ))}
      </div>
    </section>
  )
}
