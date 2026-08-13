import { useNavigate } from 'react-router-dom';
import { Package, Wrench, Plus, Edit2 } from 'lucide-react';

const mockInventario = [
  { id: 2001, nombre: 'Cemento Gris 42.5kg', tipo: 'Producto', tipoBadge: 'bg-blue-50 text-blue-600 border-blue-200', precio: 'US$245.00' },
  { id: 2002, nombre: 'Instalación Eléctrica Residencial', tipo: 'Servicio', tipoBadge: 'bg-purple-50 text-purple-600 border-purple-200', precio: 'US$4,500.00' },
  { id: 2003, nombre: 'Varilla de Acero 3/8"', tipo: 'Producto', tipoBadge: 'bg-blue-50 text-blue-600 border-blue-200', precio: 'US$180.50' },
  { id: 2004, nombre: 'Mantenimiento Preventivo A/C', tipo: 'Servicio', tipoBadge: 'bg-purple-50 text-purple-600 border-purple-200', precio: 'US$1,200.00' },
  { id: 2005, nombre: 'Pintura Vinílica Blanca 1 gal', tipo: 'Producto', tipoBadge: 'bg-blue-50 text-blue-600 border-blue-200', precio: 'US$620.00' },
  { id: 2006, nombre: 'Consultoría de Diseño Arquitectónico', tipo: 'Servicio', tipoBadge: 'bg-purple-50 text-purple-600 border-purple-200', precio: 'US$8,500.00' },
  { id: 2007, nombre: 'Bloque de Concreto 6"', tipo: 'Producto', tipoBadge: 'bg-blue-50 text-blue-600 border-blue-200', precio: 'US$55.00' },
  { id: 2008, nombre: 'Reparación de Plomería', tipo: 'Servicio', tipoBadge: 'bg-purple-50 text-purple-600 border-purple-200', precio: 'US$950.00' },
];

export default function Inventario() {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Cabecera y Botón Nuevo */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Inventario</h1>
          <p className="text-sm text-slate-500">Catálogo de productos y servicios disponibles.</p>
        </div>
        <button 
          onClick={() => navigate('/inventario/nuevo')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Nuevo Ítem
        </button>
      </div>

      {/* Tarjetas de Métricas (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Total de Productos Agregados</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-0.5">4</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Total de Servicios Agregados</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-0.5">4</h3>
          </div>
        </div>
      </div>

      {/* Tabla de Inventario */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">ID / SKU</th>
                <th className="py-4 px-6">Nombre del Producto/Servicio</th>
                <th className="py-4 px-6">Tipo</th>
                <th className="py-4 px-6">Precio Base</th>
                <th className="py-4 px-6 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {mockInventario.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-800">{item.id}</td>
                  <td className="py-4 px-6 text-slate-700 font-medium">{item.nombre}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${item.tipoBadge}`}>
                      {item.tipo}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-800">{item.precio}</td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors ml-auto block">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}







