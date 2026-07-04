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

const updates: { slug: string; url: string; source: string }[] = [
  // Brother
  { slug: "brother-da9270h",  url: "https://www.brother-usa.com/-/media/files/ism/manuals/feed-off-the-arm-chain-stitch-sewing-machine/da9270/da9270-instruction-manual.pdf", source: "manufacturer" },
  { slug: "brother-lt2-b842", url: "https://www.supsew.com/download/Brother/Brother%20LT2-B841,%20B842,%20B845,%20B847,%20B848,%20B872,%20B875%20Instruction%20Manual.pdf", source: "retailer" },
  { slug: "brother-ma4-b551", url: "https://www.supsew.com/download/Brother/Brother%20MA4-B551.pdf", source: "retailer" },
  { slug: "brother-s7200c",   url: "https://www.brother-usa.com/-/media/Files/ISM/Manuals/Single-Needle-Lockstitch-Sewing-Machine/S7200C/7200C-INSTRUCTION-MANUAL.pdf", source: "manufacturer" },
  // Consew
  { slug: "consew-225",       url: "https://www.supsew.com/download/Consew/Consew%20224,%20224R-1,%20225,%20226,%20226R-1.pdf", source: "retailer" },
  { slug: "consew-255rb",     url: "https://www.supsew.com/download/Consew/Consew%20244,%20244RB,%20255,%20255RB.pdf", source: "retailer" },
  { slug: "consew-226r-2",    url: "https://www.supsew.com/download/Consew/Consew%20255RB-3;%20226R-5.pdf", source: "retailer" },
  { slug: "consew-cp206rlb-1a", url: "https://consew.com/cdn/shop/files/CP206R_NEW.pdf", source: "manufacturer" },
  // Dürkopp Adler — all from manufacturer site
  { slug: "durkopp-adler-204", url: "https://www.duerkopp-adler.com/fileadmin/dag/Media/Downloads/205/S_204_EN.pdf", source: "manufacturer" },
  { slug: "durkopp-adler-274", url: "https://www.duerkopp-adler.com/fileadmin/dag/Media/Downloads/273/DA_273-274_deen_12-2020.pdf", source: "manufacturer" },
  { slug: "durkopp-adler-669", url: "https://www.duerkopp-adler.com/fileadmin/dag/Media/Downloads/669/B_669_EN.pdf", source: "manufacturer" },
  { slug: "durkopp-adler-867", url: "https://www.duerkopp-adler.com/fileadmin/dag/Media/Downloads/867-M_Langarm_Longarm/B_867_EN_05.0.pdf", source: "manufacturer" },
  { slug: "durkopp-adler-888", url: "https://www.duerkopp-adler.com/fileadmin/dag/Media/Downloads/D888/B_D888_EN_00.0.pdf", source: "manufacturer" },
  // Jack
  { slug: "jack-a4",         url: "https://www.jack-sewing.com/wp-content/leaflets/A4E.pdf", source: "manufacturer" },
  { slug: "jack-c4",         url: "https://www.trojansewing.co.uk/wp-content/uploads/2021/08/c4.pdf", source: "retailer" },
  { slug: "jack-e4",         url: "https://vmca.madefabriek.nl/wp-content/uploads/2021/11/E4S-manual.pdf", source: "retailer" },
  { slug: "jack-jk-t1377",   url: "https://vmca.madefabriek.nl/wp-content/uploads/2021/11/JK-T1377.pdf", source: "retailer" },
  { slug: "jack-w4",         url: "https://www.candcenterprise.com/wp-content/uploads/2024/01/JK-W4-UT-Instruction-Manual.pdf", source: "retailer" },
  // Juki
  { slug: "juki-ams-210en",  url: "https://www.goldstartool.com/files/products/25_20231217011346Instruction%20Manual%20JUKI%20AMS-210ENHL-1510.pdf", source: "retailer" },
  { slug: "juki-ddl-5550n",  url: "https://www.goldstartool.com/img/27_20210611100933JUKI%20DDL-5550N-7,%20DDL-5550-7+Instruction+Manual(+29117504)+No.00.pdf", source: "retailer" },
  { slug: "juki-ddl-8700-7", url: "https://www.supsew.com/download/Juki/Juki%20DDL-8700-7.pdf", source: "retailer" },
  { slug: "juki-ddl-9000c",  url: "https://www.goldstartool.com/files/DDL9000%20manual.pdf", source: "retailer" },
  { slug: "juki-dnu-1541",   url: "https://www.goldstartool.com/files/products/86_20190609231450Specifications%20-%20JUKI%20DNU-1541.pdf", source: "retailer" },
  { slug: "juki-lbh-1790",   url: "https://www.supsew.com/download/Juki/Juki%20LBH-1790AN%20Instruction%20Manual.pdf", source: "retailer" },
  { slug: "juki-lh-3568a",   url: "https://www.supsew.com/download/Juki/Juki%20LH-3528,%20-7;%20LH-3568,%20-7;%20LH-3578,%20-7;%20LH-3588,%20-7.pdf", source: "retailer" },
  { slug: "juki-lu-2210n-7", url: "https://www.supsew.com/download/Juki/Juki%20LU-2212N;LU-2210N;2210W;%202260N;%202260W.pdf", source: "retailer" },
  { slug: "juki-mo-6714s",   url: "https://www.supsew.com/download/Juki/Juki%20MO-6704S-OE4,%20MO-6714S-BE6,%20MO-6716S-DE4.pdf", source: "retailer" },
  { slug: "juki-mo-6816s",   url: "https://www.juki.co.jp/industrial_j/download_j/manual_j/mo6800s_d/mo6800dd10/menu/pdf/instruction_eg.pdf", source: "manufacturer" },
  { slug: "juki-ms-1261",    url: "https://www.supsew.com/download/Juki/Juki%20MS-1260-VO45;%20MS1261-VO45.pdf", source: "retailer" },
  // Pegasus
  { slug: "pegasus-ex5114",  url: "https://www.supsew.com/download/Pegasus/Pegasus%20EX%20Series%20Service%20Manual.pdf", source: "retailer" },
  { slug: "pegasus-w562",    url: "https://www.supsew.com/download/Pegasus/Pegasus%20(W%26G)%20W542,%20W562%20Instruction%20Manual.pdf", source: "retailer" },
  { slug: "pegasus-wt600p",  url: "https://www.pegasus-europa.de/INSTRUCTIONS/WT600_9A2160_4L.pdf", source: "manufacturer" },
  // Pfaff — all from manufacturer site
  { slug: "pfaff-1245",      url: "https://www.pfaff-industrial.com/db-downloads/technicaldoc/betriebsanleitungen/1200/ba_1245_1246_10-15_en.pdf/@@download/file/BA_1245_1246_10-15_EN.pdf", source: "manufacturer" },
  { slug: "pfaff-3811",      url: "https://www.szwalnicze.com/cat_pf_in/pfaff-3811.pdf", source: "retailer" },
  { slug: "pfaff-545",       url: "https://docs.uwe.net/Pfaff-145-545.pdf", source: "retailer" },
  { slug: "pfaff-591",       url: "https://www.pfaff-industrial.com/db-downloads/technicaldoc/betriebsanleitungen/500/ba_571_574_591_08-15_-en/@@download/file/BA_571_574_591_03-19_EN.pdf", source: "manufacturer" },
  { slug: "pfaff-918",       url: "https://www.pfaff-industrial.com/db-downloads/technicaldoc/betriebsanleitungen/900/ba_918_918u_938_938u_06-18_en/@@download/file/BA_918_918U_938_938U_06.18_EN.pdf", source: "manufacturer" },
  // Singer — all from supsew.com
  { slug: "singer-111w155",  url: "https://www.supsew.com/download/Singer/Singer%20111W155.pdf", source: "retailer" },
  { slug: "singer-132k6",    url: "https://www.supsew.com/download/Singer/Singer%20132K6%20to%20K10,%20K12.pdf", source: "retailer" },
  { slug: "singer-211u",     url: "https://www.supsew.com/download/Singer/Singer%20211U%20UTT.pdf", source: "retailer" },
  { slug: "singer-31-15",    url: "https://www.supsew.com/download/Singer/Singer%2031-15.pdf", source: "retailer" },
  { slug: "singer-591d300a", url: "https://www.supsew.com/download/Singer/Singer%20591D200,%20D300,%20C200,%20C300%20Operator%E2%80%99s%20Guide.pdf", source: "retailer" },
  // Yamato
  { slug: "yamato-vf2500d",  url: "https://www.supsew.com/download/Yamato/Yamato%20VF%20Series.pdf", source: "retailer" },
];

async function run() {
  let ok = 0;
  for (const u of updates) {
    const { error } = await db.from("machines")
      .update({ manual_url: u.url, manual_source: u.source })
      .eq("slug", u.slug);
    if (error) console.error(`✗ ${u.slug}:`, error.message);
    else { console.log(`✓ ${u.slug.padEnd(25)} ${u.source}`); ok++; }
  }

  const { data } = await db.from("machines").select("slug, manual_url");
  const withPdf  = (data ?? []).filter((m: { manual_url: string | null }) => m.manual_url?.includes(".pdf")).length;
  const withAny  = (data ?? []).filter((m: { manual_url: string | null }) => m.manual_url).length;
  const total    = (data ?? []).length;
  console.log(`\nUpdated ${ok}/${updates.length}`);
  console.log(`PDF embeds:  ${withPdf}/${total}`);
  console.log(`Any link:    ${withAny}/${total}`);
  console.log(`No manual:   ${total - withAny}/${total}`);
}

run().catch((e) => { console.error(e); process.exit(1); });
