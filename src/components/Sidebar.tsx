import { NavLink } from 'react-router-dom'
import { LayoutGrid, Ticket, Boxes } from 'lucide-react'
import clsx from 'clsx'

const navItems = [
  { to: '/', label: 'Inicio', icon: LayoutGrid, end: true },
  { to: '/tickets', label: 'Tickets', icon: Ticket, end: false },
  { to: '/inventario', label: 'Inventario', icon: Boxes, end: false },
]

export default function Sidebar() {
  return (
    <aside className="w-60 shrink-0 border-r border-slate-200 bg-white px-3 py-5">
      <div className="px-3 pb-6">
        <h1 className="text-base font-semibold text-slate-900">Panel Operativo</h1>
        <p className="text-xs text-slate-400">Gestión interna</p>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )
            }
          >
            <Icon size={17} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
