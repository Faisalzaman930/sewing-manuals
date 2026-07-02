import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMachinesByCategory } from "@/lib/queries";
import MachineCard from "@/components/MachineCard";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { CATEGORY_LABELS, CATEGORY_DESCRIPTIONS, type MachineCategory } from "@/lib/types";

export const revalidate = 86400;
export const dynamicParams = false;

const VALID_CATEGORIES: MachineCategory[] = [
  "lockstitch", "overlock", "walking-foot", "coverstitch",
  "blind-stitch", "post-bed", "cylinder-arm",
];

export function generateStaticParams() {
  return VALID_CATEGORIES.map((c) => ({ category: c }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const label = CATEGORY_LABELS[category as MachineCategory];
  if (!label) return { title: "Category not found" };
  return {
    title: `${label} Industrial Sewing Machine Manuals`,
    description: `${CATEGORY_DESCRIPTIONS[category as MachineCategory]} Free manuals, full specs, and troubleshooting for every ${label.toLowerCase()} industrial sewing machine.`,
    alternates: { canonical: `/categories/${category}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = category as MachineCategory;
  if (!VALID_CATEGORIES.includes(cat)) notFound();

  const machines = await getMachinesByCategory(cat).catch(() => []);
  const label = CATEGORY_LABELS[cat];
  const desc = CATEGORY_DESCRIPTIONS[cat];

  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Categories", path: "/brands" },
          { name: label, path: `/categories/${category}` },
        ])}
      />

      <header>
        <nav className="text-sm text-iron-600">
          <Link href="/">Home</Link> / <Link href="/brands">Brands</Link> / {label}
        </nav>
        <h1 className="mt-2 text-3xl font-bold text-iron-900">
          {label} Industrial Sewing Machine Manuals
        </h1>
        <p className="mt-3 max-w-2xl text-iron-600">{desc}</p>
        <p className="mt-1 text-sm text-iron-500">
          {machines.length} model{machines.length !== 1 ? "s" : ""} with full specs and troubleshooting
        </p>
      </header>

      {machines.length === 0 ? (
        <p className="text-iron-600">No models listed yet for this category.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {machines.map((m) => (
            <MachineCard key={m.id} machine={m} />
          ))}
        </div>
      )}
    </div>
  );
}
