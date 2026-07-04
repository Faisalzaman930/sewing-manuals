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

async function run() {
  const { data } = await db.from("machines")
    .select("slug, model_name, manual_url, manual_source, brand:brands(name)")
    .order("slug");
  const rows = (data ?? []) as { slug: string; model_name: string; manual_url: string | null; manual_source: string | null; brand: { name: string } | null }[];

  const noPdf    = rows.filter(m => !m.manual_url?.includes(".pdf"));
  const noAny    = rows.filter(m => !m.manual_url);
  const hasLink  = rows.filter(m => m.manual_url && !m.manual_url.includes(".pdf"));

  console.log("=== NO MANUAL AT ALL ===");
  for (const m of noAny) console.log(`  ${m.slug.padEnd(32)} ${m.brand?.name} ${m.model_name}`);

  console.log("\n=== HAS MANUALSLIB LINK (no PDF embed) ===");
  for (const m of hasLink) console.log(`  ${m.slug.padEnd(32)} ${m.manual_url}`);

  console.log(`\nSummary: ${rows.filter(m=>m.manual_url?.includes(".pdf")).length} PDF | ${hasLink.length} link-only | ${noAny.length} none | ${rows.length} total`);
}

run().catch((e) => { console.error(e); process.exit(1); });
