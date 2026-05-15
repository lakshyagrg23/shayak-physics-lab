import batteryIcon from '../assets/components/battery.svg'
import bulbOffIcon from '../assets/components/bulb-off.svg'
import bulbOnIcon from '../assets/components/bulb-on.svg'
import resistorIcon from '../assets/components/resistor.svg'
import switchOffIcon from '../assets/components/switch-off.svg'
import switchOnIcon from '../assets/components/switch-on.svg'
import { COMPONENT_TYPES } from './componentTypes'

// Component registry with metadata for all draggable components

export { COMPONENT_TYPES }

// Terminal positioning: offset from component top-left (px)
// Format: { id, name, position: { x, y }, label }
export const TERMINAL_POSITIONS = {
  [COMPONENT_TYPES.BATTERY]: [
    { id: 'positive', name: 'positive', label: '+', position: { x: 40, y: -5 } },
    { id: 'negative', name: 'negative', label: '−', position: { x: 40, y: 85 } },
  ],
  [COMPONENT_TYPES.BULB]: [
    { id: 'left', name: 'left', label: 'L', position: { x: -5, y: 40 } },
    { id: 'right', name: 'right', label: 'R', position: { x: 85, y: 40 } },
  ],
  [COMPONENT_TYPES.RESISTOR]: [
    { id: 'left', name: 'left', label: 'L', position: { x: -5, y: 40 } },
    { id: 'right', name: 'right', label: 'R', position: { x: 85, y: 40 } },
  ],
  [COMPONENT_TYPES.SWITCH]: [
    { id: 'input', name: 'input', label: 'IN', position: { x: -5, y: 40 } },
    { id: 'output', name: 'output', label: 'OUT', position: { x: 85, y: 40 } },
  ],
}

export const COMPONENT_CONFIG = {
  [COMPONENT_TYPES.BATTERY]: {
    id: 'battery',
    type: COMPONENT_TYPES.BATTERY,
    icon: batteryIcon,
    iconAlt: 'Battery',
    title: 'Battery',
    description: 'Provides electrical energy to power the circuit',
    width: 80,
    height: 80,
    terminals: TERMINAL_POSITIONS[COMPONENT_TYPES.BATTERY],
  },
  [COMPONENT_TYPES.BULB]: {
    id: 'bulb',
    type: COMPONENT_TYPES.BULB,
    icon: bulbOffIcon,
    poweredIcon: bulbOnIcon,
    iconAlt: 'Bulb',
    title: 'Bulb',
    description: 'Lights up when current flows through it',
    width: 80,
    height: 80,
    terminals: TERMINAL_POSITIONS[COMPONENT_TYPES.BULB],
  },
  [COMPONENT_TYPES.RESISTOR]: {
    id: 'resistor',
    type: COMPONENT_TYPES.RESISTOR,
    icon: resistorIcon,
    iconAlt: 'Resistor',
    title: 'Resistor',
    description: 'Resistors reduce and control the flow of current.',
    width: 80,
    height: 80,
    terminals: TERMINAL_POSITIONS[COMPONENT_TYPES.RESISTOR],
  },
  [COMPONENT_TYPES.SWITCH]: {
    id: 'switch',
    type: COMPONENT_TYPES.SWITCH,
    icon: switchOffIcon,
    offIcon: switchOffIcon,
    onIcon: switchOnIcon,
    iconAlt: 'Switch',
    title: 'Switch',
    description: 'Controls the flow of electricity',
    width: 80,
    height: 80,
    terminals: TERMINAL_POSITIONS[COMPONENT_TYPES.SWITCH],
  },
}

export const getComponentConfig = (type) => {
  return COMPONENT_CONFIG[type]
}

export const generateComponentId = (type) => {
  return `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}
