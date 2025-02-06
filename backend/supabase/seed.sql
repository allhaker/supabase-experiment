-- Insert 3 Companies
INSERT INTO company (created_at, name, id)
VALUES
  (NOW(), 'Company A', 1),
  (NOW(), 'Company B', 2),
  (NOW(), 'Company C', 3);

-- Insert 12 Products (with various types)
INSERT INTO product (name, id, created_at, parent_id)
VALUES
  ('Apple', 1, NOW(), NULL),               -- Food (Fruit)
  ('Banana', 2, NOW(), NULL),              -- Food (Fruit)
  ('Consulting Service', 3, NOW(), NULL),  -- Service (Consulting)
  ('Laptop', 4, NOW(), NULL),              -- Technology (Laptop)
  ('Smartphone', 5, NOW(), NULL),          -- Technology (Smartphone)
  ('Cloud Storage', 6, NOW(), NULL),       -- Service (Cloud)
  ('Electric Car', 7, NOW(), NULL),        -- High-Tech (Electric Vehicle)
  ('Soda', 8, NOW(), NULL),                -- Food (Beverage)
  ('Smartwatch', 9, NOW(), NULL),          -- Technology (Wearable)
  ('Web Development', 10, NOW(), NULL),    -- Service (Web Dev)
  ('Headphones', 11, NOW(), NULL),         -- Technology (Audio)
  ('Drone', 12, NOW(), NULL);              -- High-Tech (Drone)

-- Insert 17 UN Sustainable Development Goals
INSERT INTO goal (name, id, created_at)
VALUES
  ('No Poverty', 1, NOW()),
  ('Zero Hunger', 2, NOW()),
  ('Good Health and Well-Being', 3, NOW()),
  ('Quality Education', 4, NOW()),
  ('Gender Equality', 5, NOW()),
  ('Clean Water and Sanitation', 6, NOW()),
  ('Affordable and Clean Energy', 7, NOW()),
  ('Decent Work and Economic Growth', 8, NOW()),
  ('Industry, Innovation, and Infrastructure', 9, NOW()),
  ('Reduced Inequality', 10, NOW()),
  ('Sustainable Cities and Communities', 11, NOW()),
  ('Responsible Consumption and Production', 12, NOW()),
  ('Climate Action', 13, NOW()),
  ('Life Below Water', 14, NOW()),
  ('Life on Land', 15, NOW()),
  ('Peace, Justice, and Strong Institutions', 16, NOW()),
  ('Partnerships for the Goals', 17, NOW());

-- Insert Categories
INSERT INTO category (id, name, created_at, value)
VALUES
  (1, 'strongly aligned', NOW(), 100),
  (2, 'aligned', NOW(), 66),
  (3, 'misaligned', NOW(), 33),
  (4, 'strongly misaligned', NOW(), 0);

-- Insert Product-to-Goal and Category Relationships
-- Example: Consulting Service (ID 3) is strongly aligned with "Decent Work and Economic Growth"
-- Drone (ID 12) is aligned with "Industry, Innovation, and Infrastructure"


