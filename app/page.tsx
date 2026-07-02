import type { Metadata } from "next";
import Link from "next/link";
import { getBrands } from "@/lib/queries";
import { CATEGORY_LABELS, type MachineCategory } from "@/lib/types";
import JsonLd from "@/components/JsonLd";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Industrial Sewing Machine Manuals, Specs & Troubleshooting",
  description:
    "Free manuals, specs, and troubleshooting for Juki, Consew, Brother, Singer, and more. Find your model and fix your machine fast.",
  alternates: { canonical: "/" },
};

const POPULAR = [
  { href: "/brands/juki/juki-ddl-8700", label: "Juki DDL-8700", desc: "Lockstitch · 5,500 SPM" },
  { href: "/brands/consew/consew-206rb-5", label: "Consew 206RB-5", desc: "Walking Foot · 2,500 SPM" },
  { href: "/brands/singer/singer-111w155", label: "Singer 111W155", desc: "Walking Foot · Vintage" },
  { href: "/brands/juki/juki-mo-6714s", label: "Juki MO-6714S", desc: "Overlock · 7,000 SPM" },
  { href: "/brands/brother/brother-db2-b791", label: "Brother DB2-B791", desc: "Lockstitch · 5,000 SPM" },
  { href: "/brands/juki/juki-dnu-1541", label: "Juki DNU-1541", desc: "Walking Foot · Heavy Duty" },
];

const CATEGORIES: { key: MachineCategory; emoji: string }[] = [
  { key: "lockstitch", emoji: "🔵" },
  { key: "overlock", emoji: "🟡" },
  { key: "walking-foot", emoji: "🟤" },
  { key: "coverstitch", emoji: "🟢" },
  { key: "blind-stitch", emoji: "⚪" },
  { key: "post-bed", emoji: "🔴" },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SewingMachineManuals.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.sewingmachinemanuals.com",
  description: "Free manuals and troubleshooting for industrial sewing machines.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "/brands?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default async function HomePage() {
  const brands = await getBrands().catch(() => []);

  return (
    <div className="space-y-12">
      <JsonLd data={schema} />

      <section className="rounded-2xl bg-steel-900 px-6 py-10 text-center text-white">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Industrial Sewing Machine Manuals
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-iron-300">
          Free manuals, full specs, and model-specific troubleshooting for Juki,
          Consew, Brother, Singer, and more.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/brands"
            className="rounded-lg bg-thread-600 px-5 py-2.5 font-semibold text-white no-underline hover:bg-thread-700"
          >
            Browse all brands →
          </Link>
          <Link
            href="/troubleshooting"
            className="rounded-lg border border-iron-600 px-5 py-2.5 font-semibold text-white no-underline hover:border-iron-400"
          >
            Fix a problem
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-iron-900">Most searched models</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {POPULAR.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="rounded-lg border border-iron-200 bg-white p-4 no-underline hover:border-steel-600"
            >
              <p className="font-semibold text-iron-900">{m.label}</p>
              <p className="mt-0.5 text-sm text-iron-600">{m.desc}</p>
              <p className="mt-2 text-xs font-medium text-steel-700">Manual + troubleshooting →</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-iron-900">Browse by machine type</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map(({ key, emoji }) => (
            <Link
              key={key}
              href={`/brands?category=${key}`}
              className="flex items-center gap-3 rounded-lg border border-iron-200 bg-white p-4 no-underline hover:border-steel-600"
            >
              <span className="text-2xl">{emoji}</span>
              <span className="font-medium text-iron-900">{CATEGORY_LABELS[key]}</span>
            </Link>
          ))}
        </div>
      </section>

      {brands.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-bold text-iron-900">Browse by brand</h2>
          <div className="flex flex-wrap gap-2">
            {brands.map((b) => (
              <Link
                key={b.id}
                href={`/brands/${b.slug}`}
                className="rounded-md border border-iron-200 bg-white px-4 py-2 text-sm font-medium text-iron-900 no-underline hover:border-steel-600"
              >
                {b.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-lg border border-iron-200 bg-white p-6">
        <h2 className="text-lg font-bold text-iron-900">
          Can&apos;t find your model?
        </h2>
        <p className="mt-2 text-sm text-iron-700">
          We&apos;re adding models every week. Browse{" "}
          <Link href="/brands">all brands</Link>, check{" "}
          <Link href="/troubleshooting">common troubleshooting guides</Link>, or
          find your manual on{" "}
          <a href="https://www.manualslib.com" target="_blank" rel="nofollow noreferrer">
            ManualsLib
          </a>.
        </p>
      </section>
    </div>
  );
}
