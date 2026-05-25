export const motionDurations = {
  instant: 0.08,
  fast: 0.14,
  base: 0.18,
  slow: 0.24,
  drawer: 0.26,
} as const

export const motionEase = [0.22, 1, 0.36, 1] as const

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: motionDurations.base, ease: motionEase },
} as const

export const panelReveal = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 4 },
  transition: { duration: motionDurations.base, ease: motionEase },
} as const

export const pageReveal = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -2 },
  transition: { duration: motionDurations.fast, ease: motionEase },
} as const

export const drawerContentReveal = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
  transition: { duration: motionDurations.base, ease: motionEase },
} as const

export const listItemReveal = {
  initial: { opacity: 0, y: 3 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: motionDurations.fast, ease: motionEase },
} as const
