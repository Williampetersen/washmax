import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-32 w-full rounded-xl border border-[#cbd9e4] bg-white px-4 py-3 text-[var(--ink)] outline-none transition placeholder:text-[#96a5af] focus:border-[#55b9df] focus:ring-4 focus:ring-[#55b9df]/12",
        className
      )}
      {...props}
    />
  );
});