INSERT INTO product_to_goal_and_category (goal_id, created_at, product_id, category_id, id)
VALUES
  (8, NOW(), 1, 1, 1),  -- Apple, Goal 8 (Decent Work and Economic Growth), Category "Strongly Aligned"
  (9, NOW(), 2, 2, 2),  -- Banana, Goal 9 (Industry, Innovation, and Infrastructure), Category "Aligned"
  (7, NOW(), 3, 3, 3),  -- Consulting Service, Goal 7 (Affordable and Clean Energy), Category "Misaligned"
  (12, NOW(), 4, 1, 4), -- Laptop, Goal 12 (Responsible Consumption and Production), Category "Strongly Aligned"
  (13, NOW(), 5, 3, 5),  -- Smartphone, Goal 13 (Climate Action), Category "Misaligned"
  (3, NOW(), 6, 2, 6),   -- Cloud Storage, Goal 3 (Good Health and Well-Being), Category "Aligned"
  (11, NOW(), 7, 1, 7),  -- Electric Car, Goal 11 (Sustainable Cities and Communities), Category "Strongly Aligned"
  (10, NOW(), 8, 2, 8), -- Soda, Goal 10 (Reduced Inequality), Category "Aligned"
  (13, NOW(), 10, 3, 9), -- Web Development, Goal 13 (Climate Action), Category "Misaligned"
  (9, NOW(), 11, 1, 10),  -- Headphones, Goal 9 (Industry, Innovation, and Infrastructure), Category "Strongly Aligned"
  (8, NOW(), 12, 2, 11),   -- Drone, Goal 8 (Decent Work and Economic Growth), Category "Aligned"
  (3, NOW(), 1, 3, 12),   -- Apple, Goal 3 (Good Health and Well-Being), Category "Misaligned"
  (7, NOW(), 2, 1, 13),    -- Banana, Goal 7 (Affordable and Clean Energy), Category "Strongly Aligned"
  (12, NOW(), 3, 2, 14),   -- Consulting Service, Goal 12 (Responsible Consumption and Production), Category "Aligned"
  (13, NOW(), 4, 3, 15),   -- Laptop, Goal 13 (Climate Action), Category "Misaligned"
  (8, NOW(), 5, 1, 16),    -- Smartphone, Goal 8 (Decent Work and Economic Growth), Category "Strongly Aligned"
  (9, NOW(), 6, 4, 17),    -- Cloud Storage, Goal 9 (Industry, Innovation, and Infrastructure), Category "Strongly Misaligned"
  (7, NOW(), 7, 2, 18),    -- Electric Car, Goal 7 (Affordable and Clean Energy), Category "Aligned"
  (10, NOW(), 8, 1, 19),   -- Soda, Goal 10 (Reduced Inequality), Category "Strongly Aligned"
  (12, NOW(), 9, 4, 20),   -- Smartwatch, Goal 12 (Responsible Consumption and Production), Category "Strongly Misaligned"
  (13, NOW(), 10, 2, 21),   -- Web Development, Goal 13 (Climate Action), Category "Aligned"
  (3, NOW(), 11, 1, 22),   -- Headphones, Goal 3 (Good Health and Well-Being), Category "Strongly Aligned"
  (7, NOW(), 12, 2, 23),   -- Drone, Goal 7 (Affordable and Clean Energy), Category "Aligned"
  (8, NOW(), 1, 3, 24),    -- Apple, Goal 8 (Decent Work and Economic Growth), Category "Misaligned"
  (9, NOW(), 3, 2, 25),    -- Consulting Service, Goal 9 (Industry, Innovation, and Infrastructure), Category "Aligned"
  (7, NOW(), 4, 2, 26),    -- Laptop, Goal 7 (Affordable and Clean Energy), Category "Aligned"
  (12, NOW(), 5, 1, 27),  -- Smartphone, Goal 12 (Responsible Consumption and Production), Category "Strongly Aligned"
  (3, NOW(), 6, 3, 28);   -- Cloud Storage, Goal 3 (Good Health and Well-Being), Category "Misaligned"

  -- Add more product-to-goal and category mappings as necessary

-- Insert Revenue Shares (Randomized, but one company gets 100% combined share for all products)
INSERT INTO revenue_share (revenue_share, product_id, id, created_at, company_id)
VALUES
  (50.0, 1, 1, NOW(), 1),  -- Company A gets 50% share for Apple
  (10.0, 2, 2, NOW(), 1),   -- Company A gets 10% share for Banana
  (15.0, 7, 3, NOW(), 1),   -- Company A gets 15% share for Electric Car
  (5.0, 8, 4, NOW(), 1),    -- Company A gets 5% share for Soda
  (10.0, 12, 5, NOW(), 1), -- Company A gets 10% share for Drone
  (20.0, 3, 6, NOW(), 2),   -- Company B gets 20% share for Consulting Service
  (20.0, 4, 7, NOW(), 2),   -- Company B gets 20% share for Laptop
  (30.0, 9, 8, NOW(), 2),   -- Company B gets 30% share for Smartwatch
  (30.0, 10, 9, NOW(), 2), -- Company B gets 30% share for Web Development
  (50.0, 5, 10, NOW(), 3),   -- Company C gets 50% share for Smartphone
  (20.0, 6, 11, NOW(), 3),   -- Company C gets 20% share for Cloud Storage
  (30.0, 11, 12, NOW(), 3), -- Company C gets 30% share for Headphones
  (10.0, 12, 13, NOW(), 1); -- Company A gets 10% share for Drone


-- You can add more revenue share assignments for the other products if necessary.
