import { cn } from "@/lib/utils"

function Skeleton({
  className,
  width,
  height,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  width?: string
  height?: string
}) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
      style={{
        width: width || "100%",
        height: height || "1rem"
      }}
      {...props}
    />
  )
}

export { Skeleton }
