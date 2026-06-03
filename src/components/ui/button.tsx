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
    "bg-[linear-gradient(135deg,#5ec1eb,#39aee0)] text-white shadow-[0_18px_40px_rgba(43,147,220,0.24)] hover:brightness-105",
  secondary:
    "bg-[#eef8ff] text-[#0d526d] hover:bg-[#e1f4ff]",
  ghost: "bg-transparent text-[var(--ink)] hover:bg-black/4",
  outline:
    "border border-[var(--line)] bg-white text-[var(--ink)] hover:border-[#55b9df] hover:text-[#0d526d]",
  success:
    "bg-[linear-gradient(135deg,#2cd2a6,#15946f)] text-[#04150f] shadow-[0_18px_40px_rgba(17,148,111,0.22)] hover:brightness-105",
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
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-70",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});
