import { useNavigate } from 'react-router-dom'
import { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import Layout from '../components/layout/Layout'
import MissionHeader from '../components/layout/MissionHeader'
import ComponentTray from '../components/mission/ComponentTray'
import LevelSelectPanel from '../components/levels/LevelSelectPanel'
import WorkspaceArea from '../components/workspace/WorkspaceArea'
import StatusBar from '../components/layout/StatusBar'
import MissionCompleteToast from '../components/effects/MissionCompleteToast'
import { usePlacedComponents } from '../hooks/usePlacedComponents'
import { useWireConnections } from '../hooks/useWireConnections'
import { useCircuitSimulation } from '../hooks/useCircuitSimulation'
import { useWorkspaceBounds } from '../hooks/useWorkspaceBounds'
import { useMissionProgress } from '../hooks/useMissionProgress'
import { COMPONENT_CONFIG, getComponentConfig } from '../data/componentRegistry'
import {
  getInitialLevel,
  getLevelById,
  LEVEL_COMPLETION_RULES,
} from '../data/levels'
import {
  getDropPositionFromDragEvent,
  centerAndClampDrop,
} from '../utils/workspaceCoordinates'

export default function PhysicsLabPage() {
  const navigate = useNavigate()
  const canvasRef = useRef(null)
  const workspaceBounds = useWorkspaceBounds(canvasRef)

  const {
    placedComponents,
    addComponent,
    updateComponent,
    removeComponent: removePlacedComponent,
    toggleSwitch,
  } = usePlacedComponents(workspaceBounds)

  const {
    wires,
    selectedTerminal,
    mousePosition,
    handleTerminalClick,
    removeWire,
    removeWiresForComponent,
    clearSelection,
    updateMousePosition,
  } = useWireConnections()

  const circuit = useCircuitSimulation(placedComponents, wires)

  const [activeId, setActiveId] = useState(null)
  const [isDraggingOverWorkspace, setIsDraggingOverWorkspace] = useState(false)
  const [selectedLevelId, setSelectedLevelId] = useState(() => getInitialLevel().id)
  const [completedLevelIds, setCompletedLevelIds] = useState(() => new Set())

  const selectedLevel = useMemo(
    () => getLevelById(selectedLevelId),
    [selectedLevelId]
  )
  const selectedLevelCanComplete =
    selectedLevel.completionRule === LEVEL_COMPLETION_RULES.BASIC_CIRCUIT
  const selectedLevelComplete = selectedLevelCanComplete && circuit.isMissionComplete
  const missionProgress = useMissionProgress(
    selectedLevelComplete,
    selectedLevel.xpReward
  )

  useEffect(() => {
    if (!selectedLevelComplete) return

    setCompletedLevelIds((current) => {
      if (current.has(selectedLevel.id)) return current
      const next = new Set(current)
      next.add(selectedLevel.id)
      return next
    })
  }, [selectedLevel.id, selectedLevelComplete])

  const handleRemoveComponent = useCallback(
    (componentId) => {
      removePlacedComponent(componentId)
      removeWiresForComponent(componentId)
      clearSelection()
    },
    [clearSelection, removePlacedComponent, removeWiresForComponent]
  )

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id)
  }, [])

  const handleDragOver = (event) => {
    const { over } = event
    setIsDraggingOverWorkspace(over?.id === 'workspace-droppable')
  }

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over, delta } = event
      const canvas = canvasRef.current

      if (over?.id === 'workspace-droppable' && canvas) {
        if (active.data.current?.type && active.data.current.type !== 'placed') {
          const type = active.data.current.type
          const dropPoint = getDropPositionFromDragEvent(event, canvas)
          const { x, y } = centerAndClampDrop(
            dropPoint.x,
            dropPoint.y,
            workspaceBounds
          )
          addComponent(type, x, y)
        } else if (active.data.current?.type === 'placed') {
          const componentId = active.data.current.componentId
          const originalX = active.data.current.originalX || 0
          const originalY = active.data.current.originalY || 0
          updateComponent(componentId, originalX + delta.x, originalY + delta.y)
        }
      }

      setActiveId(null)
      setIsDraggingOverWorkspace(false)
    },
    [addComponent, updateComponent, workspaceBounds]
  )

  const getActiveDragComponent = () => {
    if (!activeId) return null
    const type = activeId.replace('draggable-', '')
    return getComponentConfig(type)
  }

  const activeDragComponent = getActiveDragComponent()
  const mobileTrayComponents = Object.values(COMPONENT_CONFIG)

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Layout>
        <div className="h-screen w-full flex flex-col overflow-hidden">
          <MissionHeader level={selectedLevel} />

          <LevelSelectPanel
            selectedLevelId={selectedLevel.id}
            completedLevelIds={completedLevelIds}
            onSelectLevel={setSelectedLevelId}
          />

          <div className="flex-1 flex min-h-0 overflow-hidden">
            <div className="hidden sm:flex sm:w-1/5 md:w-1/6 lg:w-1/5 min-h-0 shrink-0">
              <ComponentTray />
            </div>

            <div className="flex-1 flex flex-col min-h-0 min-w-0 relative">
              <div
                id="workspace-container"
                className="flex-1 flex flex-col min-h-0 relative overflow-hidden"
              >
                <WorkspaceArea
                  canvasRef={canvasRef}
                  placedComponents={placedComponents}
                  poweredByComponent={circuit.poweredByComponent}
                  onRemoveComponent={handleRemoveComponent}
                  onToggleSwitch={toggleSwitch}
                  isDraggingOverWorkspace={isDraggingOverWorkspace}
                  selectedTerminal={selectedTerminal}
                  onTerminalClick={handleTerminalClick}
                  wires={wires}
                  mousePosition={mousePosition}
                  poweredWireIds={circuit.poweredWireIds}
                  onWireClick={removeWire}
                  onMouseMove={updateMousePosition}
                  circuitReason={circuit.reason}
                  isCircuitValid={circuit.isCircuitValid}
                  isMissionComplete={selectedLevelComplete}
                />
              </div>
            </div>
          </div>

          <div className="sm:hidden glass-panel border-t border-electric-blue border-opacity-20 p-4">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {mobileTrayComponents.map((component) => (
                <img
                  key={component.id}
                  src={component.icon}
                  alt={component.title}
                  className="mobile-tray-icon"
                  draggable="false"
                />
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">Swipe to see all components</p>
          </div>

          <StatusBar
            isMissionComplete={selectedLevelComplete}
            isCircuitValid={circuit.isCircuitValid}
            xp={missionProgress.xp}
            objective={selectedLevel.objective}
            completedObjective="Mission circuit completed"
          />
        </div>

        <MissionCompleteToast
          show={missionProgress.showCompletionToast}
          xpAward={missionProgress.rewardXp}
          onDismiss={missionProgress.dismissCompletionToast}
        />

        <button
          onClick={() => navigate('/')}
          className="fixed top-4 left-4 sm:top-8 sm:left-8 px-3 py-2 text-sm bg-glass-light hover:bg-electric-blue hover:text-physics-dark border border-electric-blue rounded-lg transition-smooth z-30"
        >
          ← Back
        </button>

        <DragOverlay>
          {activeId && activeDragComponent ? (
            <div className="flex flex-col items-center justify-center gap-2 w-20 h-20 rounded-lg glass-panel border-2 border-neon-green shadow-glow-lg scale-110 pointer-events-none">
              <img
                src={activeDragComponent.icon}
                alt=""
                aria-hidden
                className="component-drag-overlay-icon"
                draggable="false"
              />
              <span className="text-xs font-semibold text-neon-green">
                {activeDragComponent.title}
              </span>
            </div>
          ) : null}
        </DragOverlay>
      </Layout>
    </DndContext>
  )
}
