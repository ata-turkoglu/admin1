import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function Home() {
    return (
        <div id="Home" className="w-full h-full flex flex-col md:pl-[70px]">
            <Header />
            <Outlet />
        </div>
    );
}
