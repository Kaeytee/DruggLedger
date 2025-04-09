import { Card, type CardProps } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function GlassCard({ className, ...props }: CardProps) {
  return <Card className={cn("bg-slate-800/20 backdrop-blur-md border-slate-700/50 shadow-lg", className)} {...props} />
}

