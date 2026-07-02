import type { Metadata } from "next";
import Link from "next/link";
import { getBrands } from "@/lib/queries";
import BrandCard from "@/components/BrandCard";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Industrial Sewing Machine Brands — Manuals & Specs",
  description:
    "Browse manuals and specs by brand: Juki, Consew, Brother, Singer, Chandler, and more. Find your machine model fast.",
  alternates: { canonical: "/brands" },
};

export default async function BrandsPage() {
  const brands = await getBrands().catch(() => []);

  return (
    <div className="space-y-8">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Brands", path: "/brands" },
        ])}
      />

      <header>
        <nav className="text-sm text-iron-600">
          <Link href="/">Home</Link> / Brands
        </nav>
        <h1 className="mt-2 text-3xl font-bold text-iron-900">
          Browse by brand
        </h1>
        <p className="mt-2 text-iron-600">
          Select a brand to see all models, manuals, and troubleshooting guides.
        </p>
      </header>

      {brands.length === 0 ? (
        <p className="text-iron-600">Loading brands…</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((b) => (
            <BrandCard key={b.id} brand={b} />
          ))}
        </div>
      )}
    </div>
  );
}
