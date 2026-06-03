import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "h-12 w-full rounded-xl border border-[#cbd9e4] bg-white px-4 text-[var(--ink)] outline-none transition placeholder:text-[#96a5af] focus:border-[#55b9df] focus:ring-4 focus:ring-[#55b9df]/12",
          className
        )}
        {...props}
      />
    );
  }
);
