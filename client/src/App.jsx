import { Route, Routes} from "react-router-dom"
//import BottomNavBar from './components/BottomNavBar'

import Auth from "./sections/Auth"
import Home from "./sections/Home"

import Businesses from "./sections/Businesses";
import Admin from './sections/admin/Admin'

export default function App(){
    return(
        <>
            
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/auth" element={<Auth/>} />
                <Route path="/businesses" element={<Businesses/>} />
                
                <Route path="/admin" element={<Admin/>}/>

             </Routes>
        </>
    );
}