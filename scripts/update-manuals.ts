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

const updates: { slug: string; manual_url: string; manual_source: string }[] = [
  { slug: "juki-ddl-8700-7",  manual_url: "https://www.manualslib.com/manual/489409/Juki-Ddl-8700-7.html",            manual_source: "manualslib" },
  { slug: "juki-ddl-5550n",   manual_url: "https://www.manualslib.com/manual/826493/Juki-Ddl-5550n.html",             manual_source: "manualslib" },
  { slug: "juki-dnu-1541",    manual_url: "https://www.manualslib.com/manual/1215477/Juki-Dnu-1541.html",             manual_source: "manualslib" },
  { slug: "juki-mo-3916gn",   manual_url: "https://s3.amazonaws.com/a.teamworksales.com/JUKI+INSTRUCTION+MANUALS/MO-3904,3914,3916,Instruction+Manual,29125309(No.00).pdf", manual_source: "retailer" },
  { slug: "consew-226r-2",    manual_url: "https://www.manualslib.com/manual/1156149/Consew-226r.html",               manual_source: "manualslib" },
  { slug: "brother-db2-b737", manual_url: "https://www.manualslib.com/manual/482490/Brother-Db2-B737.html",           manual_source: "manualslib" },
  { slug: "juki-lh-3568a",    manual_url: "https://www.manualslib.com/manual/2052241/Juki-Lh-3500a-Series.html",     manual_source: "manualslib" },
  { slug: "jack-a3",          manual_url: "https://www.manualslib.com/manual/3728281/Jack-A3.html",                   manual_source: "manualslib" },
  { slug: "juki-mo-6816s",    manual_url: "https://www.manualslib.com/manual/2413411/Juki-Mo-6804s.html",            manual_source: "manualslib" },
];

async function run() {
  for (const u of updates) {
    const { error } = await db
      .from("machines")
      .update({ manual_url: u.manual_url, manual_source: u.manual_source })
      .eq("slug", u.slug);
    if (error) console.error(`✗ ${u.slug}:`, error.message);
    else console.log(`✓ ${u.slug}`);
  }

  // Count totals
  const { data } = await db.from("machines").select("slug, manual_url");
  const withUrl = (data ?? []).filter((m: { manual_url: string | null }) => m.manual_url).length;
  console.log(`\nManuals coverage: ${withUrl}/${(data ?? []).length} machines`);
}

run().catch((e) => { console.error(e); process.exit(1); });
