"use client";

import { Trash2 } from "lucide-react";

export function ConfirmDeleteForm({
  action,
  hiddenFields,
  message,
  label = "Slet",
  className,
}: {
  action: string;
  hiddenFields?: Record<string, string>;
  message?: string;
  label?: string;
  className?: string;
}) {
  return (
    <form
      action={action}
      method="POST"
      onSubmit={(e) => {
        const msg = message || "Er du sikker på, at du vil slette dette? Handlingen kan ikke fortrydes.";
        if (!window.confirm(msg)) {
          e.preventDefault();
        }
      }}
      onClick={(e) => e.stopPropagation()}
      className={className}
    >
      {hiddenFields
        ? Object.entries(hiddenFields).map(([name, value]) => (
            <input key={name} type="hidden" name={name} value={value} />
          ))
        : null}
      <button
        type="submit"
        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 text-[12px] font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-100"
      >
        <Trash2 className="h-3.5 w-3.5" />
        {label}
      </button>
    </form>
  );
}
