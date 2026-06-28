"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

export function DetailDrawer({
  children,
  onClose,
  open,
  title,
}: {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
  title: string;
}) {
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose, open]);

  if (!open) return null;
  return (
    <div className="detail-drawer-layer">
      <button className="drawer-scrim" onClick={onClose} aria-label="Close shipment details" />
      <aside className="detail-drawer-panel" role="dialog" aria-modal="true" aria-label={title}>
        <header>
          <div><p className="eyebrow">Shipment detail</p><h2>{title}</h2></div>
          <button className="icon-button" onClick={onClose} aria-label="Close shipment details"><X size={18} /></button>
        </header>
        {children}
      </aside>
    </div>
  );
}
