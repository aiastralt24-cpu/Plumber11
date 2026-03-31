import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-28 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10",
        props.className
      )}
    />
  );
}
