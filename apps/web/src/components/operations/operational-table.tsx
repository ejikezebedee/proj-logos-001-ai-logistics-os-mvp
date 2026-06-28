export function OperationalTable({
  caption,
  children,
  head,
}: {
  caption: string;
  children: React.ReactNode;
  head: React.ReactNode;
}) {
  return (
    <div className="table-scroll">
      <table className="operational-table">
        <caption className="sr-only">{caption}</caption>
        <thead>{head}</thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
