import { useInventory } from '@/hooks/useInventory'

export default function Inventory() {
  const { items, loading, error } = useInventory()

  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-900">Inventario</h2>
      <p className="mt-1 text-sm text-slate-500">Catálogo de productos y servicios disponibles.</p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        {loading && <p className="text-sm text-slate-500">Cargando inventario…</p>}
        {error && <p className="text-sm text-red-600">Error: {error}</p>}
        {!loading && !error && items.length === 0 && (
          <p className="text-sm text-slate-500">
            No hay ítems registrados aún. Ejecuta supabase/schema.sql para cargar
            los datos de ejemplo.
          </p>
        )}
        {!loading && !error && items.length > 0 && (
          <ul className="divide-y divide-slate-100 text-sm">
            {items.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-2">
                <span>{item.name}</span>
                <span className="text-slate-400">US${item.base_price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-6 text-xs text-slate-400">
        Listado mínimo de verificación. La tabla completa con SKU, tipo y
        edición se construirá en el módulo "Inventario".
      </p>
    </div>
  )
}
