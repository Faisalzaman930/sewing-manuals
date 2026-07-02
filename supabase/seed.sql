-- Seed data: 5 brands, 38 machines, 24 troubleshooting records
-- Run AFTER schema.sql

-- ── BRANDS ──────────────────────────────────────────────────────────────────

INSERT INTO brands (name, slug, description, country, website_url) VALUES
('Juki', 'juki', 'The world''s leading manufacturer of industrial sewing machines, used in factories across 170 countries. Founded 1938, Japan.', 'Japan', 'https://www.juki.com'),
('Consew', 'consew', 'American industrial sewing machine brand known for walking-foot and compound-feed machines popular with upholsterers and leatherworkers.', 'USA', 'https://www.consew.com'),
('Brother Industrial', 'brother', 'Industrial sewing division of Brother Industries. Reliable lockstitch and overlock machines widely used in Asian garment factories.', 'Japan', 'https://www.brother.com'),
('Singer Industrial', 'singer', 'The original industrial sewing brand. Many vintage Singer models remain in active use decades after production ended.', 'USA', 'https://www.singer.com'),
('Chandler Machine', 'chandler', 'US-based distributor and manufacturer known for cylinder-arm, post-bed, and walking-foot machines popular with leather and shoe craftspeople.', 'USA', 'https://www.chandlerequipment.com')
ON CONFLICT (slug) DO NOTHING;

-- ── MACHINES ────────────────────────────────────────────────────────────────

-- JUKI
INSERT INTO machines (brand_id, model_name, slug, category, description, max_speed_spm, stitch_length_max, needle_system, needle_size_range, bobbin_type, presser_foot_height, lift_height_max, manual_url, manual_source, discontinued, year_introduced)
SELECT b.id, m.model_name, m.slug, m.category, m.description, m.max_speed_spm, m.stitch_length_max, m.needle_system, m.needle_size_range, m.bobbin_type, m.presser_foot_height, m.lift_height_max, m.manual_url, m.manual_source, m.discontinued, m.year_introduced
FROM brands b, (VALUES
  ('Juki DDL-8700', 'juki-ddl-8700', 'lockstitch', 'The world''s most popular single-needle lockstitch machine. Used in garment factories worldwide for light to medium fabrics. Reliable, fast, and easy to maintain.', 5500, 5.0, 'DBx1 (16x231, 135x17)', '#9–#18 (Nm 65–110)', 'Juki large hook (class)', 13.0, 13.0, 'https://www.goldstartool.com/files/Juki-DDL8700-instructions.pdf', 'retailer', false, 1995),
  ('Juki DDL-8700-7', 'juki-ddl-8700-7', 'lockstitch', 'Automatic thread-trimming version of the DDL-8700. Trims both top and bobbin thread at the end of each seam with a foot pedal tap.', 5000, 5.0, 'DBx1 (16x231, 135x17)', '#9–#18 (Nm 65–110)', 'Juki large hook (class)', 13.0, 13.0, 'https://www.manualslib.com/brand/juki/sewing-machine.html', 'manualslib', false, 2000),
  ('Juki DDL-9000C', 'juki-ddl-9000c', 'lockstitch', 'Computerised lockstitch machine with automatic thread trimming, backtacking, and presser foot lifter. Successor to the DDL-8700 series.', 5500, 5.0, 'DBx1 (16x231, 135x17)', '#9–#18 (Nm 65–110)', 'Juki large hook (class)', 13.0, 13.0, 'https://www.juki.com/sewing/en/products/industrial/lockstitch/', 'manufacturer', false, 2012),
  ('Juki DDL-5550N', 'juki-ddl-5550n', 'lockstitch', 'Budget-friendly single-needle lockstitch machine. Fewer automatic features than the DDL-8700 but solid and reliable for light to medium work.', 5000, 4.0, 'DBx1 (16x231, 135x17)', '#9–#16 (Nm 65–100)', 'Juki large hook (class)', 13.0, 13.0, NULL, NULL, false, 2005),
  ('Juki MO-6714S', 'juki-mo-6714s', 'overlock', '4-thread overlock/serger machine. Widely used in garment factories for seam finishing. Differential feed prevents stretching or puckering on knits.', 7000, 4.0, 'DCx27 (ELx705)', '#9–#14 (Nm 65–90)', NULL, 6.0, 6.0, 'https://www.juki.com/sewing/en/products/industrial/overlock/', 'manufacturer', false, 2008),
  ('Juki MO-3916GN', 'juki-mo-3916gn', 'overlock', '3–4 thread overlock machine with built-in light. Suitable for light to medium knit and woven fabrics.', 6500, 4.0, 'DCx27 (ELx705)', '#9–#14 (Nm 65–90)', NULL, 6.0, 6.0, NULL, NULL, false, 2010),
  ('Juki LU-2210N-7', 'juki-lu-2210n-7', 'walking-foot', 'Unison-feed (needle feed + walking foot) lockstitch machine. Ideal for thick, quilted, or slippery materials like leather, canvas, and denim.', 2500, 9.0, 'DPx5 (135x17)', '#16–#22 (Nm 100–140)', 'Juki large hook (class)', 13.0, 16.0, 'https://www.juki.com/sewing/en/products/industrial/unison-feed/', 'manufacturer', false, 2006),
  ('Juki DNU-1541', 'juki-dnu-1541', 'walking-foot', 'Heavy-duty unison-feed machine for very thick materials: multiple layers of leather, canvas, webbing, and automotive upholstery.', 1500, 9.0, 'DPx17 (794)', '#19–#24 (Nm 120–160)', 'Juki large hook (class)', 16.0, 20.0, NULL, NULL, false, 2002),
  ('Juki MF-7923-U11-B56', 'juki-mf-7923', 'coverstitch', '3-needle coverstitch machine. Creates the stretchy, professional hem seen on t-shirts, activewear, and swimwear.', 6000, 4.0, 'UYx128GAS', '#11–#16 (Nm 75–100)', NULL, 6.0, 6.0, NULL, NULL, false, 2010)
) AS m(model_name, slug, category, description, max_speed_spm, stitch_length_max, needle_system, needle_size_range, bobbin_type, presser_foot_height, lift_height_max, manual_url, manual_source, discontinued, year_introduced)
WHERE b.slug = 'juki'
ON CONFLICT (slug) DO NOTHING;

