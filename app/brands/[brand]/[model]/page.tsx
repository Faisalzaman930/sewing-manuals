import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMachineBySlug, getTroubleshootingForMachine, getAllMachineSlugs } from "@/lib/queries";
import PdfViewer from "@/components/PdfViewer";
import SpecsTable from "@/components/SpecsTable";
import TroubleshootingSection from "@/components/TroubleshootingSection";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/seo";
import { CATEGORY_LABELS } from "@/lib/types";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllMachineSlugs().catch(() => []);
  return slugs.map((s) => ({ brand: s.brand_slug, model: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string; model: string }>;
}): Promise<Metadata> {
  const { model: modelSlug } = await params;
  const machine = await getMachineBySlug(modelSlug).catch(() => null);
  if (!machine) return { title: "Model not found" };
  const brand = machine.brand;
  return {
    title: `${brand?.name ?? ""} ${machine.model_name} Manual, Specs & Troubleshooting`,
    description: `Free ${brand?.name ?? ""} ${machine.model_name} instruction manual (PDF), full specs, needle/bobbin info, and step-by-step troubleshooting guides.`,
    alternates: { canonical: `/brands/${brand?.slug}/${modelSlug}` },
  };
}

export default async function ModelPage({
  params,
}: {
  params: Promise<{ brand: string; model: string }>;
}) {
  const { brand: brandSlug, model: modelSlug } = await params;
  const machine = await getMachineBySlug(modelSlug).catch(() => null);
  if (!machine) notFound();

  const brand = machine.brand;
  const troubleshooting = await getTroubleshootingForMachine(machine.id).catch(() => []);

  const faqItems = troubleshooting.slice(0, 5).map((t) => ({
    q: t.symptom,
    a: `${t.causes[0] ? `Common cause: ${t.causes[0]}. ` : ""}${t.fixes[0] ?? ""}`,
  }));

  return (
    <div className="space-y-10">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Brands", path: "/brands" },
            { name: brand?.name ?? "", path: `/brands/${brandSlug}` },
            { name: machine.model_name, path: `/brands/${brandSlug}/${modelSlug}` },
          ]),
          productSchema({
            name: `${brand?.name ?? ""} ${machine.model_name}`,
            description: machine.description ?? `${brand?.name ?? ""} ${machine.model_name} industrial sewing machine`,
            brand: brand?.name ?? "",
            url: `/brands/${brandSlug}/${modelSlug}`,
          }),
          ...(faqItems.length > 0 ? [faqSchema(faqItems)] : []),
        ]}
      />

      <header>
        <nav className="text-sm text-iron-600">
          <Link href="/">Home</Link> /{" "}
          <Link href="/brands">Brands</Link> /{" "}
          <Link href={`/brands/${brandSlug}`}>{brand?.name}</Link> /{" "}
          {machine.model_name}
        </nav>
        <h1 className="mt-2 text-3xl font-bold text-iron-900">
          {brand?.name} {machine.model_name}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="rounded bg-steel-100 px-2 py-0.5 text-sm font-medium text-steel-800">
            {CATEGORY_LABELS[machine.category]}
          </span>
          {machine.discontinued && (
            <span className="rounded bg-iron-200 px-2 py-0.5 text-sm text-iron-700">
              Discontinued
            </span>
          )}
          {machine.max_speed_spm && (
            <span className="text-sm text-iron-600">
              {machine.max_speed_spm.toLocaleString()} SPM
            </span>
          )}
        </div>
        {machine.description && (
          <p className="mt-3 max-w-2xl text-iron-700">{machine.description}</p>
        )}
      </header>

      <section>
        <h2 className="mb-3 text-xl font-bold text-iron-900">
          {brand?.name} {machine.model_name} Manual
        </h2>
        {machine.manual_url ? (
          <PdfViewer
            url={machine.manual_url}
            title={`${brand?.name} ${machine.model_name} Instruction Manual`}
          />
        ) : (
          <div className="rounded-lg border border-iron-200 bg-white p-5">
            <p className="text-sm text-iron-600 mb-3">
              We don&apos;t have a direct link for this model yet. ManualsLib hosts manuals for most industrial sewing machines — search there:
            </p>
            <a
              href={`https://www.manualslib.com/search/?q=${encodeURIComponent(`${brand?.name ?? ""} ${machine.model_name}`)}`}
              target="_blank"
              rel="nofollow noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-steel-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-steel-700"
            >
              Search ManualsLib for {machine.model_name} manual →
            </a>
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold text-iron-900">Full specifications</h2>
        <SpecsTable machine={machine} />
      </section>

      <section className="rounded-lg border border-thread-100 bg-thread-50 p-5">
        <h2 className="mb-3 text-lg font-bold text-iron-900">
          Needle, bobbin & compatible supplies
        </h2>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          {machine.needle_system && (
            <div>
              <dt className="font-semibold text-iron-700">Needle system</dt>
              <dd className="text-iron-900">{machine.needle_system}</dd>
            </div>
          )}
          {machine.needle_size_range && (
            <div>
              <dt className="font-semibold text-iron-700">Needle sizes</dt>
              <dd className="text-iron-900">{machine.needle_size_range}</dd>
            </div>
          )}
          {machine.bobbin_type && (
            <div>
              <dt className="font-semibold text-iron-700">Bobbin type</dt>
              <dd className="text-iron-900">{machine.bobbin_type}</dd>
            </div>
          )}
        </dl>
        <p className="mt-3 text-xs text-iron-600">
          Search Amazon for{" "}
          <a
            href={`https://www.amazon.com/s?k=${encodeURIComponent(`${machine.needle_system ?? ""} sewing machine needles`)}`}
            target="_blank"
            rel="nofollow noreferrer"
            className="text-steel-700 underline"
          >
            {machine.needle_system} needles
          </a>
          {machine.bobbin_type && (
            <>
              {" "}or{" "}
              <a
                href={`https://www.amazon.com/s?k=${encodeURIComponent(`${machine.bobbin_type} industrial sewing machine bobbin`)}`}
                target="_blank"
                rel="nofollow noreferrer"
                className="text-steel-700 underline"
              >
                {machine.bobbin_type} bobbins
              </a>
            </>
          )}
          .
        </p>
      </section>

      {troubleshooting.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-bold text-iron-900">
            {brand?.name} {machine.model_name} troubleshooting
          </h2>
          <TroubleshootingSection records={troubleshooting} />
        </section>
      )}

      <section className="rounded-lg border border-iron-200 bg-white p-5">
        <h2 className="mb-2 font-bold text-iron-900">More resources</h2>
        <ul className="space-y-1 text-sm text-iron-700">
          {brand?.website_url && (
            <li>
              <a href={brand.website_url} target="_blank" rel="nofollow noreferrer" className="text-steel-700 hover:underline">
                Official {brand.name} support page →
              </a>
            </li>
          )}
          <li>
            <a
              href={`https://www.manualslib.com/search/?q=${encodeURIComponent(`${brand?.name ?? ""} ${machine.model_name}`)}`}
              target="_blank"
              rel="nofollow noreferrer"
              className="text-steel-700 hover:underline"
            >
              Search ManualsLib for more {machine.model_name} documents →
            </a>
          </li>
          <li>
            <Link href="/troubleshooting" className="text-steel-700 hover:underline">
              Browse all troubleshooting guides →
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
