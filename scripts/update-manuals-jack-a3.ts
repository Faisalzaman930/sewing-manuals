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
  const { error } = await db.from("machines")
    .update({ manual_url: "https://www.trojansewing.co.uk/wp-content/uploads/2024/01/Jack-A3-Series.pdf", manual_source: "retailer" })
    .eq("slug", "jack-a3");
  if (error) { console.error("✗", error.message); return; }
  console.log("✓ jack-a3 → trojansewing.co.uk PDF");

  const { data } = await db.from("machines").select("manual_url");
  const withPdf = (data ?? []).filter((m: { manual_url: string | null }) => m.manual_url?.toLowerCase().includes(".pdf")).length;
  const withAny = (data ?? []).filter((m: { manual_url: string | null }) => m.manual_url).length;
  console.log(`PDF embeds: ${withPdf}/${(data ?? []).length} | Any link: ${withAny}/${(data ?? []).length}`);
}
run().catch(e => { console.error(e); process.exit(1); });