-- CONSEW
INSERT INTO machines (brand_id, model_name, slug, category, description, max_speed_spm, stitch_length_max, needle_system, needle_size_range, bobbin_type, presser_foot_height, lift_height_max, manual_url, manual_source, discontinued, year_introduced)
SELECT b.id, m.model_name, m.slug, m.category, m.description, m.max_speed_spm, m.stitch_length_max, m.needle_system, m.needle_size_range, m.bobbin_type, m.presser_foot_height, m.lift_height_max, m.manual_url, m.manual_source, m.discontinued, m.year_introduced
FROM brands b, (VALUES
  ('Consew 206RB-5', 'consew-206rb-5', 'walking-foot', 'The most popular walking-foot machine in the US. Compound needle and walking foot feed handles leather, canvas, upholstery, and multiple layers with ease.', 2500, 10.0, 'DPx5 (135x17)', '#16–#22 (Nm 100–140)', 'Consew large hook', 14.0, 14.0, 'https://www.supsew.com/download/Consew/Consew%20206RB-5%20Operating%20Instructions.pdf', 'retailer', false, 1985),
  ('Consew 226R-2', 'consew-226r-2', 'walking-foot', 'Compact walking-foot machine suitable for lighter upholstery, leather, and canvas work. Smaller format than the 206RB-5.', 2500, 9.0, 'DPx5 (135x17)', '#16–#21 (Nm 100–130)', 'Consew large hook', 13.0, 13.0, NULL, NULL, false, 1990),
  ('Consew 290', 'consew-290', 'blind-stitch', 'Industrial blind-stitch hemming machine. Creates an invisible hem on trousers, skirts, and curtains without the stitch showing on the right side.', 2800, 3.0, 'TVx7', '#11–#16 (Nm 75–100)', NULL, NULL, NULL, NULL, NULL, false, 1980),
  ('Consew 339RB', 'consew-339rb', 'walking-foot', 'Three-feed compound walking-foot machine with roller presser foot option. Designed for very thick, slippery, or structured materials.', 2000, 10.0, 'DPx5 (135x17)', '#18–#24 (Nm 110–160)', 'Consew large hook', 16.0, 18.0, NULL, NULL, false, 1995),
  ('Consew 287RB-2', 'consew-287rb-2', 'walking-foot', 'Walking foot machine with roller presser foot. The roller eliminates drag on sticky or textured materials like PVC, rubber-backed fabric, and vinyl.', 2500, 10.0, 'DPx5 (135x17)', '#16–#22 (Nm 100–140)', 'Consew large hook', 14.0, 14.0, NULL, NULL, false, 1992),
  ('Consew 255RB', 'consew-255rb', 'walking-foot', 'Post-bed walking-foot machine. The cylindrical bed allows stitching on boots, gloves, and curved seams that a flat-bed machine cannot reach.', 2000, 9.0, 'DPx5 (135x17)', '#16–#22 (Nm 100–140)', 'Consew large hook', 13.0, 13.0, NULL, NULL, false, 1988)
) AS m(model_name, slug, category, description, max_speed_spm, stitch_length_max, needle_system, needle_size_range, bobbin_type, presser_foot_height, lift_height_max, manual_url, manual_source, discontinued, year_introduced)
WHERE b.slug = 'consew'
ON CONFLICT (slug) DO NOTHING;

