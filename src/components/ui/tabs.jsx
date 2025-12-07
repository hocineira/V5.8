import * as React from "react"
import { cn } from "../../lib/utils"

const Tabs = ({ defaultValue, className, children, ...props }) => {
  const [value, setValue] = React.useState(defaultValue)

  return (
    <div className={cn("w-full", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value, setValue })
        }
        return child
      })}
    </div>
  )
}

const TabsList = ({ className, children, value, setValue, ...props }) => (
  <div
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  >
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { value, setValue })
      }
      return child
    })}
  </div>
)

const TabsTrigger = ({ className, value: triggerValue, setValue, value: currentValue, children, ...props }) => (
  <button
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      currentValue === triggerValue
        ? "bg-background text-foreground shadow-sm"
        : "hover:bg-muted hover:text-foreground",
      className
    )}
    onClick={() => setValue(triggerValue)}
    {...props}
  >
    {children}
  </button>
)

const TabsContent = ({ className, value: contentValue, value: currentValue, children, ...props }) => {
  if (currentValue !== contentValue) return null
  
  return (
    <div
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }