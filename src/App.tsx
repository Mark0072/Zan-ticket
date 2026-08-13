import { HashRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Inicio from './pages/inicio/Inicio';
import Tickets from './pages/tickets/Tickets';
import CrearTicket from './pages/tickets/CrearTicket';
import Inventario from './pages/inventario/Inventario';
import CrearInventario from './pages/inventario/CrearInventario';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Inicio />} />
          
          {/* Ruta correcta para Tickets */}
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/tickets/nuevo" element={<CrearTicket />} />
          
          {/* Ruta correcta para Inventario */}
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/inventario/nuevo" element={<CrearInventario />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}