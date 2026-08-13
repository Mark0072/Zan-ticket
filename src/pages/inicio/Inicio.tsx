import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Ticket, Package } from 'lucide-react';

const data = [
  { name: 'Proyecto', value: 2, color: '#2563eb' }, // blue-600
  { name: 'Servicio', value: 2, color: '#9333ea' }, // purple-600
  { name: 'Venta', value: 1, color: '#16a34a' },    // green-600
  { name: 'Compra', value: 1, color: '#d97706' },   // amber-600
];

export default function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Cabecera */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Bienvenido</h1>
        <p className="text-sm text-slate-500">Aquí tienes un resumen rápido de la operación y tus accesos frecuentes.</p>
      </div>

      {/* Gráfico principal */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-semibold text-slate-800">Tickets en Proceso por Tipo</h3>
            <p className="text-xs text-slate-400">Distribución actual de la carga operativa</p>
          </div>
          <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">6 activos</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Leyenda */}
        <div className="flex flex-wrap justify-center gap-6 mt-4 text-xs font-medium text-slate-600">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tarjetas de Acceso Rápido (Plantillas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          onClick={() => navigate('/tickets')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 cursor-pointer transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Ticket className="w-5 h-5" />
          </div>
          <h4 className="font-semibold text-slate-800 flex items-center gap-1">
            Ir a Cola de Tickets <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
          </h4>
          <p className="text-xs text-slate-500 mt-1">Revisa y gestiona los tickets en proceso, sus tiempos de SLA y su facturación.</p>
        </div>

        <div 
          onClick={() => navigate('/inventario')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 cursor-pointer transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Package className="w-5 h-5" />
          </div>
          <h4 className="font-semibold text-slate-800 flex items-center gap-1">
            Ir a Inventario <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">›</span>
          </h4>
          <p className="text-xs text-slate-500 mt-1">Consulta el catálogo de productos y servicios disponibles y sus precios base.</p>
        </div>
      </div>
    </div>
  );
}