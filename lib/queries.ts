import { publicClient } from "./supabase";
import type { Brand, Machine, TroubleshootingRecord, MachineCategory } from "./types";

export async function getBrands(): Promise<Brand[]> {
  const { data } = await publicClient()
    .from("brands")
    .select("*")
    .order("name");
  return (data as Brand[]) ?? [];
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  const { data } = await publicClient()
    .from("brands")
    .select("*")
    .eq("slug", slug)
    .single();
  return (data as Brand) ?? null;
}

export async function getMachinesByBrand(brandId: string): Promise<Machine[]> {
  const { data } = await publicClient()
    .from("machines")
    .select("*, brand:brands(*)")
    .eq("brand_id", brandId)
    .order("model_name");
  return (data as Machine[]) ?? [];
}

export async function getMachineBySlug(slug: string): Promise<Machine | null> {
  const { data } = await publicClient()
    .from("machines")
    .select("*, brand:brands(*)")
    .eq("slug", slug)
    .single();
  return (data as Machine) ?? null;
}

export async function getMachinesByCategory(category: MachineCategory): Promise<Machine[]> {
  const { data } = await publicClient()
    .from("machines")
    .select("*, brand:brands(*)")
    .eq("category", category)
    .order("model_name");
  return (data as Machine[]) ?? [];
}

export async function getTroubleshootingForMachine(
  machineId: string
): Promise<TroubleshootingRecord[]> {
  const { data } = await publicClient()
    .from("troubleshooting")
    .select("*")
    .or(`machine_id.eq.${machineId},machine_id.is.null`)
    .order("category");
  return (data as TroubleshootingRecord[]) ?? [];
}

export async function getAllTroubleshooting(): Promise<TroubleshootingRecord[]> {
  const { data } = await publicClient()
    .from("troubleshooting")
    .select("*")
    .order("category, symptom");
  return (data as TroubleshootingRecord[]) ?? [];
}

export async function getTroubleshootingBySlug(
  slug: string
): Promise<TroubleshootingRecord | null> {
  const { data } = await publicClient()
    .from("troubleshooting")
    .select("*")
    .eq("slug", slug)
    .single();
  return (data as TroubleshootingRecord) ?? null;
}

export async function searchMachines(query: string): Promise<Machine[]> {
  const { data } = await publicClient()
    .from("machines")
    .select("*, brand:brands(*)")
    .ilike("model_name", `%${query}%`)
    .limit(20);
  return (data as Machine[]) ?? [];
}

export async function getAllMachineSlugs(): Promise<{ slug: string; brand_slug: string }[]> {
  const { data } = await publicClient()
    .from("machines")
    .select("slug, brand:brands(slug)");
  const rows = (data as unknown as { slug: string; brand: { slug: string } }[]) ?? [];
  return rows.map((r) => ({ slug: r.slug, brand_slug: r.brand?.slug ?? "" }));
}

export async function getAllBrandSlugs(): Promise<{ slug: string }[]> {
  const { data } = await publicClient()
    .from("brands")
    .select("slug");
  return (data as { slug: string }[]) ?? [];
}
