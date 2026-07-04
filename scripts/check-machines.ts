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
  const slugs = ["consew-2101","consew-320rb-1","brother-b7100a","chandler-cylinder-arm","jack-803"];
  const { data } = await db.from("machines")
    .select("slug, model_name, description, category, brand:brands(name)")
    .in("slug", slugs);
  for (const m of (data ?? []) as { slug:string; model_name:string; description:string|null; category:string; brand:{name:string}|null }[]) {
    console.log(`\nSlug:     ${m.slug}`);
    console.log(`Brand:    ${(m.brand as {name:string}|null)?.name}`);
    console.log(`Model:    ${m.model_name}`);
    console.log(`Category: ${m.category}`);
    console.log(`Desc:     ${m.description?.slice(0,120) ?? "(none)"}`);
  }
}
run().catch(e => { console.error(e); process.exit(1); });