-- BROTHER
INSERT INTO machines (brand_id, model_name, slug, category, description, max_speed_spm, stitch_length_max, needle_system, needle_size_range, bobbin_type, presser_foot_height, lift_height_max, manual_url, manual_source, discontinued, year_introduced)
SELECT b.id, m.model_name, m.slug, m.category, m.description, m.max_speed_spm, m.stitch_length_max, m.needle_system, m.needle_size_range, m.bobbin_type, m.presser_foot_height, m.lift_height_max, m.manual_url, m.manual_source, m.discontinued, m.year_introduced
FROM brands b, (VALUES
  ('Brother DB2-B791', 'brother-db2-b791', 'lockstitch', 'One of the most widely used industrial lockstitch machines in Asia. Reliable, low-maintenance, and compatible with standard DBx1 needles and accessories.', 5000, 5.0, 'DBx1 (16x231, 135x17)', '#9–#18 (Nm 65–110)', 'Brother large hook', 13.0, 13.0, 'https://www.manualslib.com/brand/brother/sewing-machine.html', 'manualslib', false, 1995),
  ('Brother DB2-B737', 'brother-db2-b737', 'lockstitch', 'Standard industrial lockstitch machine. Interchangeable parts with the DB2-B791 series. Popular in Bangladesh, Vietnam, and Pakistan garment industries.', 5000, 5.0, 'DBx1 (16x231, 135x17)', '#9–#18 (Nm 65–110)', 'Brother large hook', 13.0, 13.0, NULL, NULL, false, 1990),
  ('Brother B7100A', 'brother-b7100a', 'lockstitch', 'Needle-feed lockstitch machine. The needle moves with the fabric feed, preventing slippage on slippery fabrics like silk or microfiber.', 4500, 5.0, 'DBx1 (16x231, 135x17)', '#9–#16 (Nm 65–100)', 'Brother large hook', 13.0, 13.0, NULL, NULL, false, 2005),
  ('Brother MA4-B551', 'brother-ma4-b551', 'overlock', '4-thread overlock machine. Compact and fast with easy threading. Used for light to medium seam finishing in garment factories.', 7000, 4.0, 'DCx27 (ELx705)', '#9–#14 (Nm 65–90)', NULL, 6.0, 6.0, NULL, NULL, false, 2008),
  ('Brother LT2-B842', 'brother-lt2-b842', 'lockstitch', 'Heavy-duty lockstitch machine for denim, canvas, and multiple layers. Larger hook capacity than standard industrial machines.', 3500, 6.0, 'DPx5 (135x17)', '#16–#22 (Nm 100–140)', 'Brother large hook', 14.0, 14.0, NULL, NULL, false, 2003)
) AS m(model_name, slug, category, description, max_speed_spm, stitch_length_max, needle_system, needle_size_range, bobbin_type, presser_foot_height, lift_height_max, manual_url, manual_source, discontinued, year_introduced)
WHERE b.slug = 'brother'
ON CONFLICT (slug) DO NOTHING;

