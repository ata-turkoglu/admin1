import React, { useState } from "react";
import {
    Option,
    Select,
    Collapse,
    List,
    ListItem,
    Card,
    Input,
    ListItemSuffix,
    Textarea,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { Trash2, CirclePlus, CircleMinus } from "lucide-react";

export default function Facilities() {
    const [openNewInput, setOpenNewInput] = useState(false);
    const [newFacilityName, setNewFacilityName] = useState("");
    const [facilityName, setFacilityName] = useState("");
    const [dialogState, setDialogState] = useState(false);
    const toggleOpenNewInput = () => setOpenNewInput((cur) => !cur);
    const handleDialogState = () => setDialogState(!dialogState);

    const deleteFacility = (facilityId) => {
        handleDialogState();
    };

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
                        <Select label="Madenler" size="md">
                            <Option>Sart</Option>
                            <Option>Yeniköy</Option>
                            <Option>Küner</Option>
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
                                        value={newFacilityName}
                                        onChange={(e) =>
                                            setNewFacilityName(e.target.value)
                                        }
                                    />
                                </div>
                            </Collapse>
                        </div>
                        <List className="w-full h-full overflow-auto">
                            <ListItem>
                                <span>Altın</span>
                                <ListItemSuffix>
                                    <Trash2
                                        size={18}
                                        onClick={() => deleteFacility(1)}
                                    />
                                </ListItemSuffix>
                            </ListItem>
                            <ListItem>
                                <span>Agrega</span>
                                <ListItemSuffix>
                                    <Trash2
                                        size={18}
                                        onClick={() => deleteFacility(1)}
                                    />
                                </ListItemSuffix>
                            </ListItem>
                            <ListItem>
                                <span>Kuvars</span>
                                <ListItemSuffix>
                                    <Trash2
                                        size={18}
                                        onClick={() => deleteFacility(1)}
                                    />
                                </ListItemSuffix>
                            </ListItem>
                            <ListItem>
                                <span>Ağır Mineraller</span>
                                <ListItemSuffix>
                                    <Trash2
                                        size={18}
                                        onClick={() => deleteFacility(1)}
                                    />
                                </ListItemSuffix>
                            </ListItem>
                            <ListItem>
                                <span>Beton</span>
                                <ListItemSuffix>
                                    <Trash2
                                        size={18}
                                        onClick={() => deleteFacility(1)}
                                    />
                                </ListItemSuffix>
                            </ListItem>
                            <ListItem>
                                <span>Beton</span>
                                <ListItemSuffix>
                                    <Trash2
                                        size={18}
                                        onClick={() => deleteFacility(1)}
                                    />
                                </ListItemSuffix>
                            </ListItem>
                        </List>
                    </Card>
                </div>
            </div>

            {/* Inputs (TR)*/}
            <div className="w-full h-full flex flex-col row-span-6">
                <div className="mb-6">
                    <Input
                        label="Fabrika İsmi"
                        value={openNewInput ? newFacilityName : facilityName}
                        onChange={(e) => {
                            setFacilityName(e.target.value);
                        }}
                        disabled={openNewInput}
                    />
                </div>
                <div className="w-full mb-6">
                    <Select label="Maden">
                        <Option>Sart</Option>
                        <Option>Yeniköy</Option>
                        <Option>Küner</Option>
                    </Select>
                </div>
                <div className="flex flex-1 mb-6">
                    <Textarea label="Bilgi" className="min-h-52 flex flex-1" />
                </div>
            </div>

            {/* Inputs (EN)*/}
            <div className="w-full h-full flex flex-col row-span-6">
                <div className="mb-6">
                    <Input
                        label="Facility Name"
                        value={openNewInput ? newFacilityName : facilityName}
                        onChange={(e) => {
                            setFacilityName(e.target.value);
                        }}
                        disabled={openNewInput}
                    />
                </div>
                <div className="w-full mb-6">
                    <Select label="Mine">
                        <Option>Sart</Option>
                        <Option>Yeniköy</Option>
                        <Option>Küner</Option>
                    </Select>
                </div>
                <div className="flex flex-1 mb-6">
                    <Textarea
                        label="Description"
                        className="min-h-52 flex flex-1"
                    />
                </div>
            </div>

            {/* Location */}
            <div className="w-full row-span-11">
                <Card className="w-full h-full flex items-center justify-center p-6">
                    Map
                </Card>
            </div>

            {/* BgImage */}
            <div class="col-span-2 row-span-6">
                <Card className="w-full h-full flex items-center justify-center p-6">
                    BgImage
                </Card>
            </div>

            <div className="w-full">
                <Button
                    className="w-full bg-[#1e40af]"
                    disabled={!facilityName}
                    size="sm"
                >
                    {openNewInput ? "Ekle" : "Güncelle"}
                </Button>
            </div>

            <Dialog open={dialogState} handler={handleDialogState} size="xs">
                <DialogHeader>Dikkat</DialogHeader>
                <DialogBody>
                    Madeni silmek istediğinize emin misiniz?
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="gray"
                        onClick={handleDialogState}
                        className="mr-1"
                    >
                        <span>Hayır</span>
                    </Button>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleDialogState}
                    >
                        <span>Evet</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}
