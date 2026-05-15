import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { getComponentConfig, COMPONENT_TYPES } from '../../data/componentRegistry'
import PowerGlow from '../effects/PowerGlow'
import TerminalNode from '../wires/TerminalNode'

export default function PlacedComponent({
  id,
  type,
  x,
  y,
  switchOn,
  powered,
  onRemove,
  onToggleSwitch,
  isDraggingOverWorkspace,
  selectedTerminal,
  onTerminalClick,
}) {
  const config = getComponentConfig(type)
  const isSwitch = type === COMPONENT_TYPES.SWITCH
  const isBulb = type === COMPONENT_TYPES.BULB
  const isResistor = type === COMPONENT_TYPES.RESISTOR
  const isPowered = powered === true
  const componentIcon = isBulb && isPowered
    ? config.poweredIcon || config.icon
    : isSwitch && switchOn
      ? config.onIcon || config.icon
      : isSwitch
        ? config.offIcon || config.icon
        : config.icon

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `placed-${id}`,
    data: {
      type: 'placed',
      componentId: id,
      originalX: x,
      originalY: y,
    },
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    zIndex: isDragging ? 1000 : 10,
    cursor: isDragging ? 'grabbing' : 'grab',
  }

  const handleSwitchToggle = (e) => {
    e.stopPropagation()
    e.preventDefault()
    onToggleSwitch?.(id)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        placed-component
        group
        flex flex-col items-center justify-center gap-2
        w-20 h-20 rounded-lg
        glass-panel backdrop-blur-sm
        border-2 transition-smooth
        hover:shadow-glow-lg
        ${
          isDragging
            ? 'border-neon-green shadow-glow-lg scale-110 ring-2 ring-neon-green'
            : 'border-electric-blue hover:border-neon-green'
        }
        ${isDraggingOverWorkspace && !isDragging ? 'opacity-75' : ''}
        ${isPowered ? 'is-powered' : ''}
        ${isBulb && isPowered ? 'bulb-powered' : ''}
        ${isBulb && !isPowered ? 'bulb-off' : ''}
        ${isResistor && isPowered ? 'resistor-powered' : ''}
        ${isSwitch ? (switchOn ? 'switch-on' : 'switch-off') : ''}
      `}
    >
      {isBulb && <PowerGlow active={isPowered} variant="bulb" />}

      <img
        src={componentIcon}
        alt=""
        aria-hidden
        draggable="false"
        className={`component-icon select-none pointer-events-none ${
          isBulb && isPowered ? 'bulb-icon-lit' : ''
        } ${isResistor && isPowered ? 'resistor-icon-powered' : ''}`}
      />

      <span className="text-xs font-semibold text-gray-300 select-none pointer-events-none">
        {config.title}
      </span>

      {/* Switch toggle control */}
      {isSwitch && (
        <button
          type="button"
          className={`switch-toggle ${switchOn ? 'switch-toggle-on' : 'switch-toggle-off'}`}
          onClick={handleSwitchToggle}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label={switchOn ? 'Turn switch off' : 'Turn switch on'}
          aria-pressed={switchOn}
        >
          <span className="switch-toggle-track">
            <span className="switch-toggle-thumb" />
          </span>
          <span className="switch-toggle-label">{switchOn ? 'ON' : 'OFF'}</span>
        </button>
      )}

      {/* Terminal nodes */}
      {config.terminals &&
        config.terminals.map((terminal) => (
          <TerminalNode
            key={terminal.id}
            terminalId={terminal.id}
            terminalName={terminal.name}
            label={terminal.label}
            x={terminal.position.x}
            y={terminal.position.y}
            isSelected={
              selectedTerminal?.componentId === id &&
              selectedTerminal?.terminalId === terminal.id
            }
            isPowered={isPowered}
            onClick={() => onTerminalClick?.(id, terminal.id, terminal.name)}
          />
        ))}

      {/* Remove button */}
      <button
        type="button"
        onPointerDown={(e) => {
          e.stopPropagation()
        }}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          onRemove(id)
        }}
        className="component-remove-button absolute top-1 right-1 w-5 h-5 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
        aria-label={`Remove ${config.title}`}
        title="Remove component"
      >
        ×
      </button>
    </div>
  )
}