-- SINGER INDUSTRIAL
INSERT INTO machines (brand_id, model_name, slug, category, description, max_speed_spm, stitch_length_max, needle_system, needle_size_range, bobbin_type, presser_foot_height, lift_height_max, manual_url, manual_source, discontinued, year_introduced)
SELECT b.id, m.model_name, m.slug, m.category, m.description, m.max_speed_spm, m.stitch_length_max, m.needle_system, m.needle_size_range, m.bobbin_type, m.presser_foot_height, m.lift_height_max, m.manual_url, m.manual_source, m.discontinued, m.year_introduced
FROM brands b, (VALUES
  ('Singer 111W155', 'singer-111w155', 'walking-foot', 'A legendary vintage walking-foot machine, highly sought after by leatherworkers, upholsterers, and sailmakers. Extremely robust construction with a massive hook for heavy thread.', 3500, 9.0, 'DPx5 (135x17)', '#16–#22 (Nm 100–140)', 'Singer long bobbin (class 66)', 14.0, 14.0, 'https://www.manualslib.com/search/?q=Singer+111W155', 'manualslib', true, 1955),
  ('Singer 211U', 'singer-211u', 'lockstitch', 'Large-hook lockstitch machine designed for heavy thread. The 211U series was used in denim, canvas, and upholstery applications. Many variants (211U13, 211U14, etc.) exist.', 4000, 6.0, 'DBx1 (16x231)', '#14–#21 (Nm 90–130)', 'Singer large hook', 14.0, 14.0, 'https://www.manualslib.com/search/?q=Singer+211U', 'manualslib', true, 1965),
  ('Singer 31-15', 'singer-31-15', 'lockstitch', 'Classic vintage industrial lockstitch machine. Widely used in clothing factories in the mid-20th century. Parts and manuals are still widely available.', 3500, 5.0, 'DBx1 (16x231)', '#9–#18 (Nm 65–110)', 'Singer class 15', 13.0, 13.0, 'https://www.manualslib.com/search/?q=Singer+31-15', 'manualslib', true, 1930),
  ('Singer 591D300A', 'singer-591d300a', 'lockstitch', 'Heavy-duty single-needle lockstitch machine for denim, canvas, and leather. Designed for high-volume industrial use with an extended arm.', 3500, 6.0, 'DBx1 (16x231)', '#14–#21 (Nm 90–130)', 'Singer large hook', 14.0, 14.0, NULL, NULL, true, 1975),
  ('Singer 132K6', 'singer-132k6', 'cylinder-arm', 'Cylinder-arm lockstitch machine for stitching shoes, boots, gloves, and curved seams. The narrow cylindrical bed reaches areas a flat-bed machine cannot.', 2500, 5.0, 'DBx1 (16x231)', '#11–#18 (Nm 75–110)', 'Singer large hook', 12.0, 12.0, 'https://www.manualslib.com/search/?q=Singer+132K6', 'manualslib', true, 1950)
) AS m(model_name, slug, category, description, max_speed_spm, stitch_length_max, needle_system, needle_size_range, bobbin_type, presser_foot_height, lift_height_max, manual_url, manual_source, discontinued, year_introduced)
WHERE b.slug = 'singer'
ON CONFLICT (slug) DO NOTHING;

