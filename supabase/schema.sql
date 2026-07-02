-- Industrial Sewing Machine Manuals — Supabase schema
-- Run in Supabase SQL editor

CREATE TABLE IF NOT EXISTS brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  country text,
  website_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS machines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id uuid NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  model_name text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL,
  description text,
  max_speed_spm integer,
  stitch_length_max numeric(4,1),
  needle_system text,
  needle_size_range text,
  bobbin_type text,
  presser_foot_height numeric(4,1),
  lift_height_max numeric(4,1),
  manual_url text,
  manual_source text,
  discontinued boolean DEFAULT false,
  year_introduced integer,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS troubleshooting (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  machine_id uuid REFERENCES machines(id) ON DELETE CASCADE,
  symptom text NOT NULL,
  slug text NOT NULL,
  category text NOT NULL,
  causes jsonb NOT NULL DEFAULT '[]',
  fixes jsonb NOT NULL DEFAULT '[]',
  difficulty text DEFAULT 'medium',
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS machines_brand_id_idx ON machines(brand_id);
CREATE INDEX IF NOT EXISTS machines_category_idx ON machines(category);
CREATE INDEX IF NOT EXISTS troubleshooting_machine_id_idx ON troubleshooting(machine_id);
CREATE INDEX IF NOT EXISTS troubleshooting_category_idx ON troubleshooting(category);

-- RLS: public read
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE machines ENABLE ROW LEVEL SECURITY;
ALTER TABLE troubleshooting ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read brands" ON brands FOR SELECT USING (true);
CREATE POLICY "public read machines" ON machines FOR SELECT USING (true);
CREATE POLICY "public read troubleshooting" ON troubleshooting FOR SELECT USING (true);
