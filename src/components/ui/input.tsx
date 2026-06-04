import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "h-10 w-full rounded-xl border border-[#dbe6ee] bg-white px-3 text-sm text-[var(--ink)] outline-none transition placeholder:text-[#8ca0ad] focus:border-[#16b88f] focus:ring-4 focus:ring-[#16b88f]/12",
          className
        )}
        {...props}
      />
    );
  }
);
