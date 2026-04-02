import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "h-14 w-full appearance-none rounded-2xl border border-[#d8d1c5] bg-[#fcfaf6] px-5 py-0 pr-10 text-[16px] leading-none text-text shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] outline-none transition duration-200 hover:border-primary/30 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10",
        props.className
      )}
    />
  );
}
