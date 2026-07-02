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
  // ── Juki ────────────────────────────────────────────────────────────────────
  { slug: "juki-lbh-1790",   manual_url: "https://www.manualslib.com/manual/806270/Juki-Lbh-1790.html",                                                     manual_source: "manualslib" },
  { slug: "juki-lz-2290a-sr",manual_url: "https://www.manualslib.com/manual/522933/Juki-Lz-2290a-Sr-Ip-110d-Sc-916.html",                                  manual_source: "manualslib" },
  { slug: "juki-mf-7923",    manual_url: "https://www.goldstartool.com/files/products/6_20190716012607Instruction%20Manual%20-%20JUKI%20MF-7923.pdf",        manual_source: "retailer"   },
  { slug: "juki-ms-1261",    manual_url: "https://www.manualslib.com/manual/1699670/Juki-Ms-1261.html",                                                      manual_source: "manualslib" },
  { slug: "juki-tnu-243u",   manual_url: "https://www.goldstartool.com/files/products/8_20230421135028Manual%20TNU-243U.pdf",                                manual_source: "retailer"   },
  // ── Pegasus ─────────────────────────────────────────────────────────────────
  { slug: "pegasus-w562",    manual_url: "https://www.manualslib.com/manual/1879443/Willcox-And-Gibbs-W562.html",                                            manual_source: "manualslib" },
  { slug: "pegasus-wt600p",  manual_url: "https://www.manualslib.com/manual/1238586/Pegasus-W600-Series.html",                                               manual_source: "manualslib" },
  // ── Pfaff ───────────────────────────────────────────────────────────────────
  { slug: "pfaff-3811",      manual_url: "https://www.manualslib.com/manual/1335670/Pfaff-3811-3-55.html",                                                   manual_source: "manualslib" },
  // ── Singer ──────────────────────────────────────────────────────────────────
  { slug: "singer-591d300a", manual_url: "https://www.manualslib.com/manual/1217424/Singer-591d200a.html",                                                   manual_source: "manualslib" },
  // ── Chandler (OEM manual — Consew 206RB-5 is the same machine) ────────────
  { slug: "chandler-206rbt", manual_url: "https://www.manualslib.com/manual/1226154/Consew-206rb-5.html",                                                    manual_source: "manualslib" },
  // ── Brother ─────────────────────────────────────────────────────────────────
  { slug: "brother-b7100a",  manual_url: "https://www.manualslib.com/manual/1605536/Brother-B7100a.html",                                                    manual_source: "manualslib" },
  { slug: "brother-da9270h", manual_url: "https://www.manualslib.com/manual/3067718/Brother-Da-9270.html",                                                   manual_source: "manualslib" },
  { slug: "brother-ef4-b231",manual_url: "https://www.manualslib.com/manual/956070/Brother-Ef4-B231.html",                                                   manual_source: "manualslib" },
  { slug: "brother-lt2-b842",manual_url: "https://www.manualslib.com/manual/1605533/Brother-Lt2-B842.html",                                                  manual_source: "manualslib" },
  { slug: "brother-ma4-b551",manual_url: "https://www.manualslib.com/manual/2201254/Brother-Ma4-B551.html",                                                  manual_source: "manualslib" },
  // ── Consew ──────────────────────────────────────────────────────────────────
  { slug: "consew-2101",     manual_url: "https://www.manualslib.com/manual/1226152/Consew-2101.html",                                                       manual_source: "manualslib" },
  { slug: "consew-225",      manual_url: "https://www.manualslib.com/manual/1226156/Consew-225.html",                                                        manual_source: "manualslib" },
  { slug: "consew-255rb",    manual_url: "https://www.manualslib.com/manual/1226157/Consew-255rb.html",                                                      manual_source: "manualslib" },
  { slug: "consew-287rb-2",  manual_url: "https://www.manualslib.com/manual/1226158/Consew-287rb-2.html",                                                    manual_source: "manualslib" },
  { slug: "consew-290",      manual_url: "https://www.manualslib.com/manual/1226159/Consew-290.html",                                                        manual_source: "manualslib" },
  { slug: "consew-320rb-1",  manual_url: "https://www.manualslib.com/manual/1226160/Consew-320rb-1.html",                                                    manual_source: "manualslib" },
  { slug: "consew-339rb",    manual_url: "https://www.manualslib.com/manual/1226161/Consew-339rb.html",                                                      manual_source: "manualslib" },
  { slug: "consew-cp206rlb-1a", manual_url: "https://www.manualslib.com/manual/1226154/Consew-206rb-5.html",                                                 manual_source: "manualslib" },
  // ── Dürkopp Adler ───────────────────────────────────────────────────────────
  { slug: "durkopp-adler-669",manual_url: "https://www.manualslib.com/manual/730388/Durkopp-Adler-669.html",                                                 manual_source: "manualslib" },
  { slug: "durkopp-adler-867",manual_url: "https://www.manualslib.com/manual/741066/Durkopp-Adler-867.html",                                                 manual_source: "manualslib" },
  { slug: "durkopp-adler-888",manual_url: "https://www.manualslib.com/manual/2026050/Durkopp-Adler-888.html",                                                manual_source: "manualslib" },
  // ── Jack ────────────────────────────────────────────────────────────────────
  { slug: "jack-803",        manual_url: "https://www.manualslib.com/manual/2614438/Jack-803.html",                                                          manual_source: "manualslib" },
  { slug: "jack-c4",         manual_url: "https://www.manualslib.com/manual/3728284/Jack-C4.html",                                                           manual_source: "manualslib" },
  { slug: "jack-e4",         manual_url: "https://www.manualslib.com/manual/3728283/Jack-E4.html",                                                           manual_source: "manualslib" },
  { slug: "jack-jk-t1377",   manual_url: "https://www.manualslib.com/manual/3035127/Jack-Jk-T1377.html",                                                     manual_source: "manualslib" },
  { slug: "jack-w4",         manual_url: "https://www.manualslib.com/manual/3728282/Jack-W4.html",                                                           manual_source: "manualslib" },
];

async function run() {
  let ok = 0;
  for (const u of updates) {
    const { error } = await db
      .from("machines")
      .update({ manual_url: u.manual_url, manual_source: u.manual_source })
      .eq("slug", u.slug);
    if (error) { console.error(`✗ ${u.slug}:`, error.message); }
    else { console.log(`✓ ${u.slug}`); ok++; }
  }

  const { data } = await db.from("machines").select("slug, manual_url");
  const withUrl = (data ?? []).filter((m: { manual_url: string | null }) => m.manual_url).length;
  console.log(`\nUpdated ${ok}/${updates.length} rows. Total coverage: ${withUrl}/${(data ?? []).length} machines.`);
}

run().catch((e) => { console.error(e); process.exit(1); });
