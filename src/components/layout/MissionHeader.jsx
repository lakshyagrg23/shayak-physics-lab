import lightningIcon from '../../assets/ui/lightning.svg'

export default function MissionHeader({ level }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-glass-light backdrop-blur-md border-b border-electric-blue border-opacity-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3">
          <img
            src={lightningIcon}
            alt=""
            aria-hidden
            className="header-icon"
            draggable="false"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold glow-text">
                Mission: {level.missionTitle}
              </h1>
              <span className="mission-difficulty-pill">{level.difficulty}</span>
            </div>
            <p className="text-sm text-gray-300 mt-1">
              {level.missionBrief}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Level {level.order}: {level.title}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
