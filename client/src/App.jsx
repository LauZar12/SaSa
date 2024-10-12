import { Route, Routes } from "react-router-dom";
import Auth from "./sections/Auth";
import Home from "./sections/Home";
import Businesses from "./sections/Businesses";
import AdminDashboard from "./sections/AdminDashboard"; // Importa tu componente del Admin Dashboard
import Business from "./sections/Business";
import EditProduct from "./sections/EditProduct";
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/businesses" element={<Businesses />} />
        <Route
          path="/businesses/:businessId"
          element={<Business />} // No pasar el businessId como prop
        />
        <Route 
          path="/admin/businesses/:businessId" 
          element={<AdminDashboard />} 
        />
        <Route 
          path="/admin/businesses/:businessId/products/:productId/edit-product" 
          element={<EditProduct />} 
        />
      </Routes>
    </>
  );
}
