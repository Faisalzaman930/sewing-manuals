import { readFileSync } from "fs";
import { resolve } from "path";
try {
  const envFile = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
  for (const line of envFile.split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
} catch {}

import { createClient } from "@supabase/supabase-js";
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

const S3 = "https://s3.amazonaws.com/a.teamworksales.com";

// ─── New brands ──────────────────────────────────────────────────────────────
const NEW_BRANDS = [
  {
    slug: "kansai-special",
    name: "Kansai Special",
    country: "Japan",
    website_url: "https://www.kansaispecial.com",
    description: "Japanese manufacturer specialising in multi-needle chainstitch and flatlock machines for denim, sportswear, and waistband applications.",
  },
  {
    slug: "union-special",
    name: "Union Special",
    country: "United States",
    website_url: "https://www.unionspecial.com",
    description: "Chicago-based pioneer of industrial sewing machines since 1881. Union Special chainstitch and overlock machines remain workhorses in US apparel and denim factories.",
  },
];

// ─── New machines ─────────────────────────────────────────────────────────────
type NewMachine = {
  slug: string; brand_slug: string; model_name: string; category: string;
  description: string; max_speed_spm?: number; needle_system?: string;
  needle_size_range?: string; bobbin_type?: string; discontinued?: boolean;
  manual_url: string; manual_source: string;
};

const NEW_MACHINES: NewMachine[] = [
  // ── Kansai Special ──────────────────────────────────────────────────────────
  {
    slug: "kansai-dx9902d",
    brand_slug: "kansai-special",
    model_name: "DX-9902D",
    category: "lockstitch",
    description: "2-needle, 3-thread chainstitch machine — the industry standard for stitching back pockets and belt loops on denim jeans. High-speed with differential feed and automatic thread trimmer.",
    max_speed_spm: 6000,
    needle_system: "DP×17",
    needle_size_range: "11–18",
    manual_url: `${S3}/KANSAI-PDF/INSTRUCTION+IN+ENG/DX(ENG).pdf`,
    manual_source: "retailer",
  },
  {
    slug: "kansai-wx8803d",
    brand_slug: "kansai-special",
    model_name: "WX-8803D",
    category: "coverstitch",
    description: "3-needle, 4-thread flatlock coverstitch for athletic wear, underwear, and sportswear hems. Produces a flat seam on both sides ideal for stretch fabrics.",
    max_speed_spm: 6000,
    needle_system: "HA×1 / 16×231",
    needle_size_range: "9–14",
    manual_url: `${S3}/KANSAI-PDF/INSTRUCTION+IN+ENG/WX(ENG).pdf`,
    manual_source: "retailer",
  },
  {
    slug: "kansai-fx4404p",
    brand_slug: "kansai-special",
    model_name: "FX-4404P",
    category: "coverstitch",
    description: "4-needle, 6-thread flatseamer for joining panels on t-shirts and knitwear with a flat, strong seam. Widely used in garment production for side seams and shoulder seams.",
    max_speed_spm: 5500,
    needle_system: "HA×1",
    needle_size_range: "9–14",
    manual_url: `${S3}/KANSAI-PDF/INSTRUCTION+IN+ENG/FX(ENG).pdf`,
    manual_source: "retailer",
  },
  {
    slug: "kansai-rx9701j",
    brand_slug: "kansai-special",
    model_name: "RX-9701J",
    category: "lockstitch",
    description: "Single-needle chainstitch machine with automatic pocket-shape control. Used for pocket setting and bar tacking in jeans and casual wear manufacturing.",
    max_speed_spm: 5000,
    needle_system: "DP×17",
    needle_size_range: "11–16",
    manual_url: `${S3}/KANSAI-PDF/INSTRUCTION+IN+ENG/RX9701J(ENG).pdf`,
    manual_source: "retailer",
  },
  {
    slug: "kansai-bx1425p",
    brand_slug: "kansai-special",
    model_name: "BX-1425P",
    category: "lockstitch",
    description: "Multi-needle chainstitch machine for simultaneously attaching elastic tape and fabric panels. Standard equipment for waistband and cuff attachment in underwear and sportswear factories.",
    max_speed_spm: 4000,
    needle_system: "HA×1",
    needle_size_range: "9–14",
    manual_url: `${S3}/KANSAI-PDF/BX-1425P-INST.pdf`,
    manual_source: "retailer",
  },
  {
    slug: "kansai-mz3516f",
    brand_slug: "kansai-special",
    model_name: "MZ-3516F",
    category: "coverstitch",
    description: "3-needle, 5-thread coverstitch for hemming stretch fabrics. Produces a clean top stitch and secure underside for leggings, swimwear, and activewear hemming.",
    max_speed_spm: 5000,
    needle_system: "HAx1",
    needle_size_range: "9–14",
    manual_url: `${S3}/KANSAI-PDF/INSTRUCTION+IN+ENG/MZ(ENG).pdf`,
    manual_source: "retailer",
  },

  // ── Union Special ───────────────────────────────────────────────────────────
  {
    slug: "union-special-36200",
    brand_slug: "union-special",
    model_name: "36200",
    category: "lockstitch",
    description: "Single-needle, 1-thread chainstitch machine — the long-running workhorse of American garment factories for forming the main seam on denim jeans and workwear. Simpler thread path than lockstitch.",
    max_speed_spm: 5500,
    needle_system: "DP×17",
    needle_size_range: "14–21",
    discontinued: true,
    manual_url: `${S3}/UNION-SPECIAL-PDF/US-36200-PTS.pdf`,
    manual_source: "retailer",
  },
  {
    slug: "union-special-39500",
    brand_slug: "union-special",
    model_name: "39500",
    category: "overlock",
    description: "2-needle, 4-thread chainstitch safety-stitch overlock. One of the most widely used industrial overlock machines in US denim and casual wear production. Trims and overcasts in one pass.",
    max_speed_spm: 6000,
    needle_system: "DC×27 / UY×128",
    needle_size_range: "11–18",
    discontinued: true,
    manual_url: `${S3}/UNION-SPECIAL-PDF/U-S-39500QW-INST%26PTS.pdf`,
    manual_source: "retailer",
  },
  {
    slug: "union-special-53700",
    brand_slug: "union-special",
    model_name: "53700",
    category: "blind-stitch",
    description: "Single-thread chainstitch blindstitch machine for hemming trousers, skirts, and coats. The hidden stitch penetrates only part-way through the fabric, leaving no stitch visible on the face side.",
    max_speed_spm: 2800,
    needle_system: "Special curved",
    discontinued: true,
    manual_url: `${S3}/UNION-SPECIAL-PDF/53700-INST.pdf`,
    manual_source: "retailer",
  },
  {
    slug: "union-special-57700",
    brand_slug: "union-special",
    model_name: "57700",
    category: "coverstitch",
    description: "Multi-needle flatlock machine producing flat, comfortable seams for activewear and underwear. The flatlock stitch lays completely flat, eliminating the seam ridge common on overlock stitched seams.",
    max_speed_spm: 5000,
    needle_system: "HA×1",
    needle_size_range: "9–14",
    discontinued: true,
    manual_url: `${S3}/UNION-SPECIAL-PDF/US-57700M-INST.pdf`,
    manual_source: "retailer",
  },
  {
    slug: "union-special-39600",
    brand_slug: "union-special",
    model_name: "39600",
    category: "overlock",
    description: "3-needle, 5-thread safety stitch overlock with chainstitch capability. Widely used for heavy seams in denim jeans outseams, providing both an overlock and a chainstitch in a single pass.",
    max_speed_spm: 6000,
    needle_system: "DC×27",
    needle_size_range: "14–21",
    discontinued: true,
    manual_url: `${S3}/UNION-SPECIAL-PDF/39600(503).pdf`,
    manual_source: "retailer",
  },

  // ── Juki (additional popular models with confirmed PDFs) ────────────────────
  {
    slug: "juki-dln-9010",
    brand_slug: "juki",
    model_name: "DLN-9010",
    category: "lockstitch",
    description: "Direct-drive, needle-feed high-speed lockstitch for slippery, delicate fabrics — silk, chiffon, and synthetic blends. The needle moves with the feed to prevent fabric slippage between stitches.",
    max_speed_spm: 5000,
    needle_system: "DB×1",
    needle_size_range: "9–14",
    bobbin_type: "Class 15",
    manual_url: `${S3}/JUKI+INSTRUCTION+MANUALS/DLN-9010+Instruction+Manual.pdf`,
    manual_source: "retailer",
  },
  {
    slug: "juki-lu-1560n",
    brand_slug: "juki",
    model_name: "LU-1560N",
    category: "walking-foot",
    description: "Heavy-duty triple-feed (needle, presser foot, and drop feed) walking-foot for leather goods, upholstery, and multi-layer materials up to 10 mm thick. Long arm provides clearance for large work pieces.",
    max_speed_spm: 2200,
    needle_system: "DPx17",
    needle_size_range: "19–25",
    bobbin_type: "Large M bobbin",
    manual_url: `${S3}/JUKI+INSTRUCTION+MANUALS/LU-1560N%2CLU1560N-7+Instruction+Manual+No.+01(29358900)+.pdf`,
    manual_source: "retailer",
  },
  {
    slug: "juki-mo-2500",
    brand_slug: "juki",
    model_name: "MO-2500",
    category: "overlock",
    description: "Industrial 5-thread safety stitch overlock with gathering capability. A versatile machine for seaming and simultaneously overlocking knit and woven fabrics in garment production.",
    max_speed_spm: 7000,
    needle_system: "DC×27",
    needle_size_range: "9–14",
    manual_url: `${S3}/JUKI+INSTRUCTION+MANUALS/MO-2500+Instruction+Book.pdf`,
    manual_source: "retailer",
  },

  // ── Consew (additional models) ───────────────────────────────────────────────
  {
    slug: "consew-227r-2",
    brand_slug: "consew",
    model_name: "Consew 227R-2",
    category: "cylinder-arm",
    description: "Cylinder-arm walking-foot machine for boots, gloves, bags, and curved seams on leather goods. The narrow 5-inch cylinder provides 360° access around tubes and cylinders.",
    max_speed_spm: 2200,
    needle_system: "DPx17",
    needle_size_range: "16–23",
    bobbin_type: "Class 66",
    manual_url: `${S3}/CONSEW+PDF/CONSEW+NEW/CONSEW+227R-2+INSTRUCTION+MANUAL.pdf`,
    manual_source: "retailer",
  },
  {
    slug: "consew-389rb-1",
    brand_slug: "consew",
    model_name: "Consew 389RB-1",
    category: "post-bed",
    description: "Post-bed, compound walking-foot machine for upholstered goods, car seats, saddlery, and heavy leather. The vertical post arm provides unobstructed access under large workpieces.",
    max_speed_spm: 2000,
    needle_system: "DPx17",
    needle_size_range: "18–25",
    manual_url: `${S3}/CONSEW+PDF/CONSEW+NEW/CONSEW+389RB-1+INSTRUCTION+MANUAL.pdf`,
    manual_source: "retailer",
  },
];

async function run() {
  // Insert brands
  console.log("── Brands ──");
  const brandIds: Record<string, string> = {};

  // First fetch existing brands
  const { data: existingBrands } = await db.from("brands").select("id, slug");
  for (const b of (existingBrands ?? []) as { id: string; slug: string }[]) {
    brandIds[b.slug] = b.id;
  }

  for (const brand of NEW_BRANDS) {
    if (brandIds[brand.slug]) {
      console.log(`  skip ${brand.slug} (exists)`);
      continue;
    }
    const { data, error } = await db.from("brands").insert(brand).select("id").single();
    if (error) { console.error(`  ✗ ${brand.slug}:`, error.message); }
    else { brandIds[brand.slug] = (data as { id: string }).id; console.log(`  ✓ ${brand.slug}`); }
  }

  // Insert machines
  console.log("\n── Machines ──");
  let ok = 0;
  for (const m of NEW_MACHINES) {
    const brand_id = brandIds[m.brand_slug];
    if (!brand_id) { console.error(`  ✗ ${m.slug}: brand not found`); continue; }
    const { slug, brand_slug: _, ...rest } = m;
    const { error } = await db.from("machines").upsert({ slug, brand_id, ...rest }, { onConflict: "slug" });
    if (error) console.error(`  ✗ ${slug}:`, error.message);
    else { console.log(`  ✓ ${slug}`); ok++; }
  }

  const { count } = await db.from("machines").select("*", { count: "exact", head: true });
  console.log(`\nDone: ${ok}/${NEW_MACHINES.length} machines added. Total in DB: ${count}`);
}

run().catch((e) => { console.error(e); process.exit(1); });
