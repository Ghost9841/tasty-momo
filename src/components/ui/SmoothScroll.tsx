
'use client'
import { ReactLenis } from 'lenis/react'


export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,           // lower = floatier/heavier (default 0.1)
        wheelMultiplier: 0.7, // lower = each wheel tick scrolls less
        touchMultiplier: 0.8, // same, for touch screens
      }}
    >
      {children}
    </ReactLenis>
  )
}