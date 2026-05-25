"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

import { pageReveal } from "@/lib/motion"

type PageTransitionProps = {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <>{children}</>
  }

  return (
    <motion.div {...pageReveal} className="min-h-full">
      {children}
    </motion.div>
  )
}
