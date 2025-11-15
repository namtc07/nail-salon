import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "success" | "danger";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600",
        variant === "default" && "bg-slate-100 text-slate-700 border-slate-300",
        variant === "outline" && "text-slate-700 border-slate-300",
        variant === "success" && "bg-emerald-100 text-emerald-700 border-emerald-200",
        variant === "danger" && "bg-rose-100 text-rose-700 border-rose-200",
        className
      )}
      {...props}
    />
  );
}
