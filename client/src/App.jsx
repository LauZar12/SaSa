import { Route, Routes } from "react-router-dom";

import Auth from "./sections/Auth";
import Home from "./sections/Home";
import Businesses from "./sections/Businesses";
import AdminDashboard from "./sections/AdminDashboard";
import Business from "./sections/Business";
import EditProduct from "./sections/EditProduct";
import MapV2 from "./sections/MapV2";
import toast, { Toaster } from 'react-hot-toast';
import {APIProvider, Map} from '@vis.gl/react-google-maps';

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
          element={<Business />} 
        />
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
              <APIProvider apiKey={'AIzaSyBbOxklM1Vcm_wT6wzSnhKJa4LvR1jvYnk'}>
                <Map
                style={{width: '100vw', height: '100vh'}}
                defaultCenter={{lat: 22.54992, lng: 0}}
                defaultZoom={3}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                />
              </APIProvider>
              <MapV2 />
            </>  
          } 
        />
      </Routes>
    </>
  );
}
