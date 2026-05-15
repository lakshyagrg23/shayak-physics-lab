import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

export default function DraggableComponentCard({ icon, title, description, type }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `draggable-${type}`,
    data: {
      type,
    },
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
    transition: isDragging ? 'none' : 'opacity 0.2s ease',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`glass-panel-hover p-4 w-full min-w-max transition-smooth ${
        isDragging ? 'ring-2 ring-electric-blue scale-105 shadow-glow-lg' : ''
      }`}
    >
      <img
        src={icon}
        alt=""
        aria-hidden
        className="component-card-icon mb-3"
        draggable="false"
      />
      <h3 className="font-semibold text-electric-blue mb-2">{title}</h3>
      <p className="text-xs text-gray-300 leading-tight">{description}</p>
      {isDragging && (
        <p className="text-xs text-neon-green mt-2 font-semibold">
          ↓ Drop in workspace
        </p>
      )}
    </div>
  )
}
