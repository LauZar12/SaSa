import { Route, Routes} from "react-router-dom"

import Auth from "./sections/Auth"
import Home from "./sections/Home"

import Businesses from "./sections/Businesses";

export default function App(){
    return(
        <>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/auth" element={<Auth/>} />
                <Route path="/businesses" element={<Businesses/>} />
             </Routes>
        </>
    );
}