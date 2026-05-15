import lightningIcon from '../../assets/ui/lightning.svg'
import switchIcon from '../../assets/components/switch-off.svg'
import linkIcon from '../../assets/ui/link.svg'
import plugIcon from '../../assets/ui/plug.svg'
import partsIcon from '../../assets/ui/parts.svg'

const MESSAGES = {
  complete: {
    icon: lightningIcon,
    title: 'Current is flowing',
    body: 'Electricity now has a closed path from the battery, through the bulb, and back again.',
    variant: 'success',
  },
  switch_off: {
    icon: switchIcon,
    title: 'Switch is OFF',
    body: 'Turn the switch ON to close the path and allow current flow.',
    variant: 'hint',
  },
  incomplete: {
    icon: linkIcon,
    title: 'The loop is incomplete',
    body: 'Electricity needs an unbroken closed path through every component.',
    variant: 'hint',
  },
  not_connected: {
    icon: plugIcon,
    title: 'Build your circuit',
    body: 'Connect Battery to Switch to Bulb and back to the Battery.',
    variant: 'hint',
  },
  missing_components: {
    icon: partsIcon,
    title: 'Missing parts',
    body: 'Place a battery, switch, and bulb to build a circuit.',
    variant: 'hint',
  },
}

export default function CircuitFeedback({ reason, isValid, isMissionComplete }) {
  const messageKey = isValid ? 'complete' : reason || 'not_connected'
  const message = MESSAGES[messageKey] || MESSAGES.not_connected

  return (
    <div className="circuit-feedback-container">
      <div
        className={`circuit-feedback-hint circuit-feedback-${message.variant} ${
          isMissionComplete ? 'is-complete' : ''
        }`}
        role="status"
      >
        <img
          src={message.icon}
          alt=""
          aria-hidden
          className="circuit-feedback-icon"
          draggable="false"
        />
        <div className="circuit-feedback-text">
          <span className="circuit-feedback-hint-title">{message.title}</span>
          <span className="circuit-feedback-hint-body">{message.body}</span>
        </div>
      </div>
    </div>
  )
}
