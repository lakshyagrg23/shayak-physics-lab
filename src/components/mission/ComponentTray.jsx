import DraggableComponentCard from './DraggableComponentCard'
import { COMPONENT_CONFIG } from '../../data/componentRegistry'
import handIcon from '../../assets/ui/hand.svg'

const components = Object.values(COMPONENT_CONFIG)

export default function ComponentTray() {
  return (
    <aside className="h-full w-full glass-panel flex flex-col p-4 border-r border-electric-blue border-opacity-20 overflow-hidden">
      <h2 className="text-sm font-bold glow-text mb-4">Components</h2>
      <div className="flex flex-col gap-3 overflow-y-auto flex-1">
        {components.map((component) => (
          <DraggableComponentCard
            key={component.id}
            icon={component.icon}
            title={component.title}
            description={component.description}
            type={component.type}
          />
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-auto pt-3 border-t border-electric-blue border-opacity-20 flex items-center gap-2">
        <img
          src={handIcon}
          alt=""
          aria-hidden
          className="inline-icon"
          draggable="false"
        />
        Drag to workspace
      </p>
    </aside>
  )
}
