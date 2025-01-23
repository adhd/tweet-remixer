import { cn } from "../../lib/utils"
import PropTypes from "prop-types"

export function RainbowButton({
  children,
  className,
  onClick,
  disabled,
  ...props
}) {
  const handleClick = (e) => {
    console.log('Button clicked!') // Debug log
    if (!disabled && onClick) {
      onClick(e)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      style={{ position: 'relative', zIndex: 10 }} // Ensure button is clickable
      className={cn(
        // Base styles
        "relative inline-flex h-11 items-center justify-center",
        "rounded-xl px-8 py-2 font-medium",
        "text-white",
        
        // Interactive states
        "cursor-pointer select-none",
        "hover:scale-105 hover:brightness-110",
        "active:scale-100 active:brightness-90",
        !disabled && "hover:transform hover:scale-105",
        disabled && "opacity-50 cursor-not-allowed",
        
        // Rainbow gradient background
        "bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-2)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-5)),hsl(var(--color-1)))]",
        "bg-[length:200%_auto]",
        "animate-rainbow",
        
        // Transitions
        "transition-all duration-200",
        
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

RainbowButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
} 