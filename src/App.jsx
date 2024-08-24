import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Common from "./pages/Common";
import Products from "./pages/Products";
import Mines from "./pages/Mines";
import Facilities from "./pages/Facilities";
import Website from "./pages/Website";
import MainPage from "./pages/MainPage";
import About from "./pages/About";
import Contact from "./pages/Contact";

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
                        <Route path="main" element={<MainPage />}></Route>
                        <Route path="about" element={<About />}></Route>
                        <Route path="contact" element={<Contact />}></Route>
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}
