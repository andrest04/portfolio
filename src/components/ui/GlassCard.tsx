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
  default: "bg-surface-default border-border-default",
  solid: "bg-surface-medium border-border-medium",
  outline: "bg-transparent border-border-medium",
}

const variantHoverStyles: Record<GlassCardVariant, string> = {
  default: "hover:bg-surface-medium hover:border-border-strong hover:shadow-[var(--shadow-glow-primary-md)]",
  solid: "hover:bg-surface-strong hover:border-border-strong hover:shadow-[var(--shadow-glow-secondary-md)]",
  outline: "hover:bg-surface-subtle hover:border-border-strong hover:shadow-[var(--shadow-glow-primary-sm)]",
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
        "backdrop-blur-[var(--glass-backdrop)] transition-all duration-200 ease-out shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary-glow/50 focus-visible:border-border-emphasis",
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
