import React, { useEffect, useState } from "react";
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
import { House, Menu, PencilLine, NotebookTabs, X } from "lucide-react";

export default function Website() {
    const [pathname, setPathname] = useState(null);
    const [open, setOpen] = useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setPathname(location.pathname);
    }, [location]);

    return (
        <div id="website" className="w-full h-full flex flex-col">
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
                        onClick={() => navigate("/website/main")}
                        selected={pathname == "/website/main"}
                    >
                        <ListItemPrefix>
                            <House />
                        </ListItemPrefix>
                        <span>Anasayfa</span>
                        {!open && (
                            <ListItemSuffix>
                                <House />
                            </ListItemSuffix>
                        )}
                    </ListItem>
                    <ListItem
                        onClick={() => navigate("/website/about")}
                        selected={pathname == "/website/about"}
                    >
                        <ListItemPrefix>
                            <PencilLine />
                        </ListItemPrefix>
                        <span>Hakkımızda</span>
                        {!open && (
                            <ListItemSuffix>
                                <PencilLine />
                            </ListItemSuffix>
                        )}
                    </ListItem>
                    {/* <ListItem
                        onClick={() => navigate("/website/contact")}
                        selected={pathname == "/website/contact"}
                    >
                        <ListItemPrefix>
                            <NotebookTabs />
                        </ListItemPrefix>
                        <span>İletişim</span>
                        {!open && (
                            <ListItemSuffix>
                                <NotebookTabs />
                            </ListItemSuffix>
                        )}
                    </ListItem> */}
                </List>
            </Drawer>
            <div className="w-full h-[94vh]">
                <Outlet />
            </div>
        </div>
    );
}
