import { useCallback, useEffect, useState } from 'react'

const XP_KEY = 'physicsLab.xp'
const AWARDED_KEY = 'physicsLab.missionAwarded'

const readSessionNumber = (key, fallback) => {
  if (typeof window === 'undefined') return fallback

  const rawValue = window.sessionStorage.getItem(key)
  const value = Number(rawValue)
  return Number.isFinite(value) ? value : fallback
}

const readSessionFlag = (key) => {
  if (typeof window === 'undefined') return false
  return window.sessionStorage.getItem(key) === 'true'
}

const writeSessionValue = (key, value) => {
  if (typeof window === 'undefined') return
  window.sessionStorage.setItem(key, String(value))
}

export function useMissionProgress(isMissionComplete, rewardXp = 100) {
  const [xp, setXp] = useState(() => readSessionNumber(XP_KEY, 0))
  const [hasAwardedMission, setHasAwardedMission] = useState(() =>
    readSessionFlag(AWARDED_KEY)
  )
  const [showCompletionToast, setShowCompletionToast] = useState(false)

  useEffect(() => {
    if (!isMissionComplete || hasAwardedMission) return

    setXp((currentXp) => {
      const nextXp = currentXp + rewardXp
      writeSessionValue(XP_KEY, nextXp)
      return nextXp
    })

    setHasAwardedMission(true)
    writeSessionValue(AWARDED_KEY, true)
    setShowCompletionToast(true)
  }, [hasAwardedMission, isMissionComplete, rewardXp])

  const dismissCompletionToast = useCallback(() => {
    setShowCompletionToast(false)
  }, [])

  return {
    xp,
    rewardXp,
    hasAwardedMission,
    showCompletionToast,
    dismissCompletionToast,
  }
}
