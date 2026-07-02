import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTroubleshootingBySlug, getAllTroubleshootingSlugs } from "@/lib/queries";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, howToSchema } from "@/lib/seo";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllTroubleshootingSlugs().catch(() => []);
  return slugs.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const record = await getTroubleshootingBySlug(slug).catch(() => null);
  if (!record) return { title: "Guide not found" };
  return {
    title: `${record.symptom} — Industrial Sewing Machine Fix`,
    description: `Step-by-step fix for: ${record.symptom}. Covers likely causes and ${record.fixes.length} repair steps. Difficulty: ${record.difficulty}.`,
    alternates: { canonical: `/troubleshooting/${slug}` },
  };
}

const DIFFICULTY_COLORS = {
  easy:   "bg-green-100 text-green-800",
  medium: "bg-thread-100 text-thread-700",
  hard:   "bg-red-100 text-red-800",
};

export default async function TroubleshootingSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const record = await getTroubleshootingBySlug(slug).catch(() => null);
  if (!record) notFound();

  const howTo = howToSchema({
    name: `How to fix: ${record.symptom}`,
    description: `Step-by-step instructions for fixing an industrial sewing machine problem: ${record.symptom}. Difficulty: ${record.difficulty}.`,
    difficulty: record.difficulty,
    steps: record.fixes.map((fix, i) => ({
      name: `Step ${i + 1}`,
      text: fix,
    })),
  });

  return (
    <div className="space-y-8">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Troubleshooting", path: "/troubleshooting" },
            { name: record.symptom, path: `/troubleshooting/${slug}` },
          ]),
          howTo,
        ]}
      />

      <header>
        <nav className="text-sm text-iron-600">
          <Link href="/">Home</Link> / <Link href="/troubleshooting">Troubleshooting</Link> / {record.category}
        </nav>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold text-iron-900 sm:text-3xl">
            {record.symptom}
          </h1>
          <span className={`shrink-0 rounded px-2 py-0.5 text-sm font-medium ${DIFFICULTY_COLORS[record.difficulty]}`}>
            {record.difficulty}
          </span>
        </div>
        <p className="mt-2 text-sm capitalize text-iron-500">
          Category: <Link href={`/troubleshooting#${record.category}`} className="text-steel-700 hover:underline">{record.category.replace("-", " ")}</Link>
        </p>
      </header>

      {record.causes.length > 0 && (
        <section className="rounded-lg border border-iron-200 bg-white p-5">
          <h2 className="mb-3 font-bold text-iron-900">Likely causes</h2>
          <ul className="space-y-2">
            {record.causes.map((cause, i) => (
              <li key={i} className="flex gap-2 text-sm text-iron-700">
                <span className="mt-0.5 shrink-0 text-thread-600">▸</span>
                {cause}
              </li>
            ))}
          </ul>
        </section>
      )}

      {record.fixes.length > 0 && (
        <section className="rounded-lg border border-iron-200 bg-white p-5">
          <h2 className="mb-3 font-bold text-iron-900">How to fix it — step by step</h2>
          <ol className="space-y-4">
            {record.fixes.map((fix, i) => (
              <li key={i} className="flex gap-3 text-sm text-iron-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-steel-900 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="mt-0.5">{fix}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="rounded-lg border border-iron-200 bg-iron-50 p-5">
        <h2 className="mb-2 font-bold text-iron-900">Still not fixed?</h2>
        <p className="text-sm text-iron-700">
          Check your machine&apos;s specific manual for model-level adjustments.{" "}
          <Link href="/brands" className="text-steel-700 hover:underline">Browse all brands →</Link>
        </p>
      </section>

      <nav className="text-sm">
        <Link href="/troubleshooting" className="text-steel-700 hover:underline">
          ← Back to all troubleshooting guides
        </Link>
      </nav>
    </div>
  );
}
