import { readFileSync } from "fs";
import { resolve } from "path";
try {
  const envFile = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
  for (const line of envFile.split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
} catch { /* ignore */ }

import { createClient } from "@supabase/supabase-js";
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

// Upgrades from second research pass — direct PDFs beat ManualsLib pages
const updates = [
  // Direct PDF upgrades (were ManualsLib pages before)
  { slug: "consew-287rb-2",   manual_url: "https://consew.com/cdn/shop/files/287RB_Instruction_Manual.pdf?v=7380412816550457693", manual_source: "manufacturer" },
  { slug: "consew-290",       manual_url: "http://www.consew.com/Files/112347/InstructionManuals/290R.pdf",                       manual_source: "manufacturer" },
  { slug: "consew-339rb",     manual_url: "https://www.goldstartool.com/files/products/100_20190528152359Consew%20339RB-4%20Instruction%20Manual.pdf", manual_source: "retailer" },
  // More specific ManualsLib pages
  { slug: "consew-255rb",     manual_url: "https://www.manualslib.com/manual/1155748/Consew-244b.html",   manual_source: "manualslib" }, // explicitly covers 255RB
  { slug: "consew-cp206rlb-1a", manual_url: "https://www.manualslib.com/manual/4125381/Consew-Cp206rl.html", manual_source: "manualslib" }, // specific CP206RL manual
];

async function run() {
  for (const u of updates) {
    const { error } = await db.from("machines").update({ manual_url: u.manual_url, manual_source: u.manual_source }).eq("slug", u.slug);
    if (error) console.error(`✗ ${u.slug}:`, error.message);
    else console.log(`✓ ${u.slug} → ${u.manual_url.includes(".pdf") ? "DIRECT PDF" : "ManualsLib"}`);
  }

  const { data } = await db.from("machines").select("manual_url");
  const withPdf    = (data ?? []).filter((m: {manual_url:string|null}) => m.manual_url?.includes(".pdf")).length;
  const withAny    = (data ?? []).filter((m: {manual_url:string|null}) => m.manual_url).length;
  console.log(`\nCoverage: ${withAny}/${(data??[]).length} total  |  ${withPdf} direct PDF embeds`);
}

run().catch((e) => { console.error(e); process.exit(1); });
