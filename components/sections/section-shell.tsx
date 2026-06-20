import { cn } from "@/lib/utils";

type SectionShellProps = {
  id?: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
};

export function SectionShell({
  id,
  title,
  subtitle,
  eyebrow,
  children,
  className,
  centered = false,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn("section-glow mx-auto w-full max-w-6xl px-4 py-20 md:px-6", className)}
    >
      <div className={cn("mb-10 max-w-2xl", centered && "mx-auto text-center")}>
        {eyebrow ? (
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
        {subtitle ? (
          <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
