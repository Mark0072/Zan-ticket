import { HashRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Inicio from './pages/inicio/Inicio';
import Tickets from './pages/tickets/Tickets';
import Inventario from './pages/inventario/Inventario';
import CrearTicket from './pages/tickets/CrearTicket';
export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Layout principal que envuelve las vistas */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Inicio />} />
          <Route path="tickets" element={<Tickets />} />
          {/* Ruta exacta para el formulario de creación */}
          <Route path="tickets/crear" element={<CrearTicket />} />
          <Route path="inventario" element={<Inventario />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}