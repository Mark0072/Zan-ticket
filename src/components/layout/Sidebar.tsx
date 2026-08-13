import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Ticket, Package } from 'lucide-react';

export default function Sidebar() {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
      isActive
        ? 'bg-blue-50 text-blue-600'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-slate-100">
        <h2 className="font-bold text-slate-800 text-lg">Panel Operativo</h2>
        <p className="text-xs text-slate-400 mt-0.5">Gestión interna</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <NavLink to="/" className={linkClasses} end>
          <LayoutDashboard className="w-5 h-5" />
          <span>Inicio</span>
        </NavLink>

        <NavLink to="/tickets" className={linkClasses}>
          <Ticket className="w-5 h-5" />
          <span>Tickets</span>
        </NavLink>

        <NavLink to="/inventario" className={linkClasses}>
          <Package className="w-5 h-5" />
          <span>Inventario</span>
        </NavLink>
      </nav>
    </aside>
  );
}