import { useNavigate } from 'react-router-dom';
import { Ticket, Package, PlusCircle, Activity, ShieldCheck, BarChart3 } from 'lucide-react';

export default function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Saludo y bienvenida */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Panel de Control</h1>
        <p className="text-slate-500 mt-1">Gestiona el flujo operativo de Zan-ticket</p>
      </div>

      {/* Grid de Resumen (Interfaz visual) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-xl text-blue-600"><Activity size={24}/></div>
          <div>
            <p className="text-sm text-slate-500">Tickets Activos</p>
            <p className="text-2xl font-bold text-slate-900">0</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-xl text-purple-600"><ShieldCheck size={24}/></div>
          <div>
            <p className="text-sm text-slate-500">SLA Cumplido</p>
            <p className="text-2xl font-bold text-slate-900">100%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-xl text-green-600"><BarChart3 size={24}/></div>
          <div>
            <p className="text-sm text-slate-500">Inventario</p>
            <p className="text-2xl font-bold text-slate-900">0 ítems</p>
          </div>
        </div>
      </div>

      {/* Acciones principales (Botones grandes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button 
          onClick={() => navigate('/tickets/crear')} 
          className="flex items-center p-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg transition-all hover:scale-[1.02]"
        >
          <PlusCircle className="mr-4" size={32} />
          <div className="text-left">
            <h3 className="font-bold text-lg">Crear Nuevo Ticket</h3>
            <p className="text-blue-100 text-sm">Registrar una nueva solicitud o servicio</p>
          </div>
        </button>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => navigate('/tickets')}
            className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-400 transition-all"
          >
            <Ticket className="text-blue-600 mb-2" size={24} />
            <span className="font-medium text-slate-700">Tickets</span>
          </button>
          <button 
            onClick={() => navigate('/inventario')}
            className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-400 transition-all"
          >
            <Package className="text-blue-600 mb-2" size={24} />
            <span className="font-medium text-slate-700">Inventario</span>
          </button>
        </div>
      </div>
    </div>
  );
}