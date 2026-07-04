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

// Chandler 441-Clone = Juki TSC-441 rebadged — identical machine, same manual
const updates = [
  {
    slug: "chandler-441-clone",
    url: "https://s3.amazonaws.com/a.teamworksales.com/JUKI+INSTRUCTION+MANUALS/TSC-441+Instruction+Manual.pdf",
    source: "retailer",
  },
];

async function run() {
  for (const u of updates) {
    const { error } = await db.from("machines")
      .update({ manual_url: u.url, manual_source: u.source })
      .eq("slug", u.slug);
    if (error) console.error(`✗ ${u.slug}:`, error.message);
    else console.log(`✓ ${u.slug} → TSC-441 PDF`);
  }

  const { data } = await db.from("machines").select("manual_url");
  const withPdf = (data ?? []).filter((m: { manual_url: string | null }) => m.manual_url?.toLowerCase().includes(".pdf")).length;
  const withAny = (data ?? []).filter((m: { manual_url: string | null }) => m.manual_url).length;
  console.log(`\nPDF embeds: ${withPdf}/${(data ?? []).length} | Any link: ${withAny}/${(data ?? []).length}`);
}

run().catch((e) => { console.error(e); process.exit(1); });
