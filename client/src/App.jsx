import { Route, Routes } from "react-router-dom";

import Auth from "./sections/Auth";
import Home from "./sections/Home";
import Businesses from "./sections/Businesses";
import AdminDashboard from "./sections/AdminDashboard";
import Business from "./sections/Business";
import Donations from "./sections/Donations";
import Profile from "./sections/Profile";
import EditProduct from "./sections/EditProduct";
import MapV2 from "./sections/MapV2";
import BottomNavBar from "./components/BottomNavBar";

import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/businesses" element={<Businesses />} />
        <Route path="/profile/:userId" element={ <Profile />} />
        <Route
          path="/businesses/:businessId"
          element={<Business />} 
        />
        <Route path="/donations" element={<Donations />} />
        <Route 
          path="/admin/businesses/:businessId" 
          element={<AdminDashboard />} 
        />
        <Route 
          path="/admin/businesses/:businessId/products/:productId/edit-product" 
          element={<EditProduct />} 
        />
        <Route 
          path="/map" 
          element={
            <>
              <MapV2 />
              <BottomNavBar value={1} />
            </>  
          } 
        />
      </Routes>
    </>
  );
}
