import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[1.75rem] border border-[var(--line)] bg-white shadow-[0_24px_70px_rgba(8,27,21,0.08)]",
        className
      )}
      {...props}
    />
  );
}
