import type { MetadataRoute } from "next";
import { getAllBrandSlugs, getAllMachineSlugs, getAllTroubleshootingSlugs } from "@/lib/queries";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sewingmachinemanuals.com";

const CATEGORIES = [
  "lockstitch", "overlock", "walking-foot", "coverstitch",
  "blind-stitch", "post-bed", "cylinder-arm",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [brands, machines, ts] = await Promise.all([
    getAllBrandSlugs().catch(() => []),
    getAllMachineSlugs().catch(() => []),
    getAllTroubleshootingSlugs().catch(() => []),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`,               priority: 1.0, changeFrequency: "weekly" },
    { url: `${SITE}/brands`,         priority: 0.8, changeFrequency: "weekly" },
    { url: `${SITE}/troubleshooting`,priority: 0.8, changeFrequency: "weekly" },
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${SITE}/categories/${c}`,
    priority: 0.7,
    changeFrequency: "weekly",
  }));

  const brandPages: MetadataRoute.Sitemap = brands.map((b) => ({
    url: `${SITE}/brands/${b.slug}`,
    priority: 0.8,
    changeFrequency: "weekly",
  }));

  const machinePages: MetadataRoute.Sitemap = machines.map((m) => ({
    url: `${SITE}/brands/${m.brand_slug}/${m.slug}`,
    priority: 0.9,
    changeFrequency: "monthly",
  }));

  const tsPages: MetadataRoute.Sitemap = ts.map((t) => ({
    url: `${SITE}/troubleshooting/${t.slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  return [...staticPages, ...categoryPages, ...brandPages, ...machinePages, ...tsPages];
}
