import type { TroubleshootingRecord } from "@/lib/types";

const DIFFICULTY_COLORS = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-thread-100 text-thread-700",
  hard: "bg-red-100 text-red-800",
};

export default function TroubleshootingSection({
  records,
}: {
  records: TroubleshootingRecord[];
}) {
  if (records.length === 0) return null;

  const grouped = records.reduce<Record<string, TroubleshootingRecord[]>>(
    (acc, r) => {
      const key = r.category;
      if (!acc[key]) acc[key] = [];
      acc[key].push(r);
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <h3 className="mb-3 text-lg font-semibold capitalize text-iron-900">
            {category.replace("-", " ")} problems
          </h3>
          <div className="space-y-3">
            {items.map((r) => (
              <div key={r.id} className="rounded-lg border border-iron-200 bg-white p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-semibold text-iron-900">{r.symptom}</h4>
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-medium ${DIFFICULTY_COLORS[r.difficulty]}`}
                  >
                    {r.difficulty}
                  </span>
                </div>
                {r.causes.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-iron-600">
                      Likely causes
                    </p>
                    <ul className="mt-1 list-inside list-disc space-y-0.5 text-sm text-iron-700">
                      {r.causes.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {r.fixes.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-iron-600">
                      How to fix
                    </p>
                    <ol className="mt-1 list-inside list-decimal space-y-1 text-sm text-iron-700">
                      {r.fixes.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
