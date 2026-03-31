import type { ComponentType } from "react";
import * as Icons from "lucide-react";

export function ServiceIcon({
  name,
  className
}: {
  name: string;
  className?: string;
}) {
  const Icon =
    (Icons as unknown as Record<string, ComponentType<{ className?: string }>>)[name] ??
    Icons.Wrench;
  return <Icon className={className} />;
}
