import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "success";
  fullWidth?: boolean;
};

export function Button({
  children,
  className,
  variant = "primary",
  fullWidth,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5",
        variant === "primary" && "bg-accent text-white shadow-panel",
        variant === "secondary" && "border-2 border-accent bg-white text-accent",
        variant === "ghost" && "bg-white/10 text-white backdrop-blur",
        variant === "success" && "bg-success text-white",
        fullWidth && "w-full",
        props.disabled && "cursor-not-allowed opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
