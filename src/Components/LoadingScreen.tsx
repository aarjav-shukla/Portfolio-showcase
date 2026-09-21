import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './LoadingScreen.module.css'
import ShinyText from './ShinyText'

interface LoadingScreenProps {
  onComplete?: () => void
}

const GREETINGS = [
  { text: "Hii ", lang: "English" },
  { text: "नमस्ते ", lang: "Hindi" },
  { text: "Bonjour ", lang: "French" },
  { text: "Hola ", lang: "Spanish" },
  { text: "こんにちは ", lang: "Japanese" },
  { text: "Welcome ", lang: "Ready" },
];

const NUM_STRIPS = 6;

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [greetingIndex, setGreetingIndex] = useState(0)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const totalGreetings = GREETINGS.length
    const computedIndex = Math.min(
      totalGreetings - 1,
      Math.floor((progress / 100) * totalGreetings)
    )
    setGreetingIndex(computedIndex)
  }, [progress])

  const scrollToTop = () => {
    window.scrollTo(0, 0)
    if (window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }

  useEffect(() => {
    let startTimestamp: number | null = null
    const targetDuration = 3600

    const updateProgress = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const elapsed = timestamp - startTimestamp
      const progressRatio = Math.min(elapsed / targetDuration, 1)

      let easedValue: number
      if (progressRatio < 0.25) {
        easedValue = (progressRatio / 0.25) * 35
      } else if (progressRatio < 0.75) {
        const midRatio = (progressRatio - 0.25) / 0.5
        easedValue = 35 + midRatio * 45
      } else if (progressRatio < 0.95) {
        const lateRatio = (progressRatio - 0.75) / 0.2
        easedValue = 80 + lateRatio * 18
      } else {
        easedValue = 100
      }

      const currentInt = Math.min(100, Math.floor(easedValue))
      setProgress(currentInt)

      if (progressRatio < 1) {
        animationFrameRef.current = requestAnimationFrame(updateProgress)
      } else {
        setProgress(100)
        setTimeout(() => {
          scrollToTop()
          setIsFinished(true)
        }, 300)
      }
    }

    animationFrameRef.current = requestAnimationFrame(updateProgress)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        scrollToTop()
        setProgress(100)
        setIsFinished(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const currentGreeting = GREETINGS[greetingIndex] || GREETINGS[0]

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isFinished && (
        <div className={styles.loaderContainer}>
          {/* Vertical strips for staircase exit animation */}
          <div className={styles.stripsWrapper}>
            {Array.from({ length: NUM_STRIPS }).map((_, i) => (
              <motion.div
                key={i}
                className={styles.strip}
                initial={{ y: '0%' }}
                exit={{
                  y: '-100%',
                  transition: {
                    duration: 0.8,
                    ease: [0.76, 0, 0.24, 1],
                    delay: i * 0.09, // Staircase delay (left-to-right stairs)
                  },
                }}
              />
            ))}
          </div>

          {/* Loader text and interactive content */}
          <motion.div
            className={styles.loaderContent}
            initial={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -30,
              transition: {
                duration: 0.35,
                ease: 'easeIn',
              },
            }}
          >
            <div className={styles.centerContent}>
              <motion.div
                className={styles.greetingBox}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className={styles.greetingDot} />
                <div className={styles.greetingTicker}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentGreeting.text}
                      className={styles.greetingText}
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -16, opacity: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                      {currentGreeting.text}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.div>

              <div className={styles.nameTitle} role="heading" aria-level={2} aria-label="AARJAV SHUKLA">
                <ShinyText
                  text="AARJAV SHUKLA"
                  speed={1.5}
                  color="#b5b5b5"
                  shineColor="#ffffff"
                  spread={120}
                />
              </div>

              <motion.div
                className={styles.subtitleWrapper}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className={styles.roleTag}>
                  SOFTWARE DEVELOPER
                </span>
              </motion.div>

              <motion.button
                type="button"
                className={styles.skipHint}
                onClick={() => {
                  scrollToTop()
                  setProgress(100)
                  setIsFinished(true)
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                whileHover={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                [ Press Space or Click to Skip ]
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
