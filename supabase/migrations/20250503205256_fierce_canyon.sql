/*
  # Create coupons table

  1. New Tables
    - `coupons`
      - `id` (uuid, primary key)
      - `code` (text, unique)
      - `discount_value` (numeric)
      - `is_active` (boolean)
      - `expires_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `coupons` table
    - Add policy for authenticated users to read active coupons
*/

CREATE TABLE IF NOT EXISTS coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  discount_value numeric NOT NULL,
  is_active boolean DEFAULT true,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active coupons"
  ON coupons
  FOR SELECT
  USING (
    is_active = true AND 
    (expires_at IS NULL OR expires_at > now())
  );