import Auth from "./sections/Auth"
import { Route, Routes} from "react-router-dom"

export default function App(){
    return(
        <>
            <Routes>
                <Route path="/" element={<Auth/>} />
             </Routes>
        </>
    );
}