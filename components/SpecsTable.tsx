import type { Machine } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";

export default function SpecsTable({ machine }: { machine: Machine }) {
  const rows: { label: string; value: string | number | null | undefined }[] = [
    { label: "Type", value: CATEGORY_LABELS[machine.category] },
    { label: "Max Speed", value: machine.max_speed_spm ? `${machine.max_speed_spm.toLocaleString()} SPM` : null },
    { label: "Max Stitch Length", value: machine.stitch_length_max ? `${machine.stitch_length_max} mm` : null },
    { label: "Needle System", value: machine.needle_system },
    { label: "Needle Sizes", value: machine.needle_size_range },
    { label: "Bobbin Type", value: machine.bobbin_type },
    { label: "Presser Foot Lift", value: machine.presser_foot_height ? `${machine.presser_foot_height} mm` : null },
    { label: "Max Material Height", value: machine.lift_height_max ? `${machine.lift_height_max} mm` : null },
    { label: "Year Introduced", value: machine.year_introduced },
    { label: "Status", value: machine.discontinued ? "Discontinued" : "Current" },
  ].filter((r) => r.value != null);

  return (
    <div className="overflow-hidden rounded-lg border border-iron-200">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-iron-50"}>
              <td className="w-44 px-4 py-2.5 font-medium text-iron-700">{row.label}</td>
              <td className="px-4 py-2.5 text-iron-900">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
