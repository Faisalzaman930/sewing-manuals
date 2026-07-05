import { readFileSync } from "fs";
import { resolve } from "path";
try {
  const e = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
  for (const l of e.split("\n")) { const m = l.match(/^([^#=]+)=(.*)/); if (m) process.env[m[1].trim()] = m[2].trim(); }
} catch {}
import { createClient } from "@supabase/supabase-js";
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

const S3 = "https://s3.amazonaws.com/a.teamworksales.com";
const JK = `${S3}/JUKI%20INSTRUCTION%20MANUALS`;
const SI = `${S3}/SINGER%20INSTRUCTIONS`;
const BR = `${S3}/BROTHER-PDF`;
const HL = `${S3}/HIGHLEAD`;
const PG = `${S3}/PEGASUS-PDF`;
const PI = `${S3}/PEGASUS-PDF/PEG%20INSTRUCTIONS`;
const US = `${S3}/UNION-SPECIAL-PDF`;
const YM = `${S3}/YAMATO-PDF/NEW%20YAMATO`;

type M = { slug: string; brand_slug: string; model_name: string; category: string;
  description: string; max_speed_spm?: number; needle_system?: string;
  needle_size_range?: string; discontinued?: boolean; manual_url: string; manual_source: string };

const MACHINES: M[] = [

// ══ JUKI — additional models ══════════════════════════════════════════════════

{ slug:"juki-lk-1900a", brand_slug:"juki", model_name:"LK-1900A", category:"lockstitch",
  description:"Juki LK-1900A electronic bar tack / tacking machine for belt loops and pocket openings. A precision electronic bartacking machine applying reinforcement stitches at stress points in garments.",
  max_speed_spm:2700, needle_system:"DP×5",
  manual_url:`${JK}/LK-1900A%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-lk-1903a", brand_slug:"juki", model_name:"LK-1903A", category:"lockstitch",
  description:"Juki LK-1903A electronic bartacker with direct-drive motor and wide pattern library. An advanced version of the 1900A bartacker with servo motor for reduced maintenance and vibration.",
  max_speed_spm:2700, needle_system:"DP×5",
  manual_url:`${JK}/LK-1903A%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-dln-9010", brand_slug:"juki", model_name:"DLN-9010", category:"lockstitch",
  description:"Juki DLN-9010 needle-feed lockstitch for thick fabrics requiring precise needle penetration. Adds needle feed to the bottom and top feed for perfect needle-entry accuracy on thick or coated fabrics.",
  max_speed_spm:4000, needle_system:"DB×1", needle_size_range:"14–21",
  manual_url:`${JK}/DLN-9010%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-ddl-9000a", brand_slug:"juki", model_name:"DDL-9000A", category:"lockstitch",
  description:"Juki DDL-9000A AI-equipped direct-drive lockstitch with automatic material puller and sewing data collection. Juki's most advanced smart lockstitch for connected factory production management.",
  max_speed_spm:5000, needle_system:"DB×1", needle_size_range:"9–18",
  manual_url:`${JK}/DDL-9000A%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-dnu-1541n", brand_slug:"juki", model_name:"DNU-1541N", category:"walking-foot",
  description:"Juki DNU-1541N compound-feed walking-foot lockstitch for leather and upholstery. A standard compound-feed lockstitch from Juki's DNU series for general leather goods and furniture upholstery.",
  max_speed_spm:2500, needle_system:"135×17", needle_size_range:"14–21",
  manual_url:`${JK}/DNU-1541N%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-dnu-1541s", brand_slug:"juki", model_name:"DNU-1541S", category:"walking-foot",
  description:"Juki DNU-1541S compound-feed walking-foot lockstitch with servo drive system. Adds electronic servo motor control to the DNU-1541 for energy-efficient, quiet leather and upholstery sewing.",
  max_speed_spm:2500, needle_system:"135×17", needle_size_range:"14–21",
  manual_url:`${JK}/DNU-1541S%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-mo-3314", brand_slug:"juki", model_name:"MO-3314", category:"overlock",
  description:"Juki MO-3314 2-needle 4-thread overlock for sturdy knitwear seaming. Combines two-needle lock with chainstitch overedge for a strong seam suitable for medium to heavy knitwear.",
  max_speed_spm:7000, needle_system:"DC×27", needle_size_range:"9–14",
  manual_url:`${JK}/MO-3314%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-mo-6716da", brand_slug:"juki", model_name:"MO-6716DA", category:"overlock",
  description:"Juki MO-6716DA direct-drive 5-thread safety-stitch overlock for high-speed knitwear production. The DA (direct-actuator) drive reduces energy consumption while maintaining speed for heavy knit fabrics.",
  max_speed_spm:8000, needle_system:"DC×27", needle_size_range:"9–16",
  manual_url:`${JK}/MO-6716DA%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-mo-6916r", brand_slug:"juki", model_name:"MO-6916R", category:"overlock",
  description:"Juki MO-6916R precision overlock for technical and performance fabrics. An advanced overlock for high-precision fabric edge finishing on technical apparel and performance sportswear fabrics.",
  max_speed_spm:8000, needle_system:"DC×27", needle_size_range:"9–14",
  manual_url:`${JK}/MO-6916R%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-lb-186", brand_slug:"juki", model_name:"LB-186", category:"lockstitch",
  description:"Juki LB-186 programmable electronic pattern sewing machine. An electronically controlled sewing machine for producing complex patterns and shapes programmed via built-in control panel.",
  max_speed_spm:2700, needle_system:"DB×1",
  manual_url:`${JK}/LB-186%20INST.pdf`, manual_source:"retailer" },

// ══ SINGER — more industrial models ═══════════════════════════════════════════

{ slug:"singer-491d200", brand_slug:"singer", model_name:"491D200", category:"lockstitch",
  description:"Singer 491D200 high-speed industrial lockstitch for medium apparel. A later Singer industrial lockstitch continuing the reliable 491 platform for shirt, blouse, and light garment factories.",
  max_speed_spm:5000, needle_system:"DB×1", needle_size_range:"9–18", discontinued:true,
  manual_url:`${SI}/491D200_Series.pdf`, manual_source:"retailer" },
{ slug:"singer-900w-series", brand_slug:"singer", model_name:"900W Series", category:"overlock",
  description:"Singer Class 900W FOTA chainstitch overlock for knitwear seam sealing. A Singer feed-off-the-arm machine for joining T-shirt and underwear side seams with a stretchable chainstitch.",
  max_speed_spm:6000, needle_system:"UY×128", needle_size_range:"9–14", discontinued:true,
  manual_url:`${SI}/900W_Series.pdf`, manual_source:"retailer" },
{ slug:"singer-1591d200", brand_slug:"singer", model_name:"1591D200", category:"lockstitch",
  description:"Singer 1591D200 direct-drive industrial lockstitch for high-volume apparel production. A direct-drive version of the 1591 industrial lockstitch for noise-reduced, energy-efficient sewing.",
  max_speed_spm:5000, needle_system:"DB×1", needle_size_range:"9–18", discontinued:true,
  manual_url:`${SI}/1591D200_Series.pdf`, manual_source:"retailer" },
{ slug:"singer-241-series", brand_slug:"singer", model_name:"241 Series", category:"lockstitch",
  description:"Singer Class 241 series industrial lockstitch for coats and outerwear. A heavy-duty class of Singer lockstitch for sewing thick outerwear fabrics and interlinings in coat manufacturing.",
  max_speed_spm:3500, needle_system:"135×17", needle_size_range:"11–21", discontinued:true,
  manual_url:`${SI}/241_Series.pdf`, manual_source:"retailer" },
{ slug:"singer-251-series", brand_slug:"singer", model_name:"251 Series", category:"lockstitch",
  description:"Singer Class 251 series cylinder-bed lockstitch for gloves and small leather goods. The cylinder-arm configuration enables sewing of narrow-circumference items like gloves and small pouches.",
  max_speed_spm:3000, needle_system:"135×17", needle_size_range:"9–14", discontinued:true,
  manual_url:`${SI}/251_Series.pdf`, manual_source:"retailer" },

// ══ BROTHER — few remaining ════════════════════════════════════════════════════

{ slug:"brother-s-7300a", brand_slug:"brother", model_name:"S-7300A", category:"lockstitch",
  description:"Brother S-7300A NEXIO direct-drive high-speed lockstitch with IoT connectivity. Combines 5,000-spm direct drive with built-in production monitoring for the connected smart factory.",
  max_speed_spm:5000, needle_system:"DB×1", needle_size_range:"9–18",
  manual_url:`${BR}/S-7300A%20INSTRUCTIONS.pdf`, manual_source:"retailer" },
{ slug:"brother-kh-439b", brand_slug:"brother", model_name:"KH-439B", category:"lockstitch",
  description:"Brother KH-439B electronic buttonholer for shirt and trouser button hole cutting. A dedicated electronic buttonhole machine producing consistent keyhole-shape buttonholes at high production rates.",
  max_speed_spm:3200, needle_system:"DP×5",
  manual_url:`${BR}/KH-439B%20INSTRUCTIONS.pdf`, manual_source:"retailer" },
{ slug:"brother-bt6-b535", brand_slug:"brother", model_name:"BT6-B535", category:"lockstitch",
  description:"Brother BT6-B535 direct-drive 6-step electronic bartacker for heavy-duty belt loops. The 6-step feed control allows precise bartacking on varying thicknesses of denim belt loops.",
  max_speed_spm:3200, needle_system:"DP×5",
  manual_url:`${BR}/BT6-B535%20INSTRUCTIONS.pdf`, manual_source:"retailer" },

// ══ PEGASUS — additional models ════════════════════════════════════════════════

{ slug:"pegasus-w500-series", brand_slug:"pegasus", model_name:"W500 Series", category:"overlock",
  description:"Pegasus W500 series industrial overlock for high-speed production overlocking. A flagship Pegasus overlock series combining maximum speed with exceptional stitch quality for premium knitwear.",
  max_speed_spm:9000, needle_system:"DC×27", needle_size_range:"9–14",
  manual_url:`${PI}/W500-SERIES-INST.pdf`, manual_source:"retailer" },
{ slug:"pegasus-w664-35bb", brand_slug:"pegasus", model_name:"W664-35BB", category:"coverstitch",
  description:"Pegasus W664-35BB multi-needle coverstitch for high-speed T-shirt and underwear hemming. The 35BB designation indicates a 3.5mm gauge double-needle coverstitch configuration for standard hem widths.",
  max_speed_spm:6500, needle_system:"HA×1", needle_size_range:"9–14",
  manual_url:`${PI}/W664-35BB-INST.pdf`, manual_source:"retailer" },
{ slug:"pegasus-wf664-35bb", brand_slug:"pegasus", model_name:"WF664-35BB", category:"coverstitch",
  description:"Pegasus WF664-35BB cylinder-arm coverstitch with 3.5mm gauge for tubular knitwear. A cylinder-arm version of the W664 coverstitch for hemming-in-the-round on T-shirts and underwear.",
  max_speed_spm:6500, needle_system:"HA×1", needle_size_range:"9–14",
  manual_url:`${PI}/WF664-35BB-INST.pdf`, manual_source:"retailer" },
{ slug:"pegasus-v500-series", brand_slug:"pegasus", model_name:"V500 Series", category:"coverstitch",
  description:"Pegasus V500 series flat-bed multi-needle coverstitch for sportswear and knitwear hemming. A versatile flatbed coverstitch series for high-volume knitwear hem finishing in modern factories.",
  max_speed_spm:7000, needle_system:"HA×1", needle_size_range:"9–14",
  manual_url:`${PI}/V500-SERIES-INST.pdf`, manual_source:"retailer" },

// ══ HIGHLEAD — a few more remaining models ════════════════════════════════════

{ slug:"highlead-gc0398-1-d", brand_slug:"highlead", model_name:"GC0398-1-D", category:"post-bed",
  description:"Highlead GC0398-1-D direct-drive post-bed cylinder-arm lockstitch for light leather goods. A quiet, energy-efficient direct-drive cylinder-arm for light shoe components and leather accessories.",
  max_speed_spm:3500, needle_system:"135×17", needle_size_range:"9–16",
  manual_url:`${HL}/HIGHLEAD%20GC398-1%20GC0398-1-D%20instruction%20manual%20%26%20parts%20catalog.pdf`, manual_source:"retailer" },
{ slug:"highlead-t-ever", brand_slug:"highlead", model_name:"T-Ever", category:"lockstitch",
  description:"Highlead T-Ever electronic tacking machine for bar tacks and reinforcement stitches. A specialized machine for applying reinforcement tacks at pocket corners, belt loops, and stress points.",
  max_speed_spm:3000, needle_system:"DP×5",
  manual_url:`${HL}/HIGHLEAD%20T-Ever%20tacking%20machine%20instructions%20%26%20parts.pdf`, manual_source:"retailer" },

// ══ UNION SPECIAL — a few remaining ════════════════════════════════════════════

{ slug:"union-special-13600", brand_slug:"union-special", model_name:"13600 Series", category:"lockstitch",
  description:"Union Special 13600 series lock-type safety stitch machine. A Union Special lockstitch variant using safety-stitch technology for producing secure seams on woven fabrics.",
  max_speed_spm:5000, needle_system:"DB×1", needle_size_range:"9–16", discontinued:true,
  manual_url:`${US}/13600%20SERIES%20INST.pdf`, manual_source:"retailer" },
{ slug:"union-special-14800", brand_slug:"union-special", model_name:"14800 Series", category:"lockstitch",
  description:"Union Special 14800 series flatbed lockstitch for general industrial sewing. A versatile Union Special lockstitch for sewing a wide range of apparel and industrial fabric applications.",
  max_speed_spm:5000, needle_system:"DB×1", needle_size_range:"9–18", discontinued:true,
  manual_url:`${US}/14800%20SERIES%20INST.pdf`, manual_source:"retailer" },
{ slug:"union-special-43200", brand_slug:"union-special", model_name:"43200 Series", category:"lockstitch",
  description:"Union Special 43200 series chainstitch lockstitch for high-speed work clothing seaming. A chainstitch variant of Union Special's production lockstitch for denim and work clothing factories.",
  max_speed_spm:5500, needle_system:"DC×27", needle_size_range:"9–16", discontinued:true,
  manual_url:`${US}/43200%20SERIES%20INST.pdf`, manual_source:"retailer" },
{ slug:"union-special-58600", brand_slug:"union-special", model_name:"58600 Series", category:"overlock",
  description:"Union Special 58600 series differential-feed overlock for all fabric types. A Union Special overlock covering light to heavy fabrics with the differential feed for consistent edge quality.",
  max_speed_spm:6000, needle_system:"DC×27", needle_size_range:"9–14", discontinued:true,
  manual_url:`${US}/58600%20SERIES%20INST.pdf`, manual_source:"retailer" },

// ══ YAMATO — remaining ════════════════════════════════════════════════════════

{ slug:"yamato-az7500g-8", brand_slug:"yamato", model_name:"AZ7500G-8", category:"overlock",
  description:"Yamato AZ7500G-8 high-speed 5-thread safety-stitch overlock for heavy knitwear. A high-performance overlock for thick fleece, heavy sweatshirt fabrics, and technical knit constructions.",
  max_speed_spm:7000, needle_system:"DC×27", needle_size_range:"9–14",
  manual_url:`${YM}/YAMATO%20AZ%207500G-8%20INSTRUCTION%20MANUAL.pdf`, manual_source:"retailer" },
{ slug:"yamato-az8500g", brand_slug:"yamato", model_name:"AZ8500G", category:"overlock",
  description:"Yamato AZ8500G super high-speed overlock for ultra-fast knitwear production. Yamato's fastest overlock for the highest-volume knitwear factories requiring maximum cycle-time reduction.",
  max_speed_spm:8000, needle_system:"DC×27", needle_size_range:"9–14",
  manual_url:`${YM}/YAMATO%20AZ%208500G%20INSTRUCTION%20MANUAL.pdf`, manual_source:"retailer" },
{ slug:"yamato-vf-y", brand_slug:"yamato", model_name:"VF-Y Series", category:"coverstitch",
  description:"Yamato VF-Y series flatbed coverstitch for hem finishing on flat knitwear panels. A flatbed coverstitch platform for knitwear panels that are cut and hemmed before assembly.",
  max_speed_spm:6500, needle_system:"HA×1", needle_size_range:"9–14",
  manual_url:`${YM}/YAMATO%20VF-Y%20SERIES%20INSTRUCTION%20MANUAL.pdf`, manual_source:"retailer" },
{ slug:"yamato-vg-y", brand_slug:"yamato", model_name:"VG-Y Series", category:"coverstitch",
  description:"Yamato VG-Y series cylinder-arm coverstitch for tubular knitwear hemming. A cylinder-arm variant of the VF-Y for hemming-in-the-round on T-shirts, underwear, and knitwear cuffs.",
  max_speed_spm:6500, needle_system:"HA×1", needle_size_range:"9–14",
  manual_url:`${YM}/YAMATO%20VG-Y%20SERIES%20INSTRUCTION%20MANUAL.pdf`, manual_source:"retailer" },
{ slug:"yamato-ve-ves-y", brand_slug:"yamato", model_name:"VE/VES-Y Series", category:"coverstitch",
  description:"Yamato VE/VES-Y series cylinder-arm coverstitch for knitwear hemming with integrated presser. The VES (with spreader) version automatically presents the fabric edge for consistent coverstitch application.",
  max_speed_spm:6500, needle_system:"HA×1", needle_size_range:"9–14",
  manual_url:`${YM}/YAMATO%20VE_VES-Y%20SERIES%20INSTRUCTION%20MANUAL.pdf`, manual_source:"retailer" },
];

async function run() {
  const brandIds: Record<string, string> = {};
  const { data: existing } = await db.from("brands").select("id, slug");
  for (const b of (existing ?? []) as { id: string; slug: string }[]) brandIds[b.slug] = b.id;

  console.log("── Machines ──");
  let ok = 0;
  for (const m of MACHINES) {
    const brand_id = brandIds[m.brand_slug];
    if (!brand_id) { console.error(`  ✗ ${m.slug}: brand '${m.brand_slug}' not found`); continue; }
    const { slug, brand_slug: _, ...rest } = m;
    const { error } = await db.from("machines").upsert({ slug, brand_id, ...rest }, { onConflict: "slug" });
    if (error) console.error(`  ✗ ${slug}:`, error.message);
    else { process.stdout.write("."); ok++; }
  }

  const { count } = await db.from("machines").select("*", { count: "exact", head: true });
  console.log(`\n\nDone: ${ok}/${MACHINES.length}. Total in DB: ${count}`);
}
run().catch(e => { console.error(e); process.exit(1); });
