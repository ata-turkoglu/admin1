import React, { useLayoutEffect } from "react";
import Header from "../components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home() {
    const navigate = useNavigate();
    const userStatus = useSelector((state) => state.userSlice.user.status);
    useLayoutEffect(() => {
        if (!userStatus) navigate("/login");
    }, [userStatus]);

    return (
        <div id="Home" className="w-full h-full flex flex-col md:pl-[70px]">
            {userStatus && (
                <>
                    <Header />
                    <Outlet />
                </>
            )}
        </div>
    );
}
