import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function CrearInventario() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: '', nombre: '', tipo: 'Producto', precio: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('inventario').insert([{ 
        id: Number(form.id), 
        nombre: form.nombre, 
        tipo: form.tipo, 
        precio: Number(form.precio) 
    }]);
    
    if (!error) navigate('/inventario');
    else alert('Error: ' + error.message);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-6 border rounded-2xl space-y-4">
        <h2 className="text-xl font-bold">Agregar al Inventario</h2>
        <input type="number" placeholder="ID/SKU" className="w-full p-2 border rounded-xl" onChange={(e) => setForm({...form, id: e.target.value})} />
        <input type="text" placeholder="Nombre" className="w-full p-2 border rounded-xl" onChange={(e) => setForm({...form, nombre: e.target.value})} />
        <select className="w-full p-2 border rounded-xl" onChange={(e) => setForm({...form, tipo: e.target.value})}>
          <option value="Producto">Producto</option>
          <option value="Servicio">Servicio</option>
        </select>
        <input type="number" placeholder="Precio" className="w-full p-2 border rounded-xl" onChange={(e) => setForm({...form, precio: e.target.value})} />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-xl">Guardar</button>
      </form>
    </div>
  );
}