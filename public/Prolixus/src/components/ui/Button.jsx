"use client";

import * as React from "react";
import PropTypes from "prop-types";

/**
 * Button Component
 * 
 * A versatile, accessible button component with multiple variants and sizes.
 * Uses project CSS variables for consistent theming.
 * 
 * @example
 * // Primary button
 * <Button variant="primary">Click me</Button>
 * 
 * @example
 * // Loading state with icon
 * <Button loading leftIcon={<Icon />}>Submitting...</Button>
 * 
 * @example
 * // Full width accent button
 * <Button variant="accent" fullWidth size="lg">Get Started</Button>
 * 
 * CSS Variables Used:
 * --primary-color, --secondary-color, --accent-color,
 * --white-color, --error-color, --divider-color
 */

// Base styles applied to all buttons
const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium " +
  "transition-all duration-200 ease-in-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed " +
  "ring-offset-[var(--white-color)] cursor-pointer";

// Variant styles for different button appearances
const variantStyles = {
  primary:
    "bg-[var(--primary-color)] text-[var(--white-color)] " +
    "hover:bg-[var(--primary-color)]/90 active:bg-[var(--primary-color)]/80 " +
    "focus-visible:ring-[var(--primary-color)]",

  secondary:
    "bg-[var(--secondary-color)] text-[var(--primary-color)] " +
    "hover:bg-[var(--secondary-color)]/80 active:bg-[var(--secondary-color)]/70 " +
    "focus-visible:ring-[var(--primary-color)]",

  outline:
    "border-2 border-[var(--divider-color)] bg-transparent " +
    "text-[var(--primary-color)] hover:bg-[var(--secondary-color)] " +
    "hover:border-[var(--primary-color)] active:bg-[var(--secondary-color)]/80 " +
    "focus-visible:ring-[var(--primary-color)]",

  ghost:
    "bg-transparent text-[var(--primary-color)] " +
    "hover:bg-[var(--secondary-color)] active:bg-[var(--secondary-color)]/80 " +
    "focus-visible:ring-[var(--primary-color)]",

  accent:
    "bg-[var(--accent-color)] text-[var(--white-color)] " +
    "hover:bg-[var(--accent-color)]/90 active:bg-[var(--accent-color)]/80 " +
    "focus-visible:ring-[var(--accent-color)]",

  destructive:
    "bg-[var(--error-color)] text-[var(--white-color)] " +
    "hover:bg-[var(--error-color)]/90 active:bg-[var(--error-color)]/80 " +
    "focus-visible:ring-[var(--error-color)]",

  link:
    "bg-transparent text-[var(--accent-color)] underline-offset-4 " +
    "hover:underline focus-visible:ring-[var(--accent-color)] p-0 h-auto",
};

// Size variations for different use cases
const sizeStyles = {
  xs: "h-8 px-2.5 text-xs",
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-6 text-base",
  xl: "h-12 px-8 text-lg",
  icon: "h-10 w-10 p-0",
  "icon-sm": "h-8 w-8 p-0",
  "icon-lg": "h-12 w-12 p-0",
};

/**
 * Utility function to combine class names
 * @param {...string} classes - Class names to combine
 * @returns {string} Combined class string
 */
function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Animated spinner for loading states
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.size - Size of the spinner (sm, md, lg)
 */
function Spinner({ className = "", size = "md" }) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <svg
      className={cx(sizeClasses[size] || sizeClasses.md, "animate-spin", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      role="status"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
      />
    </svg>
  );
}

/**
 * Button component with forwardRef support
 */
const Button = React.forwardRef(function Button(
  {
    className,
    variant = "primary",
    size = "md",
    loading = false,
    loadingText,
    fullWidth = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    type = "button",
    asChild = false,
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading;
  const showLoadingText = loading && loadingText;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      aria-disabled={isDisabled}
      className={cx(
        baseStyles,
        variantStyles[variant] || variantStyles.primary,
        sizeStyles[size] || sizeStyles.md,
        fullWidth && "w-full",
        loading && "cursor-wait",
        className
      )}
      {...props}
    >
      {loading ? (
        <Spinner size={size === "sm" || size === "xs" ? "sm" : "md"} />
      ) : leftIcon ? (
        <span className="inline-flex shrink-0" aria-hidden="true">
          {leftIcon}
        </span>
      ) : null}

      {showLoadingText ? (
        <span>{loadingText}</span>
      ) : (
        <span className={cx(loading && "opacity-0", "truncate")}>
          {children}
        </span>
      )}

      {!loading && rightIcon ? (
        <span className="inline-flex shrink-0" aria-hidden="true">
          {rightIcon}
        </span>
      ) : null}
    </button>
  );
});

Button.displayName = "Button";

Button.propTypes = {
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Visual style variant */
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "outline",
    "ghost",
    "accent",
    "destructive",
    "link",
  ]),
  /** Size of the button */
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "icon", "icon-sm", "icon-lg"]),
  /** Show loading spinner */
  loading: PropTypes.bool,
  /** Text to show while loading (optional) */
  loadingText: PropTypes.string,
  /** Make button full width */
  fullWidth: PropTypes.bool,
  /** Icon to show on the left side */
  leftIcon: PropTypes.node,
  /** Icon to show on the right side */
  rightIcon: PropTypes.node,
  /** Button content */
  children: PropTypes.node,
  /** Disable the button */
  disabled: PropTypes.bool,
  /** Button type attribute */
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

export default Button;
export { Button, Spinner };
