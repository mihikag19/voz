-- Products table
create table products (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  vendor_name text,
  vendor_phone text,
  image_url text,
  image_urls text[],
  voice_transcript text,
  language_detected text,
  listing_json jsonb,
  pricing_json jsonb,
  storefront_html text,
  storefront_url text,
  ethics_approved boolean default false,
  ethics_notes jsonb,
  created_at timestamp with time zone default now()
);

-- Orders table
create table orders (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references products(id) on delete cascade,
  customer_name text,
  customer_phone text,
  quantity int default 1,
  message text,
  status text default 'new',
  created_at timestamp with time zone default now()
);

-- RLS on products
alter table products enable row level security;

create policy "Public can read products"
  on products for select
  using (true);

create policy "Anyone can insert products"
  on products for insert
  with check (true);

-- RLS on orders
alter table orders enable row level security;

create policy "Anyone can insert orders"
  on orders for insert
  with check (true);

create policy "Public can read orders"
  on orders for select
  using (true);
