import { ElementType, HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type GlassCardVariant = "default" | "solid" | "outline"

interface GlassCardProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
  as?: ElementType
  hover?: boolean
  variant?: GlassCardVariant
}

const variantStyles: Record<GlassCardVariant, string> = {
  default: "bg-[rgba(255,255,255,0.06)] border-[rgba(255,255,255,0.12)]",
  solid: "bg-[rgba(255,255,255,0.10)] border-[rgba(255,255,255,0.16)]",
  outline: "bg-transparent border-[rgba(255,255,255,0.14)]",
}

const variantHoverStyles: Record<GlassCardVariant, string> = {
  default: "hover:bg-[rgba(255,255,255,0.09)] hover:border-[rgba(255,255,255,0.18)] hover:shadow-[0_0_24px_rgba(59,130,246,0.18),0_0_12px_rgba(96,165,250,0.10)]",
  solid: "hover:bg-[rgba(255,255,255,0.14)] hover:border-[rgba(255,255,255,0.22)] hover:shadow-[0_0_24px_rgba(59,130,246,0.18),0_0_12px_rgba(96,165,250,0.10)]",
  outline: "hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.20)] hover:shadow-[0_0_20px_rgba(59,130,246,0.15),0_0_10px_rgba(96,165,250,0.08)]",
}

export default function GlassCard({
  children,
  className = "",
  as: Component = "div",
  hover = true,
  variant = "default",
  ...props
}: GlassCardProps) {
  return (
    <Component
      className={cn(
        "backdrop-blur-[18px] transition-all duration-200 ease-out shadow-[0_4px_16px_rgba(0,0,0,0.12)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(59,130,246,0.5)] focus-visible:border-[rgba(255,255,255,0.24)]",
        "rounded-2xl border",
        variantStyles[variant],
        hover && variantHoverStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
