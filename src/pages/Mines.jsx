import React, { useState } from "react";
import {
    List,
    ListItem,
    Card,
    Input,
    ListItemSuffix,
    Button,
    Textarea,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Collapse,
} from "@material-tailwind/react";
import { Trash2, CirclePlus, CircleMinus } from "lucide-react";

export default function Mines() {
    const [dialogState, setDialogState] = useState(false);
    const [openNewInput, setOpenNewInput] = useState(false);
    const [newMineName, setNewMineName] = useState("");
    const [mineName, setMineName] = useState("");
    const [mineDescription, setMineDescription] = useState("");
    const [mineLocation, setMineLocation] = useState("");
    const [mineBgImage, setMineBgImage] = useState("");

    const toggleOpenNewInput = () => setOpenNewInput((cur) => !cur);
    const handleDialogState = () => setDialogState(!dialogState);

    const deleteMine = (mineId) => {
        handleDialogState();
    };

    return (
        <div
            id="Mines"
            className="w-full h-full md:p-10 grid grid-cols-4 grid-rows-12 gap-10"
        >
            {/* list */}
            <div className="w-full h-full row-span-6">
                <Card className="w-full h-full border border-blue-gray-200 shadow-none">
                    <div className="w-full flex item-center justify-center p-3">
                        <span className="text-center font-semibold text-xl">
                            Madenler
                        </span>
                    </div>
                    <hr />
                    <div className="flex mx-3 h-14 items-center justify-between">
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
                                    value={newMineName}
                                    onChange={(e) =>
                                        setNewMineName(e.target.value)
                                    }
                                />
                            </div>
                        </Collapse>
                    </div>
                    <List className="w-full">
                        <ListItem>
                            <span>Sart</span>
                            <ListItemSuffix>
                                <Trash2
                                    size={18}
                                    onClick={() => deleteMine(1)}
                                />
                            </ListItemSuffix>
                        </ListItem>
                        <ListItem>
                            <span>Yeniköy</span>
                            <ListItemSuffix>
                                <Trash2
                                    size={18}
                                    onClick={() => deleteMine(1)}
                                />
                            </ListItemSuffix>
                        </ListItem>
                        <ListItem>
                            <span>Küner</span>
                            <ListItemSuffix>
                                <Trash2
                                    size={18}
                                    onClick={() => deleteMine(1)}
                                />
                            </ListItemSuffix>
                        </ListItem>
                    </List>
                </Card>
            </div>

            {/* Inputs (TR)*/}
            <div className="w-full h-full flex flex-col row-span-6">
                <div className="mb-6">
                    <Input
                        label="Maden İsmi"
                        value={openNewInput ? newMineName : mineName}
                        onChange={(e) => {
                            setMineName(e.target.value);
                        }}
                        disabled={openNewInput}
                    />
                </div>
                <div className="flex flex-1">
                    <Textarea label="Bilgi" className="min-h-52 flex flex-1" />
                </div>
            </div>

            {/* Inputs (EN)*/}
            <div className="w-full h-full flex flex-col row-span-6">
                <div className="mb-6">
                    <Input
                        label="Mine Name"
                        value={openNewInput ? newMineName : mineName}
                        onChange={(e) => {
                            setMineName(e.target.value);
                        }}
                        disabled={openNewInput}
                    />
                </div>
                <div className="flex flex-1">
                    <Textarea
                        label="Description"
                        className="min-h-52 flex flex-1"
                    />
                </div>
            </div>

            {/* Location */}
            <div className="w-full row-span-11">
                <Card className="w-full h-full flex items-center justify-center p-6">
                    Location
                </Card>
            </div>

            {/* BgImage */}
            <div class="col-span-3 row-span-6">
                <Card className="w-full h-full flex items-center justify-center p-6">
                    BgImage
                </Card>
            </div>

            <div className="w-full">
                <Button
                    className="w-full bg-[#1e40af]"
                    disabled={!mineName}
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
