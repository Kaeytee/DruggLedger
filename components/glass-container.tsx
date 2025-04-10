import type React from "react"
import { cn } from "@/lib/utils"

interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function GlassContainer({ className, ...props }: GlassContainerProps) {
  return (
    <div
      className={cn("rounded-lg bg-slate-800/20 backdrop-blur-md border border-slate-700/50 shadow-lg p-4", className)}
      {...props}
    />
  )
}
