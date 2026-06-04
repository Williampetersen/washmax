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
        "min-h-32 w-full rounded-2xl border border-[#d7e5ee] bg-white/96 px-4 py-3 text-[var(--ink)] outline-none transition placeholder:text-[#8ca0ad] focus:border-[#7fc8ea] focus:ring-4 focus:ring-[#7fc8ea]/18",
        className
      )}
      {...props}
    />
  );
});
