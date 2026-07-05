import { readFileSync } from "fs";
import { resolve } from "path";
try {
  const e = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
  for (const l of e.split("\n")) { const m = l.match(/^([^#=]+)=(.*)/); if (m) process.env[m[1].trim()] = m[2].trim(); }
} catch {}
import { createClient } from "@supabase/supabase-js";
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

const S3 = "https://s3.amazonaws.com/a.teamworksales.com";
const KA = `${S3}/KANSAI-PDF/INSTRUCTION%20IN%20ENG`;
const JK = `${S3}/JUKI%20INSTRUCTION%20MANUALS`;
const SI = `${S3}/SINGER%20INSTRUCTIONS`;
const US = `${S3}/UNION-SPECIAL-PDF`;
const CN = `${S3}/CONSEW%20PDF/CONSEW%20NEW`;

const NEW_BRANDS = [
  { slug: "kansai", name: "Kansai Special", country: "JP" },
];

type M = { slug: string; brand_slug: string; model_name: string; category: string;
  description: string; max_speed_spm?: number; needle_system?: string;
  needle_size_range?: string; discontinued?: boolean; manual_url: string; manual_source: string };

const MACHINES: M[] = [

// ══ KANSAI — all 12 models ════════════════════════════════════════════════════

{ slug:"kansai-mac100", brand_slug:"kansai", model_name:"MAC100", category:"lockstitch",
  description:"Kansai Special MAC100 multi-needle arm-type chainstitch for waistband topstitching. A specialty machine for applying multiple rows of chainstitch on trouser waistbands in a single pass.",
  max_speed_spm:4000, needle_system:"DP×17", needle_size_range:"9–16",
  manual_url:`${KA}/MAC100%28ENG%29.pdf`, manual_source:"retailer" },
{ slug:"kansai-mc30", brand_slug:"kansai", model_name:"MC30", category:"lockstitch",
  description:"Kansai Special MC30 multi-needle chainstitch for decorative waistband stitching. A compact multi-needle machine for applying closely-spaced chainstitch rows on waistbands and cuffs.",
  max_speed_spm:4000, needle_system:"DP×17", needle_size_range:"9–14",
  manual_url:`${KA}/MC30%28ENG%29.pdf`, manual_source:"retailer" },
{ slug:"kansai-mz-utc", brand_slug:"kansai", model_name:"MZ UTC", category:"lockstitch",
  description:"Kansai Special MZ UTC multi-needle zigzag with under-thread control for elastic attachment. The UTC mechanism controls lower-thread tension precisely for even zigzag attachment of elastic on waistbands.",
  max_speed_spm:5000, needle_system:"DP×17", needle_size_range:"9–14",
  manual_url:`${KA}/MZ%20UTC%28ENG%29.pdf`, manual_source:"retailer" },
{ slug:"kansai-mz", brand_slug:"kansai", model_name:"MZ", category:"lockstitch",
  description:"Kansai Special MZ multi-needle zigzag machine for elastic attachment and decorative stitching. The MZ applies multiple zigzag rows simultaneously for waistband elastic and decorative striping.",
  max_speed_spm:5000, needle_system:"DP×17", needle_size_range:"9–14",
  manual_url:`${KA}/MZ%28ENG%29.pdf`, manual_source:"retailer" },
{ slug:"kansai-rx", brand_slug:"kansai", model_name:"RX Series", category:"lockstitch",
  description:"Kansai Special RX multi-needle chainstitch for reinforced waistband stitching. The RX series applies dense multi-needle chainstitch for strong, decorative trouser and shorts waistband finishing.",
  max_speed_spm:4500, needle_system:"DP×17", needle_size_range:"9–14",
  manual_url:`${KA}/RX%28ENG%29.pdf`, manual_source:"retailer" },
{ slug:"kansai-rx9701j", brand_slug:"kansai", model_name:"RX9701J", category:"lockstitch",
  description:"Kansai Special RX9701J specialized multi-needle chainstitch for premium denim waistbands. A high-speed version with specific thread management for denim waistband production.",
  max_speed_spm:4500, needle_system:"DP×17", needle_size_range:"11–18",
  manual_url:`${KA}/RX9701J%28ENG%29.pdf`, manual_source:"retailer" },
{ slug:"kansai-px301", brand_slug:"kansai", model_name:"PX301-4-3FP", category:"lockstitch",
  description:"Kansai Special PX301-4-3FP 4-needle chainstitch for fly-piece topstitching on jeans. A specialized machine applying 4 rows of chainstitch for the decorative stitching at the jeans fly opening.",
  max_speed_spm:4000, needle_system:"DP×17", needle_size_range:"11–18",
  manual_url:`${KA}/PX301-4-3FP%28ENG%29.pdf`, manual_source:"retailer" },
{ slug:"kansai-uk", brand_slug:"kansai", model_name:"UK Series", category:"lockstitch",
  description:"Kansai Special UK multi-needle chainstitch for denim outseam and inseam topstitching. Applies multiple parallel rows of chainstitch for the decorative and structural seam topstitching on jeans.",
  max_speed_spm:4000, needle_system:"DP×17", needle_size_range:"11–18",
  manual_url:`${KA}/UK_ENG_1.pdf`, manual_source:"retailer" },
{ slug:"kansai-fx", brand_slug:"kansai", model_name:"FX Series", category:"lockstitch",
  description:"Kansai Special FX multi-needle chainstitch for general waistband and cuff stitching. The standard Kansai FX for lighter-duty multi-needle topstitching applications on casual wear.",
  max_speed_spm:5000, needle_system:"DP×17", needle_size_range:"9–14",
  manual_url:`${KA}/FX%28ENG%29.pdf`, manual_source:"retailer" },
{ slug:"kansai-dx", brand_slug:"kansai", model_name:"DX Series", category:"lockstitch",
  description:"Kansai Special DX multi-needle chainstitch for dense close-pitch topstitching. Applies very closely-spaced needle rows for ultra-fine decorative stitching on premium denim and fashion garments.",
  max_speed_spm:5000, needle_system:"DP×17", needle_size_range:"9–14",
  manual_url:`${KA}/DX%28ENG%29.pdf`, manual_source:"retailer" },
{ slug:"kansai-blx", brand_slug:"kansai", model_name:"BLX Series", category:"lockstitch",
  description:"Kansai Special BLX multi-needle chainstitch for wide-band belt-loop and waistband attachment. The BLX produces wider stitch bands for heavier belt loops and reinforced waistbands.",
  max_speed_spm:4500, needle_system:"DP×17", needle_size_range:"11–18",
  manual_url:`${S3}/KANSAI-PDF/KAN-BLX-INST.pdf`, manual_source:"retailer" },
{ slug:"kansai-lx5801sp", brand_slug:"kansai", model_name:"LX5801SP", category:"lockstitch",
  description:"Kansai Special LX5801SP long-arm multi-needle chainstitch for wide-panel decorative stitching. The long arm provides extra clearance for multi-needle topstitching on wide trouser legs.",
  max_speed_spm:4000, needle_system:"DP×17", needle_size_range:"9–16",
  manual_url:`${S3}/KANSAI-PDF/KAN-LX5801SP-INST.pdf`, manual_source:"retailer" },

// ══ JUKI — more models not yet in DB ══════════════════════════════════════════

{ slug:"juki-lu-1508n", brand_slug:"juki", model_name:"LU-1508N", category:"walking-foot",
  description:"Juki LU-1508N 1-needle compound-feed lockstitch for medium leather and vinyl. An updated walking-foot lockstitch with servo motor compatibility for efficient leather goods production.",
  max_speed_spm:2500, needle_system:"135×17", needle_size_range:"14–21",
  manual_url:`${JK}/LU-1508N%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-lu-2210n", brand_slug:"juki", model_name:"LU-2210N", category:"walking-foot",
  description:"Juki LU-2210N 1-needle compound-feed lockstitch for heavy leather and canvas sewing. The 2210N supports programming of presser foot lift height and stitch length for varied materials.",
  max_speed_spm:2200, needle_system:"135×17", needle_size_range:"16–23",
  manual_url:`${JK}/LU-2210N%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-lu-2220n", brand_slug:"juki", model_name:"LU-2220N", category:"walking-foot",
  description:"Juki LU-2220N extra-heavy compound-feed walking-foot lockstitch for upholstery and marine applications. Handles the thickest materials in the Juki LU family of compound-feed machines.",
  max_speed_spm:2000, needle_system:"135×17", needle_size_range:"18–25",
  manual_url:`${JK}/LU-2220N%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-lz-2280n", brand_slug:"juki", model_name:"LZ-2280N", category:"lockstitch",
  description:"Juki LZ-2280N 1-needle zigzag lockstitch for elastic attachment and appliqué. A direct-drive zigzag machine for high-speed elastic attaching, satin stitching, and decorative applications.",
  max_speed_spm:4500, needle_system:"DB×1", needle_size_range:"9–16",
  manual_url:`${JK}/LZ-2280N%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-lz-2284n", brand_slug:"juki", model_name:"LZ-2284N", category:"lockstitch",
  description:"Juki LZ-2284N zigzag lockstitch with adjustable zigzag width for versatile elastic work. The 2284N allows factory operators to fine-tune the zigzag pattern width for different elastic widths.",
  max_speed_spm:4500, needle_system:"DB×1", needle_size_range:"9–16",
  manual_url:`${JK}/LZ-2284N%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-lz-2290n", brand_slug:"juki", model_name:"LZ-2290N", category:"lockstitch",
  description:"Juki LZ-2290N programmable electronic zigzag lockstitch for complex elastic and appliqué patterns. An electronically controlled zigzag with pattern programming for automated decorative applications.",
  max_speed_spm:5000, needle_system:"DB×1", needle_size_range:"9–14",
  manual_url:`${JK}/LZ-2290N%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-ls-2190", brand_slug:"juki", model_name:"LS-2190", category:"post-bed",
  description:"Juki LS-2190 cylinder-bed lockstitch for shoe upper and leather goods stitching. A cylinder-arm machine from Juki's LS series for shoe upper assembly and round leather item construction.",
  max_speed_spm:3500, needle_system:"135×17", needle_size_range:"14–21",
  manual_url:`${JK}/LS-2190%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-ls-2320", brand_slug:"juki", model_name:"LS-2320", category:"post-bed",
  description:"Juki LS-2320 cylinder-bed lockstitch for heavy footwear and leather goods production. A heavier-duty cylinder-arm machine for medium to heavy shoe construction and leather product assembly.",
  max_speed_spm:3000, needle_system:"135×17", needle_size_range:"14–21",
  manual_url:`${JK}/LS-2320%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-mh-380", brand_slug:"juki", model_name:"MH-380", category:"overlock",
  description:"Juki MH-380 cylinder-bed overlock for sock and hose manufacturing. A specialized cylinder-arm overlock for joining knit hosiery and sock seams on narrow-diameter tubular fabrics.",
  max_speed_spm:7000, needle_system:"DC×27", needle_size_range:"9–14",
  manual_url:`${JK}/MH-380%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-mh-490", brand_slug:"juki", model_name:"MH-490", category:"overlock",
  description:"Juki MH-490 high-speed overlock for medium knitwear production. An updated MH-series overlock with improved stitch quality and noise reduction for factory environments.",
  max_speed_spm:7500, needle_system:"DC×27", needle_size_range:"9–14",
  manual_url:`${JK}/MH-490%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-mo-3704", brand_slug:"juki", model_name:"MO-3704", category:"overlock",
  description:"Juki MO-3704 3/4-thread differential-feed overlock for stable knitwear edge finishing. A lower-cost 4-thread overlock for factories needing reliable knitwear overlocking without complex controls.",
  max_speed_spm:6000, needle_system:"DC×27", needle_size_range:"9–14",
  manual_url:`${JK}/MO-3704%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-mo-6714s", brand_slug:"juki", model_name:"MO-6714S", category:"overlock",
  description:"Juki MO-6714S 5-thread safety-stitch overlock for secure heavy knitwear seaming. Combines chainstitch with overlock for the secure seam needed in thick fleece, heavy jersey, and sweatshirt production.",
  max_speed_spm:7000, needle_system:"DC×27", needle_size_range:"9–16",
  manual_url:`${JK}/MO-6714S%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-mo-6716s", brand_slug:"juki", model_name:"MO-6716S", category:"overlock",
  description:"Juki MO-6716S 5-thread safety-stitch overlock with improved threading system. An updated 5-thread overlock with color-coded threading path for faster setup and reduced operator errors.",
  max_speed_spm:7000, needle_system:"DC×27", needle_size_range:"9–16",
  manual_url:`${JK}/MO-6716S%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-mo-6904", brand_slug:"juki", model_name:"MO-6904", category:"overlock",
  description:"Juki MO-6904 industrial overlock for light fabrics and lingerie. A delicate-fabric overlock for finishing the edges of lingerie, light jersey, and sheer fabrics without distortion.",
  max_speed_spm:7500, needle_system:"DC×27", needle_size_range:"9–11",
  manual_url:`${JK}/MO-6904%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-mo-816", brand_slug:"juki", model_name:"MO-816", category:"overlock",
  description:"Juki MO-816 industrial overlock for general fabric overlocking. An earlier Juki overlock that established the brand's reputation for quality and reliability in industrial knitwear factories.",
  max_speed_spm:6000, needle_system:"DC×27", needle_size_range:"9–14", discontinued:true,
  manual_url:`${JK}/MO-816%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-ddl-8100b", brand_slug:"juki", model_name:"DDL-8100B", category:"lockstitch",
  description:"Juki DDL-8100B direct-drive lockstitch with built-in bobbin winder and thread trimmer. An advanced production machine combining direct-drive technology with automatic features for apparel sewing.",
  max_speed_spm:5500, needle_system:"DB×1", needle_size_range:"9–18",
  manual_url:`${JK}/DDL-8100B%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-ddl-8300n", brand_slug:"juki", model_name:"DDL-8300N", category:"lockstitch",
  description:"Juki DDL-8300N direct-drive high-speed lockstitch with automatic thread trimmer. An updated DDL-8000 series with improved drive efficiency and reduced maintenance for high-volume garment factories.",
  max_speed_spm:5500, needle_system:"DB×1", needle_size_range:"9–18",
  manual_url:`${JK}/DDL-8300N%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-ddl-8500n", brand_slug:"juki", model_name:"DDL-8500N", category:"lockstitch",
  description:"Juki DDL-8500N direct-drive lockstitch with IoT connectivity for production monitoring. Adds network connectivity to the DDL-8300N for real-time factory floor production tracking and machine status.",
  max_speed_spm:5000, needle_system:"DB×1", needle_size_range:"9–18",
  manual_url:`${JK}/DDL-8500N%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-dlm-5400n", brand_slug:"juki", model_name:"DLM-5400N", category:"lockstitch",
  description:"Juki DLM-5400N dry-head direct-drive lockstitch for oil-free fabric production. Eliminates oil contamination for sewing white, light-colored, and technical fabrics that cannot be oil-stained.",
  max_speed_spm:5000, needle_system:"DB×1", needle_size_range:"9–16",
  manual_url:`${JK}/DLM-5400N%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-lbh-1790", brand_slug:"juki", model_name:"LBH-1790", category:"lockstitch",
  description:"Juki LBH-1790 electronic buttonhole machine with programmable feed for keyhole and straight buttonholes. Creates consistently shaped buttonholes for dress shirts, trousers, and outerwear.",
  max_speed_spm:3200, needle_system:"DP×5",
  manual_url:`${JK}/LBH-1790%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-mb-372", brand_slug:"juki", model_name:"MB-372", category:"lockstitch",
  description:"Juki MB-372 button sewer for flat button attachment. A standard button-sewing machine for attaching flat 2-hole and 4-hole buttons on shirts, trousers, and casual garments.",
  max_speed_spm:2700, needle_system:"TQ×7",
  manual_url:`${JK}/MB-372%20INST.pdf`, manual_source:"retailer" },
{ slug:"juki-mb-373", brand_slug:"juki", model_name:"MB-373", category:"lockstitch",
  description:"Juki MB-373 electronic button sewer with automatic counting for consistent button attachment. Automatically counts thread wraps for uniform shank height across a production run.",
  max_speed_spm:2700, needle_system:"TQ×7",
  manual_url:`${JK}/MB-373%20INST.pdf`, manual_source:"retailer" },

// ══ SINGER — more vintage and industrial models ════════════════════════════════

{ slug:"singer-20u-series", brand_slug:"singer", model_name:"20U Series", category:"lockstitch",
  description:"Singer 20U series zigzag lockstitch for domestic and light industrial sewing. The 20U class machines were Singer's transition from professional domestic to light industrial zigzag machines.",
  max_speed_spm:1100, needle_system:"15×1", needle_size_range:"9–16", discontinued:true,
  manual_url:`${SI}/20u_series.pdf`, manual_source:"retailer" },
{ slug:"singer-96-17-series", brand_slug:"singer", model_name:"96-17 Series", category:"lockstitch",
  description:"Singer Class 96-17 series industrial lockstitch for garment and canvas sewing. A specific variant in Singer's 96 class for medium-weight industrial sewing applications.",
  max_speed_spm:3500, needle_system:"135×17", needle_size_range:"9–18", discontinued:true,
  manual_url:`${SI}/96-17_21.pdf`, manual_source:"retailer" },
{ slug:"singer-172w-series", brand_slug:"singer", model_name:"172W Series", category:"walking-foot",
  description:"Singer 172W series compound-feed walking-foot lockstitch for leather and vinyl. A mid-century Singer walking-foot lockstitch that established the compound-feed design pattern for the industry.",
  max_speed_spm:2500, needle_system:"135×17", needle_size_range:"14–21", discontinued:true,
  manual_url:`${SI}/172W_Series.pdf`, manual_source:"retailer" },
{ slug:"singer-175w-series", brand_slug:"singer", model_name:"175W Series", category:"walking-foot",
  description:"Singer 175W series heavy compound-feed walking-foot for upholstery and heavy canvas. A heavier version of the 172W for thick upholstery fabrics and industrial canvas applications.",
  max_speed_spm:2000, needle_system:"135×17", needle_size_range:"16–23", discontinued:true,
  manual_url:`${SI}/175W_Series.pdf`, manual_source:"retailer" },
{ slug:"singer-211w-series", brand_slug:"singer", model_name:"211W Series", category:"walking-foot",
  description:"Singer 211W series heavy-duty walking-foot lockstitch for industrial leather production. A powerful Singer compound-feed machine for thick leather goods, saddlery, and heavy canvas sewing.",
  max_speed_spm:2200, needle_system:"794 H", needle_size_range:"18–25", discontinued:true,
  manual_url:`${SI}/211W_Series.pdf`, manual_source:"retailer" },
{ slug:"singer-269w-series", brand_slug:"singer", model_name:"269W Series", category:"overlock",
  description:"Singer 269W series industrial overlock for knitwear seaming. A Singer FOTA-type overlock for high-volume knitwear and jersey fabric edge finishing in industrial clothing factories.",
  max_speed_spm:5500, needle_system:"UY×128", needle_size_range:"9–14", discontinued:true,
  manual_url:`${SI}/269W_Series.pdf`, manual_source:"retailer" },
{ slug:"singer-300w-series", brand_slug:"singer", model_name:"300W Series", category:"lockstitch",
  description:"Singer Class 300W series cylinder-arm lockstitch for shoe and boot production. An early Singer cylinder-arm machine for footwear manufacturing and leather goods requiring the post-bed configuration.",
  max_speed_spm:3000, needle_system:"135×17", needle_size_range:"14–21", discontinued:true,
  manual_url:`${SI}/300W_Series.pdf`, manual_source:"retailer" },
{ slug:"singer-302u-series", brand_slug:"singer", model_name:"302U Series", category:"overlock",
  description:"Singer 302U series FOTA chainstitch for knitwear side seaming. A Singer feed-off-the-arm machine for sewing T-shirt side seams and knitwear assembly with chainstitch that stretches with the fabric.",
  max_speed_spm:5000, needle_system:"UY×128", needle_size_range:"9–14", discontinued:true,
  manual_url:`${SI}/302U_Series.pdf`, manual_source:"retailer" },

// ══ UNION SPECIAL — more models ═══════════════════════════════════════════════

{ slug:"union-special-39500", brand_slug:"union-special", model_name:"39500 Series", category:"overlock",
  description:"Union Special 39500 series industrial overlock for high-speed fabric edge finishing. A versatile Union Special overlock for cutting and overlocking the raw edges of woven and knit fabrics.",
  max_speed_spm:6000, needle_system:"DC×27", needle_size_range:"9–14", discontinued:true,
  manual_url:`${US}/39500%20SERIES%20INST.pdf`, manual_source:"retailer" },
{ slug:"union-special-57600", brand_slug:"union-special", model_name:"57600 Series", category:"overlock",
  description:"Union Special 57600 series differential-feed overlock for stretch fabric seaming. A specialty Union Special overlock with differential feed for handling difficult stretch and knit fabrics.",
  max_speed_spm:6000, needle_system:"DC×27", needle_size_range:"9–14", discontinued:true,
  manual_url:`${US}/57600%20SERIES%20INST.pdf`, manual_source:"retailer" },
{ slug:"union-special-67000a", brand_slug:"union-special", model_name:"67000A Series", category:"overlock",
  description:"Union Special 67000A series industrial overlock for heavy fabrics. A heavy-duty overlock from Union Special for finishing the edges of denim, canvas, and thick woven fabrics.",
  max_speed_spm:5000, needle_system:"DC×27", needle_size_range:"11–18", discontinued:true,
  manual_url:`${US}/67000A%20SERIES%20INST.pdf`, manual_source:"retailer" },
{ slug:"union-special-81200", brand_slug:"union-special", model_name:"81200 Series", category:"lockstitch",
  description:"Union Special 81200 series lockstitch for general industrial sewing. A Union Special single-needle lockstitch covering a range of light to medium industrial garment applications.",
  max_speed_spm:4500, needle_system:"DB×1", needle_size_range:"9–18", discontinued:true,
  manual_url:`${US}/81200%20SERIES%20INST.pdf`, manual_source:"retailer" },

// ══ CONSEW — a few more final models ══════════════════════════════════════════

{ slug:"consew-277rfsi", brand_slug:"consew", model_name:"277RFSI", category:"walking-foot",
  description:"Consew 277RFSI compound-feed walking-foot lockstitch with independent safety clutch. The RFSI designation adds a safety clutch mechanism to protect the machine if needle strikes hardened material.",
  max_speed_spm:2500, needle_system:"135×17", needle_size_range:"14–21",
  manual_url:`${CN}/CONSEW%20277RFSI%20INSTRUCTION%20MANUAL.pdf`, manual_source:"retailer" },
{ slug:"consew-287rb", brand_slug:"consew", model_name:"287RB", category:"walking-foot",
  description:"Consew 287RB compound-feed walking-foot lockstitch for upholstery and leather goods. A reliable mid-range walking-foot machine for furniture upholstery and leather bag production.",
  max_speed_spm:2500, needle_system:"135×17", needle_size_range:"14–21",
  manual_url:`${CN}/CONSEW%20287RB%20INSTRUTION%20MANUAL.pdf`, manual_source:"retailer" },
{ slug:"consew-318rb-1", brand_slug:"consew", model_name:"318RB-1", category:"walking-foot",
  description:"Consew 318RB-1 heavy compound-feed walking-foot lockstitch for upholstery and marine work. A more powerful walking-foot machine for the thick foam-padded panels in marine and automotive seating.",
  max_speed_spm:2200, needle_system:"135×17", needle_size_range:"16–23",
  manual_url:`${CN}/CONSEW%20318RB-1%20INSTRUCTION%20MANUAL.pdf`, manual_source:"retailer" },
{ slug:"consew-339rh", brand_slug:"consew", model_name:"339RH", category:"walking-foot",
  description:"Consew 339RH heavy-duty compound-feed walking-foot for industrial canvas and sail making. A powerful Consew machine for the thick canvas and sailcloth used in boat sail and awning manufacturing.",
  max_speed_spm:2000, needle_system:"794 H", needle_size_range:"21–28",
  manual_url:`${CN}/CONSEW%20339RH%20INSTRUCTION%20MANUAL.pdf`, manual_source:"retailer" },
{ slug:"consew-796rb", brand_slug:"consew", model_name:"796RB", category:"walking-foot",
  description:"Consew 796RB post-bed cylinder-arm compound-feed lockstitch for shoe manufacturing. A cylinder-arm version of the Consew 700 series walking-foot for shoes, boots, and tubular leather goods.",
  max_speed_spm:2000, needle_system:"135×17", needle_size_range:"14–21",
  manual_url:`${CN}/CONSEW%20796RB%20INSTRUCTION%20MANUAL.pdf`, manual_source:"retailer" },
];

async function run() {
  const brandIds: Record<string, string> = {};
  const { data: existing } = await db.from("brands").select("id, slug");
  for (const b of (existing ?? []) as { id: string; slug: string }[]) brandIds[b.slug] = b.id;

  console.log("── New brands ──");
  for (const br of NEW_BRANDS) {
    if (brandIds[br.slug]) { console.log(`  skip ${br.slug}`); continue; }
    const { data, error } = await db.from("brands").insert({
      slug: br.slug, name: br.name, country: br.country,
      description: `${br.name} industrial sewing machines.`,
    }).select("id").single();
    if (error) { console.error(`  ✗ ${br.slug}:`, error.message); }
    else { brandIds[br.slug] = data!.id; console.log(`  + ${br.slug}`); }
  }

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
