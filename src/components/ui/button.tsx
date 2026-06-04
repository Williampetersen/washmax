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
    "bg-[linear-gradient(135deg,#5ec1eb,#39aee0)] text-white shadow-[0_18px_40px_rgba(43,147,220,0.2)] hover:brightness-105",
  secondary:
    "bg-[#eef7ff] text-[#0d526d] shadow-[inset_0_0_0_1px_rgba(35,136,209,0.08)] hover:bg-[#e5f4ff]",
  ghost: "bg-transparent text-[var(--ink)] hover:bg-black/4",
  outline:
    "border border-[#d4e3ed] bg-white text-[var(--ink)] shadow-[0_10px_24px_rgba(7,38,63,0.04)] hover:border-[#7fc8ea] hover:text-[#0d526d]",
  success:
    "bg-[linear-gradient(135deg,#2cd2a6,#15946f)] text-[#04150f] shadow-[0_18px_40px_rgba(17,148,111,0.2)] hover:brightness-105",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-6 text-base",
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
        "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-70",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});
