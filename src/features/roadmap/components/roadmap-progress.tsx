"use client"

import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

type RoadmapProgressProps = {
  label?: string
  value: number
  tone?: "primary" | "success" | "warning"
}

export function RoadmapProgress({
  label = "Progress",
  value,
  tone = "primary",
}: RoadmapProgressProps) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground">{value}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted/60">
        <motion.div
          className={cn(
            "h-full rounded-full",
            tone === "primary" && "bg-primary/80",
            tone === "success" && "bg-success",
            tone === "warning" && "bg-warning"
          )}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
