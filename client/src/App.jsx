import { Route, Routes} from "react-router-dom"

import Auth from "./sections/Auth"
import Businesses from "./sections/Businesses";

export default function App(){
    return(
        <>
            <Routes>
                <Route path="/" element={<Auth/>} />
                <Route path="/businesses" element={<Businesses/>} />
             </Routes>
        </>
    );
}