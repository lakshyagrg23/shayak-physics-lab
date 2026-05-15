import { useEffect } from 'react'
import lightningIcon from '../../assets/ui/lightning.svg'

export default function MissionCompleteToast({ show, xpAward, onDismiss }) {
  useEffect(() => {
    if (!show) return undefined

    const timer = window.setTimeout(() => {
      onDismiss?.()
    }, 4200)

    return () => window.clearTimeout(timer)
  }, [onDismiss, show])

  if (!show) return null

  return (
    <div className="mission-complete-toast" role="status" aria-live="polite">
      <div className="mission-complete-toast-orb" aria-hidden>
        <img src={lightningIcon} alt="" draggable="false" />
      </div>
      <div className="mission-complete-toast-copy">
        <span className="mission-complete-toast-title">
          Village electricity restored!
        </span>
        <span className="mission-complete-toast-xp">+{xpAward} XP</span>
        <span className="mission-complete-toast-body">Mission Complete</span>
      </div>
    </div>
  )
}
