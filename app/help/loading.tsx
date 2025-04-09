import { Skeleton } from "@/components/ui/skeleton"
import { GlassContainer } from "@/components/glass-container"

export default function HelpCenterLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-10 w-64 bg-slate-800" />
        <Skeleton className="h-5 w-96 mt-2 bg-slate-800" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <GlassContainer>
            <Skeleton className="h-14 w-full bg-slate-800 mb-6" />
            <Skeleton className="h-10 w-full bg-slate-800 mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Skeleton className="h-48 w-full bg-slate-800" />
              <Skeleton className="h-48 w-full bg-slate-800" />
              <Skeleton className="h-48 w-full bg-slate-800" />
              <Skeleton className="h-48 w-full bg-slate-800" />
            </div>

            <Skeleton className="h-10 w-full bg-slate-800" />
          </GlassContainer>
        </div>

        <div className="space-y-6">
          <GlassContainer>
            <Skeleton className="h-8 w-48 bg-slate-800 mb-4" />
            <div className="space-y-4">
              <Skeleton className="h-20 w-full bg-slate-800" />
              <Skeleton className="h-20 w-full bg-slate-800" />
              <Skeleton className="h-20 w-full bg-slate-800" />
              <Skeleton className="h-10 w-full bg-slate-800" />
            </div>
          </GlassContainer>

          <GlassContainer>
            <Skeleton className="h-8 w-48 bg-slate-800 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-10 w-full bg-slate-800" />
              <Skeleton className="h-10 w-full bg-slate-800" />
              <Skeleton className="h-10 w-full bg-slate-800" />
              <Skeleton className="h-10 w-full bg-slate-800" />
            </div>
          </GlassContainer>
        </div>
      </div>

      <GlassContainer>
        <Skeleton className="h-24 w-full bg-slate-800" />
      </GlassContainer>
    </div>
  )
}

