import React, { useLayoutEffect, useState, useRef } from "react";
import {
    List,
    ListItem,
    Card,
    Input,
    Button,
    Textarea,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Collapse,
    Spinner,
} from "@material-tailwind/react";
import { Trash2, CirclePlus, CircleMinus } from "lucide-react";
import { getMines, addEditMine, deleteMine } from "../store/reducers/mines";
import { useDispatch, useSelector } from "react-redux";
import {
    MapContainer,
    TileLayer,
    useMapEvents,
    Marker,
    Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

let deleteDialogResolve;

export default function Mines() {
    const [dialogState, setDialogState] = useState(false);
    const [openNewInput, setOpenNewInput] = useState(false);
    const [btnSpinner, setBtnSpinner] = useState();

    const [selectedMineId, setSelectedMineId] = useState(null);

    const [mineName_tr, setMineName_tr] = useState("");
    const [mineName_en, setMineName_en] = useState("");
    const [description_tr, setDescription_tr] = useState("");
    const [description_en, setDescription_en] = useState("");
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [location, setLocation] = useState(null);
    const [bgImage, setBgImage] = useState(null);
    const [images, setImages] = useState(null);

    const mapRef = useRef(null);

    const dispatch = useDispatch();

    const minesData = useSelector((state) => state.mineSlice.mines);

    const toggleOpenNewInput = () =>
        setOpenNewInput((cur) => {
            setSelectedMineId(null);
            if (!cur) {
                setMineName_tr("");
                setDescription_tr("");
                setMineName_en("");
                setDescription_en("");
                setBgImage("");
                setImages(null);
                setProvince("");
                setDistrict("");
                setLocation(null);
                mapRef.current.flyTo([38.4891, 28.0212], 7);
            }
            return !cur;
        });

    const selectMine = (mineId) => {
        setOpenNewInput(false);
        const foundMine = minesData.find((item) => item.mineId == mineId);
        setSelectedMineId(foundMine.mineId);

        setMineName_tr(foundMine.mineName_tr);
        setDescription_tr(foundMine.description_tr);

        setMineName_en(foundMine.mineName_en);
        setDescription_en(foundMine.description_en);

        setProvince(foundMine.province);
        setDistrict(foundMine.district);
        setLocation(foundMine.location);
        mapRef.current.flyTo(foundMine.location, 15);
    };

    const deleteHandle = (mineId) => {
        new Promise((resolve) => {
            setDialogState(true);
            deleteDialogResolve = resolve;
        }).then((state) => {
            if (state) {
                dispatch(deleteMine(mineId)).then(({ payload }) => {
                    if (payload.status) {
                        console.log("deleted");
                        setDialogState(false);
                    } else {
                        console.log("error delete");
                        setDialogState(false);
                    }
                });
            } else {
                console.log("error delete");
                setDialogState(false);
            }
        });
    };

    const save = () => {
        setBtnSpinner(true);
        const data = {
            mineId: selectedMineId,
            mineName_tr,
            mineName_en,
            description_tr,
            description_en,
            bgImage,
            images,
            province,
            district,
            location,
        };
        dispatch(addEditMine(data)).then(({ payload }) => {
            setBtnSpinner(false);
        });
    };

    useLayoutEffect(() => {
        dispatch(getMines());
    }, []);

    function DeleteDialog() {
        return (
            <Dialog open={true} handler={() => setDialogState(false)} size="xs">
                <DialogHeader>Dikkat</DialogHeader>
                <DialogBody>
                    Madeni silmek istediğinize emin misiniz?
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="gray"
                        onClick={() => deleteDialogResolve(false)}
                        className="mr-1"
                    >
                        <span>Hayır</span>
                    </Button>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => deleteDialogResolve(true)}
                    >
                        <span>Evet</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        );
    }

    function LocationMarker() {
        const map = useMapEvents({
            click(e) {
                setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
                map.flyTo(e.latlng, 15);
            },
        });

        return location === null ? null : (
            <Marker position={location}>
                <Popup>
                    <div className="flex flex-col">
                        <span>lat: {location.lat}</span>
                        <span>lng: {location.lng}</span>
                    </div>
                </Popup>
            </Marker>
        );
    }

    return (
        <div
            id="Mines"
            className="w-full h-full md:p-10 grid grid-cols-4 grid-rows-12 gap-10"
        >
            {/* list */}
            <div className="w-full h-full row-span-6">
                <Card className="w-full h-full border border-blue-gray-200 shadow-none">
                    <div className="w-full h-full overflow-auto">
                        <div className="w-full flex item-center justify-center p-3">
                            <span className="text-center font-semibold text-xl">
                                Madenler
                            </span>
                        </div>
                        <hr />
                        <div className="flex mx-4 mt-2 h-14 items-center justify-between">
                            {openNewInput ? (
                                <CircleMinus
                                    className="cursor-pointer"
                                    onClick={toggleOpenNewInput}
                                />
                            ) : (
                                <CirclePlus
                                    className="cursor-pointer"
                                    onClick={toggleOpenNewInput}
                                />
                            )}
                            <Collapse
                                open={openNewInput}
                                className="w-full flex items-center"
                            >
                                <div className="ml-3 flex-1 py-1">
                                    <Input
                                        label="Yeni Maden İsmi"
                                        size="md"
                                        value={mineName_tr}
                                        onChange={(e) =>
                                            setMineName_tr(e.target.value)
                                        }
                                    />
                                </div>
                            </Collapse>
                        </div>
                        <List className="w-full h-full">
                            {minesData.map((mine, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between"
                                    >
                                        <ListItem
                                            selected={
                                                selectedMineId == mine.mineId
                                            }
                                            onClick={() =>
                                                selectMine(mine.mineId)
                                            }
                                        >
                                            <span>{mine.mineName_tr}</span>
                                        </ListItem>
                                        <Trash2
                                            size={18}
                                            className="cursor-pointer mx-3"
                                            onClick={() =>
                                                deleteHandle(mine.mineId)
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </List>
                    </div>
                </Card>
            </div>

            {/* Inputs (TR)*/}
            <div className="w-full h-full flex flex-col row-span-6">
                <div className="mb-4">
                    <Input
                        label="Maden İsmi"
                        value={mineName_tr}
                        onChange={(e) => {
                            setMineName_tr(e.target.value);
                        }}
                        disabled={openNewInput}
                    />
                </div>
                <div className="flex flex-1">
                    <Textarea
                        label="Bilgi"
                        className="min-h-52 flex flex-1"
                        onChange={(e) => {
                            setDescription_tr(e.target.value);
                        }}
                        value={description_tr}
                    />
                </div>
            </div>

            {/* Inputs (EN)*/}
            <div className="w-full h-full flex flex-col row-span-6">
                <div className="mb-4">
                    <Input
                        label="Mine Name"
                        value={mineName_en}
                        onChange={(e) => {
                            setMineName_en(e.target.value);
                        }}
                    />
                </div>
                <div className="flex flex-1">
                    <Textarea
                        label="Description"
                        className="min-h-52 flex flex-1"
                        onChange={(e) => {
                            setDescription_en(e.target.value);
                        }}
                        value={description_en}
                    />
                </div>
            </div>

            {/* Location */}
            <div className="w-full flex flex-col row-span-11">
                <Card className="p-3 mb-4">
                    {" "}
                    <div className="mb-4">
                        <Input
                            label="İl"
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            label="İlçe"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                        />
                    </div>
                </Card>
                <Card className="w-full h-full flex items-center justify-center p-0 overflow-hidden">
                    <MapContainer
                        center={[38.4891, 28.0212]}
                        zoom={7}
                        ref={mapRef}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://tiles.stadiamaps.com/copyright">Stadia Maps</a> contributors'
                            url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg"
                        />
                        <LocationMarker />
                    </MapContainer>
                </Card>
            </div>

            {/* BgImage */}
            <div className="col-span-3 row-span-6">
                <Card className="w-full h-full flex items-center justify-center p-6">
                    BgImage
                </Card>
            </div>

            <div className="w-full">
                <Button
                    className="w-full bg-[#1e40af] flex items-center justify-center"
                    disabled={!mineName_tr}
                    size="sm"
                    onClick={() => save()}
                >
                    {btnSpinner ? (
                        <Spinner />
                    ) : openNewInput ? (
                        "Ekle"
                    ) : (
                        "Güncelle"
                    )}
                </Button>
            </div>

            {dialogState && <DeleteDialog />}
        </div>
    );
}
