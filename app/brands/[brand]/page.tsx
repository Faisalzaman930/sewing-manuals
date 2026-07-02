import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBrandBySlug, getMachinesByBrand, getAllBrandSlugs } from "@/lib/queries";
import MachineCard from "@/components/MachineCard";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { CATEGORY_LABELS, type MachineCategory, type Machine } from "@/lib/types";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllBrandSlugs().catch(() => []);
  return slugs.map((s) => ({ brand: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const brand = await getBrandBySlug(brandSlug).catch(() => null);
  if (!brand) return { title: "Brand not found" };
  return {
    title: `${brand.name} Industrial Sewing Machine Manuals & Specs`,
    description: `Free manuals, full specs, and troubleshooting guides for all ${brand.name} industrial sewing machine models.`,
    alternates: { canonical: `/brands/${brandSlug}` },
  };
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand: brandSlug } = await params;
  const brand = await getBrandBySlug(brandSlug).catch(() => null);
  if (!brand) notFound();

  const machines = await getMachinesByBrand(brand.id).catch(() => []);

  const byCategory = machines.reduce<Record<string, Machine[]>>((acc, m) => {
    const key = m.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(m);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Brands", path: "/brands" },
          { name: brand.name, path: `/brands/${brandSlug}` },
        ])}
      />

      <header>
        <nav className="text-sm text-iron-600">
          <Link href="/">Home</Link> / <Link href="/brands">Brands</Link> / {brand.name}
        </nav>
        <h1 className="mt-2 text-3xl font-bold text-iron-900">
          {brand.name} Industrial Sewing Machine Manuals
        </h1>
        {brand.description && (
          <p className="mt-3 max-w-2xl text-iron-600">{brand.description}</p>
        )}
        <div className="mt-2 flex gap-3 text-sm text-iron-600">
          {brand.country && <span>{brand.country}</span>}
          {brand.website_url && (
            <a href={brand.website_url} target="_blank" rel="nofollow noreferrer" className="text-steel-700 hover:underline">
              Official website →
            </a>
          )}
        </div>
      </header>

      {machines.length === 0 ? (
        <p className="text-iron-600">No models listed yet for {brand.name}.</p>
      ) : (
        Object.entries(byCategory).map(([category, items]) => (
          <section key={category}>
            <h2 className="mb-4 text-xl font-semibold text-iron-900">
              {CATEGORY_LABELS[category as MachineCategory] ?? category}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((m) => (
                <MachineCard key={m.id} machine={{ ...m, brand }} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
