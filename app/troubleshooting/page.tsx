import type { Metadata } from "next";
import Link from "next/link";
import { getAllTroubleshooting } from "@/lib/queries";
import type { TroubleshootingRecord } from "@/lib/types";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Industrial Sewing Machine Troubleshooting — Fix Common Problems",
  description:
    "Step-by-step fixes for the most common industrial sewing machine problems: thread tension, skipped stitches, hook timing, broken needles, and more.",
  alternates: { canonical: "/troubleshooting" },
};

const DIFFICULTY_COLORS = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-thread-100 text-thread-700",
  hard: "bg-red-100 text-red-800",
};

export default async function TroubleshootingPage() {
  const records = await getAllTroubleshooting().catch(() => []);

  const grouped = records.reduce<Record<string, TroubleshootingRecord[]>>((acc, r) => {
    const key = r.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});

  const faqItems = records.slice(0, 8).map((r) => ({
    q: r.symptom,
    a: r.fixes[0] ?? r.causes[0] ?? "",
  }));

  return (
    <div className="space-y-10">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Troubleshooting", path: "/troubleshooting" },
          ]),
          ...(faqItems.length > 0 ? [faqSchema(faqItems)] : []),
        ]}
      />

      <header>
        <nav className="text-sm text-iron-600">
          <Link href="/">Home</Link> / Troubleshooting
        </nav>
        <h1 className="mt-2 text-3xl font-bold text-iron-900">
          Industrial Sewing Machine Troubleshooting
        </h1>
        <p className="mt-3 max-w-2xl text-iron-600">
          Step-by-step fixes for the most common industrial sewing machine
          problems — grouped by symptom category. Most issues can be fixed in
          under 10 minutes without a technician.
        </p>
      </header>

      <nav className="flex flex-wrap gap-2">
        {Object.keys(grouped).map((cat) => (
          <a
            key={cat}
            href={`#${cat}`}
            className="rounded-md border border-iron-200 bg-white px-3 py-1.5 text-sm font-medium text-iron-700 hover:border-steel-600"
          >
            {cat.replace("-", " ")}
          </a>
        ))}
      </nav>

      {Object.entries(grouped).map(([category, items]) => (
        <section key={category} id={category}>
          <h2 className="mb-4 text-2xl font-bold capitalize text-iron-900">
            {category.replace("-", " ")} problems
          </h2>
          <div className="space-y-4">
            {items.map((r) => (
              <div key={r.id} className="rounded-lg border border-iron-200 bg-white p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/troubleshooting/${r.slug}`} className="font-semibold text-iron-900 hover:text-steel-700">
                    {r.symptom}
                  </Link>
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-medium ${DIFFICULTY_COLORS[r.difficulty]}`}
                  >
                    {r.difficulty}
                  </span>
                </div>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  {r.causes.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-iron-600">
                        Likely causes
                      </p>
                      <ul className="mt-1 list-inside list-disc space-y-0.5 text-sm text-iron-700">
                        {r.causes.map((c, i) => <li key={i}>{c}</li>)}
                      </ul>
                    </div>
                  )}
                  {r.fixes.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-iron-600">
                        How to fix
                      </p>
                      <ol className="mt-1 list-inside list-decimal space-y-1 text-sm text-iron-700">
                        {r.fixes.map((f, i) => <li key={i}>{f}</li>)}
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {records.length === 0 && (
        <p className="text-iron-600">Troubleshooting guides loading…</p>
      )}
    </div>
  );
}
