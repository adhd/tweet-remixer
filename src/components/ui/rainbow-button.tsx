import React from "react"
import { cn } from "../../lib/utils"

interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function RainbowButton({
  children,
  className,
  ...props
}: RainbowButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex h-11 items-center justify-center",
        "rounded-xl px-8 py-2 font-medium",
        "text-white cursor-pointer",
        "border-[1px] border-transparent",
        
        // Rainbow gradient background
        "bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-2)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-5)),hsl(var(--color-1)))]",
        "bg-[length:200%_auto]",
        "animate-rainbow",
        
        // Transitions
        "transition-transform duration-200 ease-in-out",
        "hover:scale-105 active:scale-100",
        "disabled:opacity-50 disabled:pointer-events-none",
        
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
} 