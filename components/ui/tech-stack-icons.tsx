import Image from "next/image";

import { cn } from "@/lib/utils";
import { getTechDisplayName, getTechIconUrl } from "@/lib/tech-icons";

type TechStackIconsProps = {
  technologies: string[];
  limit?: number;
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
  layout?: "inline" | "grid";
  className?: string;
};

const sizeMap = {
  sm: { icon: 18, container: "size-9", text: "text-xs" },
  md: { icon: 22, container: "size-10", text: "text-sm" },
  lg: { icon: 28, container: "size-12", text: "text-sm" },
};

export function TechStackIcons({
  technologies,
  limit,
  size = "md",
  showLabels = false,
  layout = "inline",
  className,
}: TechStackIconsProps) {
  const items = limit ? technologies.slice(0, limit) : technologies;
  const dimensions = sizeMap[size];
  const isGrid = showLabels && layout === "grid";

  return (
    <div
      className={cn(
        isGrid ? "grid grid-cols-2 gap-3 sm:grid-cols-3" : "flex flex-wrap items-center gap-2",
        className,
      )}
    >
      {items.map((tech) => (
        <div
          key={tech}
          title={tech}
          className={cn(
            "inline-flex items-center gap-2.5 rounded-xl border border-border bg-muted/30 shadow-sm transition-colors hover:border-primary/30 hover:bg-primary/5",
            showLabels ? "px-3 py-2.5" : cn(dimensions.container, "justify-center"),
            isGrid && "w-full",
          )}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-card">
            <Image
              src={getTechIconUrl(tech)}
              alt={tech}
              width={dimensions.icon}
              height={dimensions.icon}
              className="shrink-0 object-contain"
              unoptimized
            />
          </span>
          {showLabels ? (
            <span className={cn("font-medium text-foreground", dimensions.text)}>
              {getTechDisplayName(tech)}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
