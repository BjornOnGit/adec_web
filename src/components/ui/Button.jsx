import { forwardRef } from "react"
import { Link } from "react-router-dom"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-gray-900 text-white hover:bg-gray-800",
        primary: "bg-primary text-white hover:bg-primary-dark",
        secondary: "bg-secondary text-white hover:bg-secondary-dark",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  },
)

const Button = forwardRef(({ className, variant, size, fullWidth, asChild, href, to, ...props }, ref) => {
  if (asChild) {
    return <slot className={cn(buttonVariants({ variant, size, fullWidth, className }))} ref={ref} {...props} />
  }

  if (href) {
    return (
      <a className={cn(buttonVariants({ variant, size, fullWidth, className }))} ref={ref} href={href} {...props} />
    )
  }

  if (to) {
    return <Link className={cn(buttonVariants({ variant, size, fullWidth, className }))} ref={ref} to={to} {...props} />
  }

  return <button className={cn(buttonVariants({ variant, size, fullWidth, className }))} ref={ref} {...props} />
})

Button.displayName = "Button"

export default Button
export { buttonVariants }
