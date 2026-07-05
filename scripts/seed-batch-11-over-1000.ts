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
const CN = `${S3}/CONSEW%20PDF/CONSEW%20NEW`;

type M = { slug: string; brand_slug: string; model_name: string; category: string;
  description: string; max_speed_spm?: number; needle_system?: string;
  needle_size_range?: string; discontinued?: boolean; manual_url: string; manual_source: string };

const MACHINES: M[] = [

{ slug:"juki-ddl-9000b", brand_slug:"juki", model_name:"DDL-9000B", category:"lockstitch",
  description:"Juki DDL-9000B AI-equipped direct-drive lockstitch with enhanced production analytics. Updated 9000-series with improved sewing data upload for factory-wide production benchmarking.",
  max_speed_spm:5000, needle_system:"DB×1", needle_size_range:"9–18",
  manual_url:`${JK}/DDL-9000B%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-mo-3916", brand_slug:"juki", model_name:"MO-3916", category:"overlock",
  description:"Juki MO-3916 2-needle 4-thread overlock for firm, secure knitwear seam construction. An updated overlock for sturdy 4-thread seaming on medium to heavy knitwear garments.",
  max_speed_spm:7000, needle_system:"DC×27", needle_size_range:"9–16",
  manual_url:`${JK}/MO-3916%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-mo-6746s", brand_slug:"juki", model_name:"MO-6746S", category:"overlock",
  description:"Juki MO-6746S 5-thread safety-stitch overlock for heavy outerwear fabric seaming. A high-volume 5-thread machine for efficient seaming of fleece, denim, and heavy jersey fabrics.",
  max_speed_spm:7500, needle_system:"DC×27", needle_size_range:"9–16",
  manual_url:`${JK}/MO-6746S%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-dlm-5400np", brand_slug:"juki", model_name:"DLM-5400NP", category:"lockstitch",
  description:"Juki DLM-5400NP oil-free lockstitch with direct-drive and presser-foot pressure control. An advanced dry-head machine for light and medium fabrics where consistent pressure control is critical.",
  max_speed_spm:5000, needle_system:"DB×1", needle_size_range:"9–16",
  manual_url:`${JK}/DLM-5400NP%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-mb-1800a", brand_slug:"juki", model_name:"MB-1800A", category:"lockstitch",
  description:"Juki MB-1800A programmable button sewer for complex button positioning. An electronic button sewer with sewing pattern programming for buttons requiring specific thread wrap patterns.",
  max_speed_spm:2700, needle_system:"TQ×7",
  manual_url:`${JK}/MB-1800A%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-apw-895", brand_slug:"juki", model_name:"APW-895", category:"lockstitch",
  description:"Juki APW-895 programmable pocket setter for trouser and jeans pocket welting. An automated pocket-welt sewing machine that programs the exact pocket shape and welt stitch pattern.",
  max_speed_spm:3000, needle_system:"DB×1",
  manual_url:`${JK}/APW-895%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-ams-221en", brand_slug:"juki", model_name:"AMS-221EN", category:"lockstitch",
  description:"Juki AMS-221EN electronic computer-controlled pattern sewing machine for emblems and labels. An advanced pattern-sewing machine with expanded memory for multi-color and complex embroidered patches.",
  max_speed_spm:2700, needle_system:"DB×1",
  manual_url:`${JK}/AMS-221EN%20INST.pdf`, manual_source:"retailer" },
{ slug:"singer-44w-series", brand_slug:"singer", model_name:"44W Series", category:"lockstitch",
  description:"Singer Class 44W series cylinder-arm lockstitch for shoes and gloves. An early Singer cylinder-arm machine for small-circumference leather goods requiring in-the-round stitching.",
  max_speed_spm:2500, needle_system:"135×17", needle_size_range:"9–16", discontinued:true,
  manual_url:`${SI}/44W_Series.pdf`, manual_source:"retailer" },
{ slug:"singer-111w-155-series", brand_slug:"singer", model_name:"111W155 Series", category:"walking-foot",
  description:"Singer 111W155 series compound-feed walking-foot for medium leather goods. An updated variant in Singer's popular 111W compound-feed family for leather and vinyl production.",
  max_speed_spm:2800, needle_system:"135×17", needle_size_range:"14–21", discontinued:true,
  manual_url:`${SI}/111W155_Series.pdf`, manual_source:"retailer" },
{ slug:"singer-153w-series", brand_slug:"singer", model_name:"153W Series", category:"lockstitch",
  description:"Singer Class 153W series buttonhole machine for industrial garment factories. An industrial-grade Singer buttonholer producing consistent keyhole and straight buttonholes at high production speeds.",
  max_speed_spm:3000, needle_system:"DP×5", discontinued:true,
  manual_url:`${SI}/153W_Series.pdf`, manual_source:"retailer" },
{ slug:"brother-s-7200c", brand_slug:"brother", model_name:"S-7200C", category:"lockstitch",
  description:"Brother S-7200C industrial direct-drive lockstitch with electronic feed control. A precision direct-drive lockstitch with multi-step feed adjustment for adapting to different fabric weights.",
  max_speed_spm:5000, needle_system:"DB×1", needle_size_range:"9–18",
  manual_url:`${BR}/S-7200C%20INSTRUCTIONS.pdf`, manual_source:"retailer" },
{ slug:"brother-s-1000a", brand_slug:"brother", model_name:"S-1000A", category:"lockstitch",
  description:"Brother S-1000A industrial lockstitch with automatic thread trimmer and backtack. An entry-level direct-drive Brother lockstitch featuring the core automatic functions for efficient garment sewing.",
  max_speed_spm:5500, needle_system:"DB×1", needle_size_range:"9–18",
  manual_url:`${BR}/S-1000A%20INSTRUCTIONS.pdf`, manual_source:"retailer" },
{ slug:"highlead-gc0618", brand_slug:"highlead", model_name:"GC0618", category:"post-bed",
  description:"Highlead GC0618 cylinder-arm lockstitch for light leather accessories. A versatile light-duty cylinder-arm machine paired with the GC0318 series for soft leather goods production.",
  max_speed_spm:4000, needle_system:"135×17", needle_size_range:"9–14",
  manual_url:`${HL}/HIGHLEAD%20GC0318-1%20%20GC0318-2%20%20GC0318-8%20%20GC0618%20instructions%20%26%20parts%20catalog.pdf`, manual_source:"retailer" },
{ slug:"consew-226r-1", brand_slug:"consew", model_name:"226R-1", category:"walking-foot",
  description:"Consew 226R-1 compound-feed walking-foot lockstitch for light to medium leather goods. An entry-level Consew compound-feed machine for leatherette, light leather, and vinyl production.",
  max_speed_spm:2500, needle_system:"135×17", needle_size_range:"11–18",
  manual_url:`${CN}/CONSEW%20226R-1%20INSTRUCTION%20MANUAL.pdf`, manual_source:"retailer" },
{ slug:"consew-398rb-1", brand_slug:"consew", model_name:"398RB-1", category:"walking-foot",
  description:"Consew 398RB-1 extra-heavy compound-feed walking-foot for industrial canvas and upholstery. A powerful Consew walking-foot machine for the heaviest upholstery materials and industrial canvas.",
  max_speed_spm:1800, needle_system:"794 H", needle_size_range:"21–28",
  manual_url:`${CN}/CONSEW%20398RB-1%20INSTRUCTION%20MANUAL.pdf`, manual_source:"retailer" },
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