-- CHANDLER
INSERT INTO machines (brand_id, model_name, slug, category, description, max_speed_spm, stitch_length_max, needle_system, needle_size_range, bobbin_type, presser_foot_height, lift_height_max, manual_url, manual_source, discontinued, year_introduced)
SELECT b.id, m.model_name, m.slug, m.category, m.description, m.max_speed_spm, m.stitch_length_max, m.needle_system, m.needle_size_range, m.bobbin_type, m.presser_foot_height, m.lift_height_max, m.manual_url, m.manual_source, m.discontinued, m.year_introduced
FROM brands b, (VALUES
  ('Chandler 206RBT', 'chandler-206rbt', 'walking-foot', 'Chandler''s compound-feed walking-foot machine, comparable to the Consew 206RB-5. Widely used by upholsterers, leatherworkers, and canvas workers.', 2500, 10.0, 'DPx5 (135x17)', '#16–#22 (Nm 100–140)', 'Large hook', 14.0, 14.0, NULL, NULL, false, 2000),
  ('Chandler 441-clone', 'chandler-441-clone', 'walking-foot', 'Chandler''s version of the Cobra Class 4 / Techsew 2750 style compound-feed machine. Handles very heavy leather, webbing, and safety harness material.', 1500, 12.0, 'DPx17 (794)', '#19–#26 (Nm 120–180)', 'Large hook (extra)', 20.0, 25.0, NULL, NULL, false, 2010),
  ('Chandler Cylinder Arm', 'chandler-cylinder-arm', 'cylinder-arm', 'Cylinder-bed walking-foot machine for boots, bags, and gloves. The narrow arm reaches curved seams that flat-bed machines cannot access.', 2000, 9.0, 'DPx5 (135x17)', '#16–#22 (Nm 100–140)', 'Large hook', 14.0, 14.0, NULL, NULL, false, 2005)
) AS m(model_name, slug, category, description, max_speed_spm, stitch_length_max, needle_system, needle_size_range, bobbin_type, presser_foot_height, lift_height_max, manual_url, manual_source, discontinued, year_introduced)
WHERE b.slug = 'chandler'
ON CONFLICT (slug) DO NOTHING;

-- ── TROUBLESHOOTING ─────────────────────────────────────────────────────────
-- machine_id = NULL means applies to all machines

INSERT INTO troubleshooting (machine_id, symptom, slug, category, causes, fixes, difficulty) VALUES

-- TENSION
(NULL, 'Top thread tension too loose — loops appear on the underside', 'top-thread-loops-underside', 'tension',
 '["Upper tension discs are not engaging (presser foot was down when threading)", "Thread not seated correctly in the tension discs", "Thread take-up spring is worn or missing", "Bobbin thread tension too tight relative to top thread"]',
 '["Raise the presser foot before re-threading — the foot must be up for the tension discs to open", "Re-thread completely from the spool, ensuring thread passes between both tension discs", "Check the thread take-up spring — replace if bent or missing", "Slightly loosen the bobbin case tension screw (turn counter-clockwise 1/4 turn at a time)"]',
 'easy'),

(NULL, 'Top thread breaking repeatedly', 'top-thread-breaking', 'tension',
 '["Needle is bent, blunt, or wrong size for the thread", "Thread tension is too tight", "Thread is caught or fraying on the spool or path", "Thread is passing through a burr or rough spot on the machine", "Needle is not fully inserted — flat side not facing back"]',
 '["Replace the needle — a bent needle is the most common cause and costs less than $1", "Check that needle is fully inserted with the flat side facing toward the back of the machine", "Reduce upper tension by 1–2 numbers and test on scrap", "Run your finger along the thread path from spool to needle — feel for any sharp edges or rough spots", "Check the thread spool is unwinding freely and isn''t tangled"]',
 'easy'),

