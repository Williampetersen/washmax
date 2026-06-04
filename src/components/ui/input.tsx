import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "h-12 w-full rounded-2xl border border-[#d7e5ee] bg-white/96 px-4 text-[var(--ink)] outline-none transition placeholder:text-[#8ca0ad] focus:border-[#7fc8ea] focus:ring-4 focus:ring-[#7fc8ea]/18",
          className
        )}
        {...props}
      />
    );
  }
);
