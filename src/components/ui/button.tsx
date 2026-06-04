import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "success";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[#12b886] text-white shadow-[0_14px_32px_rgba(18,184,134,0.2)] hover:bg-[#0ca678]",
  secondary:
    "bg-[#e9fbf5] text-[#08745a] shadow-[inset_0_0_0_1px_rgba(18,184,134,0.1)] hover:bg-[#dff8ef]",
  ghost: "bg-transparent text-[var(--ink)] hover:bg-black/4",
  outline:
    "border border-[#d4e3ed] bg-white text-[var(--ink)] shadow-[0_8px_20px_rgba(7,38,63,0.035)] hover:border-[#16b88f] hover:text-[#08745a]",
  success:
    "bg-[#08745a] text-white shadow-[0_14px_32px_rgba(8,116,90,0.2)] hover:bg-[#06634d]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-sm",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", size = "md", type = "button", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-70",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});
