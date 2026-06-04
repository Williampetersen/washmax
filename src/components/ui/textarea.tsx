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
        "min-h-24 w-full rounded-xl border border-[#dbe6ee] bg-white px-3 py-2.5 text-sm text-[var(--ink)] outline-none transition placeholder:text-[#8ca0ad] focus:border-[#16b88f] focus:ring-4 focus:ring-[#16b88f]/12",
        className
      )}
      {...props}
    />
  );
});
