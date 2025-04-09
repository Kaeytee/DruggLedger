import { Skeleton } from "@/components/ui/skeleton"
import { GlassContainer } from "@/components/glass-container"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Skeleton className="h-8 w-64 bg-slate-800" />
          <Skeleton className="h-4 w-80 mt-2 bg-slate-800" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-36 bg-slate-800" />
          <Skeleton className="h-6 w-20 bg-slate-800 rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <GlassContainer key={i} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-4 w-24 bg-slate-800" />
                <Skeleton className="h-7 w-32 mt-2 bg-slate-800" />
              </div>
              <Skeleton className="h-10 w-10 rounded-lg bg-slate-800" />
            </div>
            <Skeleton className="h-1 w-full mt-4 bg-slate-800" />
            <div className="flex justify-between mt-2">
              <Skeleton className="h-3 w-20 bg-slate-800" />
              <Skeleton className="h-3 w-24 bg-slate-800" />
            </div>
          </GlassContainer>
        ))}
      </div>

      <GlassContainer>
        <div className="p-4">
          <Skeleton className="h-7 w-48 mb-6 bg-slate-800" />
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full bg-slate-800" />
            ))}
          </div>
        </div>
      </GlassContainer>
    </div>
  )
}

