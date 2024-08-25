import React, { useEffect, useState } from "react";
import {
    X,
    PackageSearch,
    Menu,
    LetterText,
    Pickaxe,
    Factory,
} from "lucide-react";
import {
    Drawer,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
} from "@material-tailwind/react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function Common() {
    const [pathname, setPathname] = useState(false);
    const [open, setOpen] = useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setPathname(location.pathname);
    }, [location]);

    return (
        <div id="Common" className="w-full h-full flex flex-col">
            <Drawer
                open={open}
                onClose={closeDrawer}
                className="w-[370px] !max-w-none z-[10000]"
            >
                <div className="mb-2 flex items-center justify-between p-4">
                    <Typography variant="h5" color="blue-gray">
                        {" "}
                    </Typography>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <X /> : <Menu />}
                    </IconButton>
                </div>
                <List>
                    <ListItem
                        onClick={() => navigate("/common/mines")}
                        selected={pathname == "/common/mines"}
                    >
                        <ListItemPrefix>
                            <Pickaxe />
                        </ListItemPrefix>
                        <span>Madenler</span>
                        {!open && (
                            <ListItemSuffix>
                                <Pickaxe />
                            </ListItemSuffix>
                        )}
                    </ListItem>
                    <ListItem
                        onClick={() => navigate("/common/facilities")}
                        selected={pathname == "/common/facilities"}
                    >
                        <ListItemPrefix>
                            <Factory />
                        </ListItemPrefix>
                        <span>Fabrikalar</span>
                        {!open && (
                            <ListItemSuffix>
                                <Factory />
                            </ListItemSuffix>
                        )}
                    </ListItem>
                    <ListItem
                        onClick={() => navigate("/common/products")}
                        selected={pathname == "/common/products"}
                    >
                        <ListItemPrefix>
                            <PackageSearch />
                        </ListItemPrefix>
                        <span>Ürünler</span>
                        {!open && (
                            <ListItemSuffix>
                                <PackageSearch />
                            </ListItemSuffix>
                        )}
                    </ListItem>
                </List>
            </Drawer>
            <div className="w-full h-[94vh]">
                <Outlet />
            </div>
        </div>
    );
}
