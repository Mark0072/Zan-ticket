import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase'; // Ajusta la ruta a tu archivo supabase.ts
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

export default function CrearTicket() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  // Estados simples para probar primero que la página carga
  const [formData, setFormData] = useState({ cliente: '', sla: '24h' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    try {
      const { error: dbError } = await supabase
        .from('tickets')
        .insert([{ 
          cliente: formData.cliente, 
          sla: formData.sla,
          estado: 'En Proceso' 
        }]);

      if (dbError) throw dbError;
      navigate('/tickets');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error al guardar');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200">
      <button onClick={() => navigate(-1)} className="mb-6 text-slate-500 flex items-center gap-1 hover:text-slate-800">
        <ArrowLeft size={20} /> Volver
      </button>

      <h1 className="text-2xl font-bold mb-6">Crear Nuevo Ticket</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Nombre del Cliente</label>
          <input 
            required
            className="w-full p-2 border border-slate-300 rounded-lg"
            value={formData.cliente}
            onChange={(e) => setFormData({...formData, cliente: e.target.value})}
          />
        </div>
        
        <button 
          disabled={cargando}
          type="submit" 
          className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-slate-400"
        >
          {cargando ? 'Guardando...' : 'Guardar Ticket'}
        </button>
      </form>
    </div>
  );
}