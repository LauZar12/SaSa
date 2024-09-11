import { Route, Routes } from "react-router-dom";
import Auth from "./sections/Auth";
import Home from "./sections/Home";
import Businesses from "./sections/Businesses";
import AdminDashboard from "./sections/AdminDashboard"; // Importa tu componente del Admin Dashboard

export default function App() {
  // Definir businessId quemado para desarrollo
  const businessId = "business%231"; // Puedes cambiarlo según necesites

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/businesses" element={<Businesses />} />
        {/* Nueva ruta para el Admin Dashboard */}
        <Route
          path="/admin/businesses/:businessId"
          element={<AdminDashboard businessId={businessId} />} // Pasar el businessId como prop
        />
      </Routes>
    </>
  );
}