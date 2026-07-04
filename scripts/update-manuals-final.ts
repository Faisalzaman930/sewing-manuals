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

const updates: { slug: string; url: string; source: string; note: string }[] = [
  // New machines getting their first PDF
  { slug: "brother-db2-b737",  url: "https://www.supsew.com/download/Brother/Brother%20DB2-B737%20Instruction%20Manual.pdf",                                          source: "retailer",      note: "exact match" },
  { slug: "juki-ddl-900a",     url: "https://www.juki.co.jp/industrial_j/download_j/manual_j/ddl900a/menu/ddl900A/pdf/instruction_eg.pdf",                             source: "manufacturer",  note: "official Juki" },
  // Upgrades to manufacturer/closer-match PDFs
  { slug: "juki-lz-2290a-sr",  url: "https://www.juki.co.jp/industrial_j/download_j/manual_j/lz2290asrip110dsc916/menu/pdf/instruction_eg.pdf",                       source: "manufacturer",  note: "upgrade to official Juki" },
  { slug: "yamato-vc2700",     url: "https://www.supsew.com/download/Yamato/Yamato%20VC2700.pdf",                                                                       source: "retailer",      note: "exact VC2700 match" },
  { slug: "yamato-vg3700d",    url: "https://www.supsew.com/download/Yamato/Yamato%20VG3721-8.pdf",                                                                     source: "retailer",      note: "VG3700 series" },
];

async function run() {
  let ok = 0;
  for (const u of updates) {
    const { error } = await db.from("machines")
      .update({ manual_url: u.url, manual_source: u.source })
      .eq("slug", u.slug);
    if (error) console.error(`✗ ${u.slug}:`, error.message);
    else { console.log(`✓ ${u.slug.padEnd(28)} ${u.note}`); ok++; }
  }

  const { data } = await db.from("machines").select("slug, manual_url");
  const withPdf = (data ?? []).filter((m: { manual_url: string | null }) => m.manual_url?.includes(".pdf")).length;
  const withAny = (data ?? []).filter((m: { manual_url: string | null }) => m.manual_url).length;
  const total   = (data ?? []).length;
  console.log(`\nUpdated ${ok}/${updates.length}`);
  console.log(`PDF embeds:  ${withPdf}/${total}`);
  console.log(`Any link:    ${withAny}/${total}`);
  console.log(`No manual:   ${total - withAny}/${total}`);
}

run().catch((e) => { console.error(e); process.exit(1); });
