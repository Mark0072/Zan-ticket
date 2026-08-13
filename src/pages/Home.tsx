import { useTickets } from '@/hooks/useTickets'

export default function Home() {
  const { tickets, loading, error } = useTickets('en_proceso')

  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-900">Bienvenido</h2>
      <p className="mt-1 text-sm text-slate-500">
        Aquí tienes un resumen rápido de la operación y tus accesos frecuentes.
      </p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        <h3 className="text-sm font-semibold text-slate-900">Conexión con Supabase</h3>

        {loading && <p className="mt-2 text-sm text-slate-500">Cargando tickets en proceso…</p>}

        {error && (
          <p className="mt-2 text-sm text-red-600">
            No se pudo conectar a Supabase: {error}. Verifica tu archivo .env.
          </p>
        )}

        {!loading && !error && (
          <p className="mt-2 text-sm text-emerald-600">
            Conexión exitosa — {tickets.length} ticket(s) en proceso encontrados en la base de datos.
          </p>
        )}
      </div>

      <p className="mt-6 text-xs text-slate-400">
        Este es el layout base. El dashboard completo (gráfico de dona, accesos a
        Tickets e Inventario) se construirá en el módulo "Inicio".
      </p>
    </div>
  )
}
