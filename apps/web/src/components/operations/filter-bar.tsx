export function FilterBar({ children }: { children: React.ReactNode }) {
  return (
    <section className="filter-bar" aria-label="Ready queue filters">
      {children}
    </section>
  );
}

export function FilterField({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return <label className="filter-field"><span>{label}</span>{children}</label>;
}
