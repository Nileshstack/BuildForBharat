import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
  headingClassName = "",
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  headingClassName?: string;
  children?: ReactNode;
}) {
  const Heading = as;

  return (
    <div
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow ? (
        <p className="mb-3 font-heading text-xs font-semibold uppercase tracking-[0.16em] text-saffron">
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={`font-heading text-3xl font-semibold leading-tight text-navy sm:text-4xl ${headingClassName}`}
      >
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 text-base leading-7 text-navy/70">{description}</p>
      ) : null}
      {children}
    </div>
  );
}