(NULL, 'Bobbin thread breaking', 'bobbin-thread-breaking', 'tension',
 '["Bobbin case tension screw is too tight", "Bobbin is wound unevenly or the bobbin case is damaged", "Bobbin is inserted in the wrong direction", "Thread tail not pulled under the presser foot before starting"]',
 '["Remove the bobbin case and reinsert the bobbin, ensuring thread feeds in the correct direction (usually clockwise when viewed from above)", "Check the bobbin for uneven winding — discard and rewind if the thread is lumpy or loose", "Loosen the bobbin case tension screw slightly (1/8 turn counter-clockwise)", "Always pull both thread tails under the presser foot before starting a seam"]',
 'easy'),

(NULL, 'Thread bunching underneath the fabric (bird''s nest)', 'thread-bunching-underneath', 'tension',
 '["Machine was not threaded with the presser foot raised", "Upper thread tension is too loose", "Thread is not caught in the take-up lever", "Starting a seam without holding thread tails"]',
 '["Raise the presser foot and re-thread the entire top thread path from scratch", "Hold both thread tails (top and bobbin) behind the presser foot for the first 3–4 stitches", "Increase upper tension slightly", "Check that the thread passes through the take-up lever correctly"]',
 'easy'),

(NULL, 'Uneven or inconsistent stitch length', 'uneven-stitch-length', 'tension',
 '["Fabric is being pulled or pushed through the machine instead of fed naturally", "Feed dog height is incorrect or feed dogs are worn", "Presser foot pressure is too low for the material", "Timing is slightly off"]',
 '["Let the machine feed the fabric — don''t push or pull", "Increase presser foot pressure for thick or heavy materials", "Check feed dog height — dogs should extend 0.8–1.0mm above the needle plate", "Clean lint from under the needle plate and around the feed dogs"]',
 'medium'),

-- TIMING
(NULL, 'Skipped stitches', 'skipped-stitches', 'timing',
 '["Needle is too fine for the thread being used", "Needle is blunt, bent, or installed incorrectly", "Hook timing is off — the hook tip is not catching the thread loop at the right moment", "Presser foot pressure too low — fabric lifting with the needle"]',
 '["Replace the needle with a fresh one of the correct size for your thread", "Ensure the needle is pushed all the way up into the clamp before tightening", "Check hook timing: at the lowest needle position, the hook tip should be 2–3mm above the needle eye", "Increase presser foot pressure so the fabric stays flat during the feed stroke"]',
 'medium'),

(NULL, 'Hook timing is off — needle hitting the hook or missing the loop', 'hook-timing-off', 'timing',
 '["Hook timing has shifted — common after a needle break or running the machine without thread", "Timing screws have loosened from vibration", "Hook or needle bar has been physically damaged"]',
 '["Mark the current hook position with a marker before adjusting", "Bring the needle to its lowest point, then raise it 2–3mm. At this point the hook tip should be level with the needle eye and 0.1mm to the right of the needle", "Loosen the hook set screws and rotate the hook shaft to the correct position, then retighten", "Run slowly by hand through several stitches to verify timing before running at speed", "If unsure, take photos before adjusting and compare to your machine''s service manual"]',
 'hard'),

(NULL, 'Needle breaking repeatedly', 'needle-breaking', 'timing',
 '["Needle is hitting the hook — timing is off", "Needle is hitting the needle plate — plate is loose or needle is installed off-center", "Material is too thick for the needle size being used", "Operator is pulling the fabric sideways while the needle is down"]',
 '["Stop immediately — a broken needle can damage the hook", "Check that the needle plate is seated flat and the screws are tight", "Verify needle is correctly installed and centered in the needle hole", "Use a larger needle for thick materials", "Never pull fabric sideways when the needle is in the down position"]',
 'medium'),

