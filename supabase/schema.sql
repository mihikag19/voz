create table products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  artisan_phone text,
  title text not null,
  description text,
  price_low numeric,
  price_recommended numeric,
  price_high numeric,
  currency text default 'USD',
  category text,
  materials text[],
  cultural_context text,
  language_detected text,
  transcript_english text,
  photo_url text,
  photo_urls text[],
  storefront_html text,
  ethics_status text,
  ethics_notes jsonb,
  created_at timestamptz default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id),
  customer_name text,
  customer_phone text,
  quantity int default 1,
  message text,
  status text default 'new',
  created_at timestamptz default now()
);

alter table orders enable row level security;
create policy "anon can insert orders" on orders for insert to anon with check (true);

alter table products enable row level security;
create policy "public read products" on products for select to anon using (true);
create policy "service role can insert products" on products for insert to service_role with check (true);
