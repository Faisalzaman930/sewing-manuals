export type MachineCategory =
  | "lockstitch"
  | "overlock"
  | "walking-foot"
  | "coverstitch"
  | "blind-stitch"
  | "buttonhole"
  | "post-bed"
  | "cylinder-arm"
  | "other";

export const CATEGORY_LABELS: Record<MachineCategory, string> = {
  "lockstitch": "Lockstitch",
  "overlock": "Overlock / Serger",
  "walking-foot": "Walking Foot",
  "coverstitch": "Coverstitch",
  "blind-stitch": "Blind Stitch",
  "buttonhole": "Buttonhole",
  "post-bed": "Post Bed",
  "cylinder-arm": "Cylinder Arm",
  "other": "Other",
};

export const CATEGORY_DESCRIPTIONS: Record<MachineCategory, string> = {
  "lockstitch": "Standard straight-stitch machine — the most common type in garment factories.",
  "overlock": "Trims, wraps, and overcasts seams in one pass. Also called a serger.",
  "walking-foot": "All three feeds move together — ideal for thick, slippery, or quilted materials.",
  "coverstitch": "Creates the stretchy hem seen on t-shirts and activewear.",
  "blind-stitch": "Hems fabric invisibly without the stitch showing on the right side.",
  "buttonhole": "Cuts and sews buttonholes in one operation.",
  "post-bed": "Vertical arm allows stitching on boots, gloves, and curved items.",
  "cylinder-arm": "Narrow tubular bed for sewing round or cylindrical items.",
  "other": "Specialty or multi-function machine.",
};

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  country: string | null;
  website_url: string | null;
}

export interface Machine {
  id: string;
  brand_id: string;
  brand?: Brand;
  model_name: string;
  slug: string;
  category: MachineCategory;
  description: string | null;
  max_speed_spm: number | null;
  stitch_length_max: number | null;
  needle_system: string | null;
  needle_size_range: string | null;
  bobbin_type: string | null;
  presser_foot_height: number | null;
  lift_height_max: number | null;
  manual_url: string | null;
  manual_source: string | null;
  discontinued: boolean;
  year_introduced: number | null;
}

export interface TroubleshootingRecord {
  id: string;
  machine_id: string | null;
  symptom: string;
  slug: string;
  category: string;
  causes: string[];
  fixes: string[];
  difficulty: "easy" | "medium" | "hard";
}
