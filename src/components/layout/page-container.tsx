import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type PageContainerProps = {
  children: ReactNode
  className?: string
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <main className={cn("min-h-screen bg-background", className)}>
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-5 px-6 py-5">
        {children}
      </div>
    </main>
  )
}
