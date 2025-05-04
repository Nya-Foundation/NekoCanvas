"use client"

import { ParticlesBackground } from "./particles-background"
import { AnimatedOrbs } from "./animated-orbs"

export function AnimeBackground() {
  return (
    <>
      <AnimatedOrbs />
      <ParticlesBackground />
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0"></div>
    </>
  )
}
