import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary-glow))]",
  {
    variants: {
      variant: {
        default: "bg-[rgb(var(--primary))] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)] hover:shadow-[0_0_40px_rgba(var(--primary),0.25)]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline:
          "border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.92)] backdrop-blur-[18px] hover:border-[rgba(255,255,255,0.22)] hover:bg-[rgba(255,255,255,0.09)]",
        secondary:
          "bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.92)] hover:bg-[rgba(255,255,255,0.09)]",
        ghost:
          "text-[rgba(255,255,255,0.70)] hover:bg-[rgba(255,255,255,0.06)] hover:text-[rgba(255,255,255,0.92)]",
        link: "text-[rgb(var(--primary))] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
