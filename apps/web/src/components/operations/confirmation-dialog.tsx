"use client";

export function ConfirmationDialog({
  confirmLabel,
  description,
  onCancel,
  onConfirm,
  open,
  title,
}: {
  confirmLabel: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
  open: boolean;
  title: string;
}) {
  if (!open) return null;
  return (
    <div className="dialog-layer" role="presentation">
      <section className="confirmation-dialog" role="alertdialog" aria-modal="true" aria-labelledby="confirmation-title" aria-describedby="confirmation-description">
        <p className="eyebrow">Confirm command</p>
        <h2 id="confirmation-title">{title}</h2>
        <p id="confirmation-description">{description}</p>
        <div>
          <button className="secondary-button" onClick={onCancel}>Cancel</button>
          <button className="danger-button" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </section>
    </div>
  );
}
