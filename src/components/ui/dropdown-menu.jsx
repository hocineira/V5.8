&apos;use client&apos;

import * as React from &apos;react&apos;
import { cn } from &apos;@/lib/utils&apos;

const DropdownMenu = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(&apos;relative inline-block text-left&apos;, className)}
    {...props}
  />
))
DropdownMenu.displayName = &apos;DropdownMenu&apos;

const DropdownMenuTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(&apos;inline-flex items-center justify-center&apos;, className)}
    {...props}
  >
    {children}
  </button>
))
DropdownMenuTrigger.displayName = &apos;DropdownMenuTrigger&apos;

const DropdownMenuContent = React.forwardRef(({ 
  className, 
  sideOffset = 4, 
  align = &apos;center&apos;,
  children,
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={cn(
      &apos;absolute z-50 min-w-[12rem] overflow-hidden rounded-lg border bg-white/95 backdrop-blur-lg shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
      align === &apos;start&apos; && &apos;left-0&apos;,
      align === &apos;center&apos; && &apos;left-1/2 transform -translate-x-1/2&apos;,
      align === &apos;end&apos; && &apos;right-0&apos;,
      className
    )}
    style={{ marginTop: sideOffset }}
    {...props}
  >
    {children}
  </div>
))
DropdownMenuContent.displayName = &apos;DropdownMenuContent&apos;

const DropdownMenuItem = React.forwardRef(({ 
  className, 
  inset, 
  children,
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={cn(
      &apos;relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-gray-100
      inset && &apos;pl-8&apos;,
      className
    )}
    {...props}
  >
    {children}
  </div>
))
DropdownMenuItem.displayName = &apos;DropdownMenuItem&apos;

const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(&apos;-mx-1 my-1 h-px bg-gray-200 className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = &apos;DropdownMenuSeparator&apos;

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
}