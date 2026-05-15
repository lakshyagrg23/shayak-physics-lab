import { useDroppable } from '@dnd-kit/core'
import PlacedComponent from './PlacedComponent'
import WireLayer from '../wires/WireLayer'
import CircuitFeedback from '../feedback/CircuitFeedback'
import { clientToWorkspace } from '../../utils/workspaceCoordinates'
import workspaceIcon from '../../assets/ui/workspace.svg'
import gearIcon from '../../assets/ui/gear.svg'

export default function WorkspaceArea({
  canvasRef,
  placedComponents,
  poweredByComponent,
  onRemoveComponent,
  onToggleSwitch,
  isDraggingOverWorkspace,
  selectedTerminal,
  onTerminalClick,
  wires,
  mousePosition,
  poweredWireIds,
  onWireClick,
  onMouseMove,
  circuitReason,
  isCircuitValid,
  isMissionComplete,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'workspace-droppable',
  })

  const setImmersiveRef = (node) => {
    setNodeRef(node)
  }

  const setCanvasRef = (node) => {
    if (canvasRef) {
      canvasRef.current = node
    }
  }

  const handleCanvasMouseMove = (e) => {
    if (!selectedTerminal) return
    const canvas = canvasRef?.current
    if (!canvas) return
    const { x, y } = clientToWorkspace(e.clientX, e.clientY, canvas)
    onMouseMove(x, y)
  }

  return (
    <div
      ref={setImmersiveRef}
      className={`workspace-immersive ${isOver ? 'is-over' : ''}`}
    >
      <div className="workspace-grid" />

      <div className="workspace-corner-marker top-left" />
      <div className="workspace-corner-marker top-right" />
      <div className="workspace-corner-marker bottom-left" />
      <div className="workspace-corner-marker bottom-right" />

      <div className="workspace-badge">
        <img
          src={workspaceIcon}
          alt=""
          aria-hidden
          className="workspace-badge-icon"
          draggable="false"
        />
        <span>Interactive Circuit Workspace</span>
      </div>

      <div
        ref={setCanvasRef}
        className="workspace-canvas relative flex-1 min-h-0 w-full overflow-hidden"
        onMouseMove={handleCanvasMouseMove}
      >
        <WireLayer
          wires={wires}
          placedComponents={placedComponents}
          selectedTerminal={selectedTerminal}
          mousePosition={mousePosition}
          poweredWireIds={poweredWireIds}
          onWireClick={onWireClick}
          workspaceCanvasRef={canvasRef}
        />

        {placedComponents.length === 0 && (
          <div className="workspace-empty-state">
            <img
              src={gearIcon}
              alt=""
              aria-hidden
              className="workspace-empty-icon"
              draggable="false"
            />
            <div className="workspace-empty-text">
              {isOver ? 'Drop to build' : 'Drag components here'}
            </div>
            <div className="workspace-empty-hint">
              {isOver
                ? 'Release to place component in workspace'
                : 'Pick a component from the sidebar to start building your circuit'}
            </div>
          </div>
        )}

        <div className="workspace-components-layer">
          {placedComponents.map((component) => (
            <PlacedComponent
              key={component.id}
              id={component.id}
              type={component.type}
              x={component.x}
              y={component.y}
              switchOn={component.switchOn}
              powered={poweredByComponent?.[component.id]?.powered}
              onRemove={onRemoveComponent}
              onToggleSwitch={onToggleSwitch}
              isDraggingOverWorkspace={isDraggingOverWorkspace}
              selectedTerminal={selectedTerminal}
              onTerminalClick={onTerminalClick}
            />
          ))}
        </div>
      </div>

      <CircuitFeedback
        reason={circuitReason}
        isValid={isCircuitValid}
        isMissionComplete={isMissionComplete}
      />

      {placedComponents.length > 0 && (
        <div className="component-counter">
          {placedComponents.length} component{placedComponents.length !== 1 ? 's' : ''} placed
        </div>
      )}
    </div>
  )
}
