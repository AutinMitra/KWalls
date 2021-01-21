const defaultFadeUp = {
  y: 60,
  duration: 0.6,
  delay: 0,
  initScale: 1
}

export const fadeUp = ({y, duration, delay, initScale} = defaultFadeUp) => ({
  initial: {
    y: y ?? defaultFadeUp.y,
    opacity: 0,
    scale: initScale ?? defaultFadeUp.initScale,
    transition: { 
      duration: duration ?? defaultFadeUp.duration, 
      ease: 'easeOut'
    }
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: duration ?? defaultFadeUp.duration, 
      ease: 'easeOut',
      delay: delay ?? defaultFadeUp.delay
    }
  },
})

export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  }
}