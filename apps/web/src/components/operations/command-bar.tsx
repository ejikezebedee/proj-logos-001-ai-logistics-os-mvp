export function CommandBar({
  children,
  selectionCount,
}: {
  children: React.ReactNode;
  selectionCount: number;
}) {
  return (
    <div className="operations-command-bar" aria-label="Queue commands">
      <span aria-live="polite">
        <strong>{selectionCount}</strong> {selectionCount === 1 ? "shipment" : "shipments"} selected
      </span>
      <div>{children}</div>
    </div>
  );
}
