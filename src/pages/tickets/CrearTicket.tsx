
import { useNavigate } from 'react-router-dom';
import { Plus, Printer, Pencil, Clock, CheckCircle2, DollarSign } from 'lucide-react';

export default function TicketsPage() {
  const navigate = useNavigate();

  // Datos de ejemplo (deberías reemplazarlos con la llamada a tu base de datos)
  const tickets = [
    { id: 101, cliente: 'Constructora Del Valle', tipo: 'Proyecto', estado: 'En Proceso', sla: '3h 20m restantes', total: 'US$12,500.00' },
    { id: 104, cliente: 'Farmacia San Rafael', tipo: 'Venta', estado: 'En Proceso', sla: '45m restantes', total: 'US$890.50' },
    { id: 107, cliente: 'Grupo Industrial Cibao', tipo: 'Compra', estado: 'En Proceso', sla: '1h 10m restantes', total: 'US$3,400.00' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Encabezado y Botón Nuevo */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Tickets</h1>
          <p className="text-slate-500">Gestión operativa de tickets activos y completados.</p>
        </div>
        <button 
          onClick={() => navigate('/crear-ticket')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-sm transition-all"
        >
          <Plus className="w-5 h-5" /> Nuevo Ticket
        </button>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full"><Clock className="w-6 h-6" /></div>
          <div>
            <p className="text-sm text-slate-500">Tickets En Proceso</p>
            <p className="text-2xl font-bold text-slate-800">6</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full"><CheckCircle2 className="w-6 h-6" /></div>
          <div>
            <p className="text-sm text-slate-500">Tickets Completados</p>
            <p className="text-2xl font-bold text-slate-800">6</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-slate-100 text-slate-600 rounded-full"><DollarSign className="w-6 h-6" /></div>
          <div>
            <p className="text-sm text-slate-500">Total Facturado</p>
            <p className="text-2xl font-bold text-slate-800">US$31,830.75</p>
          </div>
        </div>
      </div>

      {/* Tabla de Tickets */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Nombre del Cliente</th>
              <th className="px-6 py-4">Tipo de Ticket</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4">SLA</th>
              <th className="px-6 py-4">Total a Facturar</th>
              <th className="px-6 py-4 text-center">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {tickets.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-600">{t.id}</td>
                <td className="px-6 py-4 font-semibold text-slate-800">{t.cliente}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">{t.tipo}</span>
                </td>
                <td className="px-6 py-4 text-slate-600 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-blue-500" /> {t.estado}
                </td>
                <td className="px-6 py-4 text-slate-700">{t.sla}</td>
                <td className="px-6 py-4 font-bold text-slate-800">{t.total}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 hover:bg-slate-200 rounded text-slate-500"><Pencil className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-slate-200 rounded text-slate-500"><Printer className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}