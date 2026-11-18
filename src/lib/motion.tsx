'use client'

import { MotionConfig, motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

/* Shared motion language for the landing page.
   Entrances use a soft ease-out so things glide in and settle. */
export const ease = [0.22, 1, 0.36, 1] as const
export const viewportOnce = { once: true, margin: '-10%' } as const

export const stagger = (gap = 0.1, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
})

export const rise: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

export const popIn = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 380, damping: 18, delay },
  },
})

const lineUp: Variants = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.9, ease } },
}

/* Respects the visitor's "reduce motion" setting. Wrap the page once. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

type From = 'bottom' | 'top' | 'left' | 'right' | 'scale' | 'fade'
const origin: Record<From, { x?: number; y?: number; scale?: number }> = {
  bottom: { y: 40 },
  top: { y: -40 },
  left: { x: -60 },
  right: { x: 60 },
  scale: { scale: 0.9 },
  fade: {},
}

/* Fades + slides one block in. `immediate` plays on load (for the hero),
   otherwise it plays when scrolled into view. Put layout classes on it. */
export function Reveal({
  from = 'bottom',
  delay = 0,
  duration = 0.8,
  immediate = false,
  className,
  children,
}: {
  from?: From
  delay?: number
  duration?: number
  immediate?: boolean
  className?: string
  children: ReactNode
}) {
  const shown = { opacity: 1, x: 0, y: 0, scale: 1 }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...origin[from] }}
      {...(immediate ? { animate: shown } : { whileInView: shown, viewport: viewportOnce })}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

/* Headline where each line slides up out of a mask */
export function MaskText({
  lines,
  as: Tag = 'h2',
  className,
  delay = 0,
  immediate = false,
}: {
  lines: string[]
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  delay?: number
  immediate?: boolean
}) {
  return (
    <motion.div
      variants={stagger(0.12, delay)}
      initial="hidden"
      {...(immediate ? { animate: 'show' } : { whileInView: 'show', viewport: viewportOnce })}
    >
      <Tag className={className}>
        {lines.map((l) => (
          <span key={l} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
            <motion.span variants={lineUp} className="block">
              {l}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  )
}
