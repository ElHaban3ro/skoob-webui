import { Toaster as Sonner} from "sonner"
const Toaster = ({ ...props }) => {

  return (
    <Sonner
      className="toaster group bg-red-500"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
