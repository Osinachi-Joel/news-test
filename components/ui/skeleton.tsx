import React from "react"
import clsx from "clsx"

interface SkeletonProps {
  className?: string
  variant?: "rect" | "circle" | "text"
  width?: number | string
  height?: number | string
}

export function Skeleton({
  className = "",
  variant = "rect",
  width,
  height,
}: SkeletonProps) {
  const base = "bg-gray-200 animate-pulse";
  let shape = "";
  if (variant === "circle") {
    shape = "rounded-full";
  } else if (variant === "rect") {
    shape = "rounded";
  } else if (variant === "text") {
    shape = "rounded h-4";
  }
  return (
    <div
      className={clsx(base, shape, className)}
      style={{ width, height }}
      aria-busy="true"
      aria-label="Loading..."
    />
  );
}

export default Skeleton; 