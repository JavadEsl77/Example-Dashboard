import * as React from "react"
import { cn } from "@/src/lib/utils"

const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "success" | "error" | "warning" | "outline" }>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "border-transparent bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900",
      success: "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 dark:bg-emerald-500/10",
      error: "border-transparent bg-red-500/15 text-red-700 dark:text-red-400 dark:bg-red-500/10",
      warning: "border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-400 dark:bg-amber-500/10",
      outline: "text-slate-950 dark:text-slate-50 border-slate-200 dark:border-slate-800",
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-slate-300",
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge }
