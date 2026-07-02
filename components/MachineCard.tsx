import Link from "next/link";
import type { Machine } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";

export default function MachineCard({ machine }: { machine: Machine }) {
  const brand = machine.brand;
  const href = `/brands/${brand?.slug ?? ""}/${machine.slug}`;

  return (
    <Link
      href={href}
      className="block rounded-lg border border-iron-200 bg-white p-4 no-underline hover:border-steel-600 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          {brand && (
            <p className="text-xs font-medium uppercase tracking-wide text-iron-600">
              {brand.name}
            </p>
          )}
          <h3 className="mt-0.5 font-semibold text-iron-900">{machine.model_name}</h3>
        </div>
        {machine.discontinued && (
          <span className="shrink-0 rounded bg-iron-100 px-2 py-0.5 text-xs text-iron-600">
            Discontinued
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-iron-600">
        {CATEGORY_LABELS[machine.category]}
        {machine.max_speed_spm && ` · ${machine.max_speed_spm.toLocaleString()} SPM`}
      </p>
      {machine.needle_system && (
        <p className="mt-1 text-xs text-iron-600">Needle: {machine.needle_system}</p>
      )}
      <p className="mt-3 text-xs font-medium text-steel-700">
        {machine.manual_url ? "Manual available →" : "View specs →"}
      </p>
    </Link>
  );
}
