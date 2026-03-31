import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "min-h-12 w-full rounded-lg border border-border bg-white px-4 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10",
        props.className
      )}
    />
  );
}