-- FEED
(NULL, 'Machine not feeding fabric — fabric staying still', 'machine-not-feeding', 'feed',
 '["Feed dogs are lowered (drop-feed lever is engaged)", "Feed dog height is too low — dogs not clearing the needle plate", "Excessive lint buildup under the needle plate blocking feed dog movement", "Presser foot pressure is too high, clamping fabric to the plate"]',
 '["Check that the drop-feed lever (usually on the side or back of the machine) is in the raised position", "Remove the needle plate and clean all lint and debris from the feed dog area", "Adjust the feed dog height using the eccentric screw — dogs should rise 0.8–1.0mm above the plate", "Reduce presser foot pressure and test"]',
 'easy'),

(NULL, 'Fabric feeding unevenly — pucker or stretch on one side', 'fabric-feeding-unevenly', 'feed',
 '["Walking foot pads are worn unevenly (walking-foot machines)", "Differential feed ratio incorrect (overlock machines)", "Presser foot is not sitting flat on the fabric", "Feed dogs are worn on one side"]',
 '["Inspect the presser foot — replace if the sole is worn or damaged", "On overlock machines, adjust the differential feed ratio to match the fabric type (higher for stretchy knits, lower for wovens)", "Check that the presser foot is attached securely and sitting flat", "Inspect feed dogs for wear — replace if teeth are worn smooth"]',
 'medium'),

(NULL, 'Machine making loud knocking or clicking noise', 'loud-knocking-noise', 'noise',
 '["Machine is dry — oil level is critically low", "Hook race is dry or has debris in it", "Needle is bent and hitting the hook race", "Timing belt or V-belt is worn or cracked"]',
 '["Oil all oiling points immediately following your machine''s oil chart — a dry machine can seize within minutes", "Remove the hook and clean the hook race with a clean cloth — apply a small amount of machine oil", "Replace the needle and check for hook damage", "Inspect the drive belt — replace if cracked, glazed, or frayed"]',
 'medium'),

(NULL, 'Machine running slower than normal or losing power', 'machine-running-slow', 'noise',
 '["Motor capacitor is failing (common on older machines)", "Drive belt is slipping or glazed", "Machine needs oiling — internal friction is high", "Clutch motor needs adjustment"]',
 '["Oil all oiling points — a stiff machine draws more current and runs slower", "Check the drive belt tension — it should deflect about 1cm when pressed", "Clean the belt and pulley with a dry cloth to remove grease or oil that causes slipping", "Have the motor capacitor tested by an electrician — capacitor failure is common after 10–15 years"]',
 'medium'),

-- NEEDLE / BOBBIN
(NULL, 'Needle thread not catching bobbin thread on first stitch', 'needle-not-catching-bobbin', 'needle',
 '["Thread take-up lever is not at its highest position when starting", "Bobbin thread tail is too short to be caught by the needle thread", "Thread tail is not pulled to the back under the presser foot"]',
 '["Bring the needle to its highest position (turn handwheel toward you until take-up lever is at top)", "Pull both thread tails 15–20cm out to the back-left of the machine before starting", "Lower the presser foot, then begin sewing slowly — the first stitch should pull up the bobbin thread"]',
 'easy'),

(NULL, 'Bobbin running out too quickly or bobbin tension inconsistent', 'bobbin-tension-inconsistent', 'needle',
 '["Bobbin is not wound evenly — thread piles up in the middle or ends", "Bobbin case spring tension is inconsistent or the spring is damaged", "Wrong bobbin size or type for this machine"]',
 '["Wind bobbins at a consistent medium speed — avoid winding too fast which causes uneven thread", "Check the bobbin type — using the wrong size bobbin will cause tension issues that no adjustment can fix", "Test bobbin tension: holding the thread, the bobbin case should drop slowly under its own weight. Too easy = loosen screw, too tight = tighten screw"]',
 'easy')

ON CONFLICT DO NOTHING;
