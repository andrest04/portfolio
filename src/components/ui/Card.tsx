import { ElementType, HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type CardVariant = "default" | "solid" | "outline"

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
  as?: ElementType
  hover?: boolean
  variant?: CardVariant
}

const variantStyles: Record<CardVariant, string> = {
  default: "bg-surface-default border-border-default",
  solid: "bg-surface-medium border-border-medium",
  outline: "bg-transparent border-border-medium",
}

const variantHoverStyles: Record<CardVariant, string> = {
  default: "hover:bg-surface-medium hover:border-border-strong",
  solid: "hover:bg-surface-strong hover:border-border-strong",
  outline: "hover:bg-surface-subtle hover:border-border-strong",
}

export default function Card({
  children,
  className = "",
  as: Component = "div",
  hover = true,
  variant = "default",
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        "transition-colors duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30",
        "rounded-lg border",
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
