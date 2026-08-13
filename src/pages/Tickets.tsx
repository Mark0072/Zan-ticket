import { useTickets } from '@/hooks/useTickets'

export default function Tickets() {
  const { tickets, loading, error } = useTickets()

  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-900">Tickets</h2>
      <p className="mt-1 text-sm text-slate-500">
        Gestión operativa de tickets activos y completados.
      </p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        {loading && <p className="text-sm text-slate-500">Cargando tickets…</p>}
        {error && <p className="text-sm text-red-600">Error: {error}</p>}
        {!loading && !error && tickets.length === 0 && (
          <p className="text-sm text-slate-500">
            No hay tickets registrados aún. Ejecuta el script supabase/schema.sql
            e inserta datos de prueba para verlos aquí.
          </p>
        )}
        {!loading && !error && tickets.length > 0 && (
          <ul className="divide-y divide-slate-100 text-sm">
            {tickets.map((t) => (
              <li key={t.id} className="flex items-center justify-between py-2">
                <span>{t.client_name}</span>
                <span className="text-slate-400">{t.ticket_type}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-6 text-xs text-slate-400">
        Este es un listado mínimo de verificación. La tabla completa con SLA,
        facturación, filtros y acciones se construirá en el módulo "Tickets".
      </p>
    </div>
  )
}
