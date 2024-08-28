import React, {
    useState,
    useLayoutEffect,
    useEffect,
    memo,
    useRef,
} from "react";
import {
    Option,
    Select,
    Collapse,
    List,
    ListItem,
    Card,
    Input,
    Textarea,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Spinner,
} from "@material-tailwind/react";
import { Trash2, CirclePlus, CircleMinus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
    getFacilities,
    addEditFacility,
    deleteFacility,
} from "../store/reducers/facilities";
import { getMines } from "../store/reducers/mines";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import marker from "/assets/marker-icon.png";
import { Icon } from "leaflet";
const myIcon = new Icon({
    iconUrl: marker,
    iconSize: [25, 41],
});

let deleteDialogResolve;

export default function Facilities() {
    const [openNewInput, setOpenNewInput] = useState(false);
    const [dialogState, setDialogState] = useState(false);
    const [btnSpinner, setBtnSpinner] = useState();

    const [selectedFacilityId, setSelectedFacilityId] = useState(null);
    const [selectedMine, setSelectedMine] = useState(0);
    const [filteredMine, setFilteredMine] = useState({
        mineId: null,
        mineName_tr: "Hepsi",
    });

    const [facilityName_tr, setFacilityName_tr] = useState("");
    const [facilityName_en, setFacilityName_en] = useState("");
    const [description_tr, setDescription_tr] = useState("");
    const [description_en, setDescription_en] = useState("");
    const [bgImage, setBgImage] = useState(null);
    const [images, setImages] = useState(null);

    const [location, setLocation] = useState(null);

    const mapRef = useRef();

    const dispatch = useDispatch();

    const facilitiesData = useSelector(
        (state) => state.facilitySlice.facilities
    );
    const [filteredFacilities, setFilteredFacilities] = useState([]);
    const minesData = useSelector((state) => state.mineSlice.mines);

    const toggleOpenNewInput = () =>
        setOpenNewInput((cur) => {
            setSelectedFacilityId(null);
            if (!cur) {
                setFacilityName_tr("");
                setFacilityName_en("");
                setDescription_tr("");
                setDescription_en("");
                setBgImage("");
                setImages(null);
                setLocation(null);
            }
            mapRef.current.flyTo({ lat: 38.4891, lng: 28.0212 }, 7);
            return !cur;
        });

    const selectFacility = (facilityId) => {
        setOpenNewInput(false);

        const foundFacility = facilitiesData.find(
            (item) => item.facilityId == facilityId
        );

        const foundMine = minesData.find(
            (mine) => mine.mineId == foundFacility.mineId
        );

        setSelectedFacilityId(foundFacility.facilityId);
        setSelectedMine(foundMine);

        setFacilityName_tr(foundFacility.facilityName_tr);
        setFacilityName_en(foundFacility.facilityName_en);

        setDescription_tr(foundFacility.description_tr);
        setDescription_en(foundFacility.description_en);

        setLocation(foundMine.location);
        mapRef.current.flyTo(foundMine.location, 15);
    };

    const deleteHandle = (facilityId) => {
        new Promise((resolve) => {
            setDialogState(true);
            deleteDialogResolve = resolve;
        }).then((state) => {
            if (state) {
                dispatch(deleteFacility(facilityId)).then(({ payload }) => {
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
            facilityId: selectedFacilityId,
            mineId: selectedMine.mineId,
            facilityName_tr,
            facilityName_en,
            description_tr,
            description_en,
            bgImage,
            images,
        };
        dispatch(addEditFacility(data)).then(({ payload }) => {
            setOpenNewInput(false);
            setSelectedMine(0);
            setFacilityName_tr("");
            setFacilityName_en("");
            setDescription_tr("");
            setDescription_en("");
            setBgImage(null);
            setImages(null);
            setBtnSpinner(false);
        });
    };

    const validation = () => {
        return (
            selectedMine.mineId != null &&
            facilityName_tr != "" &&
            facilityName_en != null
        );
    };

    useLayoutEffect(() => {
        if (minesData.length <= 0) {
            dispatch(getMines());
        }
        dispatch(getFacilities());
    }, []);

    useEffect(() => {
        if (filteredMine.mineId == null) {
            setFilteredFacilities(facilitiesData);
        } else {
            const filtered = facilitiesData.filter(
                (item) => item.mineId == filteredMine.mineId
            );
            setFilteredFacilities(filtered);
        }
    }, [filteredMine, facilitiesData]);

    function DeleteDialog() {
        return (
            <Dialog open={true} handler={() => setDialogState(false)} size="xs">
                <DialogHeader>Dikkat</DialogHeader>
                <DialogBody>
                    Fabrikayı silmek istediğinize emin misiniz?
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

    return (
        <div
            id="Facilities"
            className="w-full h-full md:p-10 grid grid-cols-4 grid-rows-12 gap-10"
        >
            {/* list */}
            <div className="w-full h-full flex flex-col justify-between row-span-12">
                <Card className="p-3 mb-6 border border-blue-gray-200 shadow-none">
                    <span>Fabrika Filtrele</span>
                    <hr className="mb-4 mt-2" />
                    <div className="w-full">
                        <Select
                            label="Madenler"
                            size="md"
                            value={filteredMine.mineName_tr}
                        >
                            <Option
                                onClick={() =>
                                    setFilteredMine({
                                        mineId: null,
                                        mineName_tr: "Hepsi",
                                    })
                                }
                            >
                                Hepsi
                            </Option>
                            ;
                            {minesData.map((mine, index) => {
                                return (
                                    <Option
                                        key={index}
                                        onClick={() => setFilteredMine(mine)}
                                    >
                                        {mine.mineName_tr}
                                    </Option>
                                );
                            })}
                        </Select>
                    </div>
                </Card>

                <div className="w-full h-5/6">
                    <Card className="w-full h-full  border border-blue-gray-200 shadow-none">
                        <div className="w-full flex item-center justify-center p-3">
                            <span className="text-center font-semibold text-xl">
                                Fabrikalar
                            </span>
                        </div>
                        <hr />
                        <div className="flex mx-4 mt-3 h-14 items-center justify-between">
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
                                        label="Yeni Fabrika İsmi"
                                        size="md"
                                        value={facilityName_tr}
                                        onChange={(e) =>
                                            setFacilityName_tr(e.target.value)
                                        }
                                    />
                                </div>
                            </Collapse>
                        </div>
                        <List className="w-full h-full overflow-auto">
                            {filteredFacilities.map((facility, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between"
                                    >
                                        <ListItem
                                            selected={
                                                selectedFacilityId ==
                                                facility.facilityId
                                            }
                                            onClick={() =>
                                                selectFacility(
                                                    facility.facilityId
                                                )
                                            }
                                        >
                                            <span>
                                                {facility.facilityName_tr}
                                            </span>
                                        </ListItem>
                                        <Trash2
                                            size={18}
                                            className="cursor-pointer mx-3"
                                            onClick={() =>
                                                deleteHandle(
                                                    facility.facilityId
                                                )
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </List>
                    </Card>
                </div>
            </div>

            {/* Inputs (TR)*/}
            <div className="w-full h-full flex flex-col row-span-6">
                <div className="mb-6">
                    <Input
                        label="Fabrika İsmi"
                        value={facilityName_tr}
                        onChange={(e) => {
                            setFacilityName_tr(e.target.value);
                        }}
                        disabled={openNewInput}
                    />
                </div>
                <div className="w-full mb-6">
                    <Select label="Maden" value={selectedMine.mineName_tr}>
                        {minesData.map((mine, index) => {
                            return (
                                <Option
                                    key={index}
                                    onClick={() => setSelectedMine(mine)}
                                >
                                    {mine.mineName_tr}
                                </Option>
                            );
                        })}
                    </Select>
                </div>
                <div className="flex flex-1 mb-6">
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
                <div className="mb-6">
                    <Input
                        label="Facility Name"
                        value={facilityName_en}
                        onChange={(e) => {
                            setFacilityName_en(e.target.value);
                        }}
                    />
                </div>
                <div className="w-full mb-6">
                    <Select
                        label="Mine"
                        disabled
                        value={selectedMine.mineName_tr}
                    >
                        <Option>Sart</Option>
                        <Option>Yeniköy</Option>
                        <Option>Küner</Option>
                    </Select>
                </div>
                <div className="flex flex-1 mb-6">
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
            <div className="w-full row-span-11">
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
                        {location && (
                            <Marker position={location} icon={myIcon}></Marker>
                        )}
                    </MapContainer>
                </Card>
            </div>

            {/* BgImage */}
            <div className="col-span-2 row-span-6">
                <Card className="w-full h-full flex items-center justify-center p-6">
                    BgImage
                </Card>
            </div>

            <div className="w-full">
                <Button
                    className="w-full bg-[#1e40af] flex items-center justify-center"
                    disabled={!setFacilityName_tr || !validation()}
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
