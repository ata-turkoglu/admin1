import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Common from "./pages/Common";
import Products from "./pages/Products";
import Contents from "./pages/Contents";
import Mines from "./pages/Mines";
import Facilities from "./pages/Facilities";
import Website from "./pages/Website";

export default function App() {
    return (
        <div className="w-full h-full">
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path="common" element={<Common />}>
                        <Route path="mines" element={<Mines />}></Route>
                        <Route path="products" element={<Products />}></Route>
                        <Route
                            path="facilities"
                            element={<Facilities />}
                        ></Route>
                    </Route>
                    <Route path="website" element={<Website />}>
                        <Route path="contents" element={<Contents />}></Route>
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}
