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

// All PDFs sourced from freesewingmachinemanuals.com → S3 (teamworksales.com)
const BASE = "https://s3.amazonaws.com/a.teamworksales.com";

const updates: { slug: string; url: string; note: string }[] = [
  // Exact model match
  { slug: "brother-db2-b791",  url: `${BASE}/BROTHER-PDF/DB2-B791+INSTRUCTIONS.PDF`,                                                                              note: "exact" },
  { slug: "juki-lz-2290a-sr",  url: `${BASE}/JUKI+INSTRUCTION+MANUALS/LZ-SR_English.pdf`,                                                                         note: "exact series" },
  { slug: "chandler-206rbt",   url: `${BASE}/CONSEW+PDF/CONSEW+NEW/CONSEW+206RB-5+INSTRUCTION+MANUAL.pdf`,                                                        note: "OEM Consew 206RB-5" },
  // Pegasus
  { slug: "pegasus-mx5114",    url: `${BASE}/PEGASUS-PDF/PEG+INSTRUCTIONS/MX-3200-5200-INST.pdf`,                                                                 note: "MX5000 series" },
  { slug: "pegasus-w600p",     url: `${BASE}/PEGASUS-PDF/PEG+INSTRUCTIONS/W600-INST.pdf`,                                                                         note: "W600 series" },
  // Yamato — all from teamworksales S3 via freesewingmachinemanuals.com
  { slug: "yamato-vc2700",     url: `${BASE}/YAMATO-PDF/NEW+YAMATO/YAMATO+VC2700M+UT+INSTRUCTIONS+MANUAL.pdf`,                                                    note: "VC2700 series" },
  { slug: "yamato-az8450h",    url: `${BASE}/YAMATO-PDF/NEW+YAMATO/YAMATO+AZ8000G%2C+8500G+INSTRUCTIONS+MANUAL.pdf`,                                              note: "AZ8000/8500 series" },
  { slug: "yamato-vg3700d",    url: `${BASE}/YAMATO-PDF/NEW+YAMATO/YAMATO+VGS3721_8+INSTRUCTIONS+MANUAL.pdf`,                                                     note: "VG3700 series" },
  { slug: "yamato-dcz-561",    url: `${BASE}/YAMATO-PDF/NEW+YAMATO/YAMATO+DCZ+361+INSTRUCTION+MANUAL.pdf`,                                                        note: "DCZ series" },
  { slug: "yamato-zf3500d",    url: `${BASE}/YAMATO-PDF/ZF-1500.pdf`,                                                                                             note: "ZF flatseamer series" },
];

async function run() {
  let ok = 0;
  for (const u of updates) {
    const { error } = await db.from("machines")
      .update({ manual_url: u.url, manual_source: "retailer" })
      .eq("slug", u.slug);
    if (error) console.error(`✗ ${u.slug}:`, error.message);
    else { console.log(`✓ ${u.slug.padEnd(28)} [${u.note}]`); ok++; }
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
