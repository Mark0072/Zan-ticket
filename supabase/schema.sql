-- ============================================================
-- Zan-ticket · Esquema inicial de Supabase
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- ============================================================

-- Tipos enumerados
create type ticket_type as enum ('Proyecto', 'Servicio', 'Venta', 'Compra');
create type ticket_status as enum ('en_proceso', 'completado', 'cancelado');
create type inventory_item_type as enum ('Producto', 'Servicio');

-- ------------------------------------------------------------
-- Tabla: inventory_items (catálogo de productos/servicios)
-- ------------------------------------------------------------
create table inventory_items (
  id bigint generated always as identity primary key,
  sku text not null unique,
  name text not null,
  type inventory_item_type not null,
  base_price numeric(12,2) not null check (base_price >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Tabla: tickets
-- ------------------------------------------------------------
create table tickets (
  id bigint generated always as identity primary key,
  client_name text not null,
  ticket_type ticket_type not null,
  status ticket_status not null default 'en_proceso',
  sla_due_at timestamptz,          -- fecha límite del SLA
  total_amount numeric(12,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Tabla: ticket_items (líneas de ítems dentro de un ticket,
-- pueden venir del inventario o ser agregados manualmente)
-- ------------------------------------------------------------
create table ticket_items (
  id bigint generated always as identity primary key,
  ticket_id bigint not null references tickets(id) on delete cascade,
  inventory_item_id bigint references inventory_items(id) on delete set null,
  description text not null,
  quantity numeric(12,2) not null default 1 check (quantity > 0),
  unit_price numeric(12,2) not null check (unit_price >= 0),
  subtotal numeric(12,2) generated always as (quantity * unit_price) stored,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Trigger: recalcula total_amount del ticket cuando cambian sus items
-- ------------------------------------------------------------
create or replace function recalc_ticket_total()
returns trigger as $$
begin
  update tickets
  set total_amount = coalesce((
        select sum(subtotal) from ticket_items where ticket_id = coalesce(new.ticket_id, old.ticket_id)
      ), 0),
      updated_at = now()
  where id = coalesce(new.ticket_id, old.ticket_id);
  return null;
end;
$$ language plpgsql;

create trigger trg_ticket_items_recalc
after insert or update or delete on ticket_items
for each row execute function recalc_ticket_total();

-- ------------------------------------------------------------
-- Trigger genérico: updated_at automático
-- ------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_tickets_updated_at
before update on tickets
for each row execute function set_updated_at();

create trigger trg_inventory_updated_at
before update on inventory_items
for each row execute function set_updated_at();

-- ------------------------------------------------------------
-- Índices útiles
-- ------------------------------------------------------------
create index idx_tickets_status on tickets(status);
create index idx_tickets_type on tickets(ticket_type);
create index idx_ticket_items_ticket_id on ticket_items(ticket_id);

-- ------------------------------------------------------------
-- Row Level Security
-- Ajustar las políticas según el modelo de autenticación real
-- (por ahora: acceso completo para usuarios autenticados).
-- ------------------------------------------------------------
alter table tickets enable row level security;
alter table ticket_items enable row level security;
alter table inventory_items enable row level security;

create policy "Usuarios autenticados pueden leer tickets"
  on tickets for select to authenticated using (true);
create policy "Usuarios autenticados pueden escribir tickets"
  on tickets for all to authenticated using (true) with check (true);

create policy "Usuarios autenticados pueden leer ticket_items"
  on ticket_items for select to authenticated using (true);
create policy "Usuarios autenticados pueden escribir ticket_items"
  on ticket_items for all to authenticated using (true) with check (true);

create policy "Usuarios autenticados pueden leer inventario"
  on inventory_items for select to authenticated using (true);
create policy "Usuarios autenticados pueden escribir inventario"
  on inventory_items for all to authenticated using (true) with check (true);

-- ------------------------------------------------------------
-- Datos de ejemplo (opcional, basado en las capturas de referencia)
-- ------------------------------------------------------------
insert into inventory_items (sku, name, type, base_price) values
  ('2001', 'Cemento Gris 42.5kg', 'Producto', 245.00),
  ('2002', 'Instalación Eléctrica Residencial', 'Servicio', 4500.00),
  ('2003', 'Varilla de Acero 3/8"', 'Producto', 180.50),
  ('2004', 'Mantenimiento Preventivo A/C', 'Servicio', 1200.00),
  ('2005', 'Pintura Vinílica Blanca 1 gal', 'Producto', 620.00),
  ('2006', 'Consultoría de Diseño Arquitectónico', 'Servicio', 8500.00),
  ('2007', 'Bloque de Concreto 6"', 'Producto', 55.00),
  ('2008', 'Reparación de Plomería', 'Servicio', 950.00);
