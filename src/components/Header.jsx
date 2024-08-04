import React from "react";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

function NavList() {
    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography as="li" color="blue-gray" className="p-1 font-semibold">
                <Link
                    to="/common"
                    className="flex items-center hover:text-blue-500 transition-colors"
                >
                    Genel
                </Link>
            </Typography>
            <Typography as="li" color="blue-gray" className="p-1 font-semibold">
                <Link
                    to="/website"
                    className="flex items-center hover:text-blue-500 transition-colors"
                >
                    Websitesi
                </Link>
            </Typography>
            <Typography as="li" color="blue-gray" className="p-1 font-semibold">
                <a
                    href="#"
                    className="flex items-center hover:text-blue-500 transition-colors"
                >
                    Üretim
                </a>
            </Typography>
            <Typography as="li" color="blue-gray" className="p-1 font-semibold">
                <a
                    href="#"
                    className="flex items-center hover:text-blue-500 transition-colors"
                >
                    Kullanıcılar
                </a>
            </Typography>
        </ul>
    );
}

export default function Header() {
    const [openNav, setOpenNav] = React.useState(false);

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <Navbar className="w-full min-w-full h-[6vh] px-6 py-3 bg-blue-gray-50 m-0 !rounded-none border-none">
            <div className="flex items-center justify-between text-blue-gray-900">
                {/* <Typography
                    as="a"
                    href="#"
                    variant="h6"
                    className="mr-4 cursor-pointer py-1.5"
                >
                    <Menu />
                </Typography> */}
                <div>{""}</div>
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? <X /> : <Menu />}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList />
            </Collapse>
        </Navbar>
    );
}
