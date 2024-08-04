import React, { useState } from "react";
import {
    Option,
    Select,
    Card,
    List,
    ListItem,
    ListItemSuffix,
    Collapse,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
    Textarea,
} from "@material-tailwind/react";
import { Trash2, CirclePlus, CircleMinus } from "lucide-react";

export default function Products() {
    const [openNewInput, setOpenNewInput] = useState(false);
    const [newProductName, setNewProductName] = useState("");
    const [productName, setProductName] = useState("");
    const [dialogState, setDialogState] = useState(false);
    const toggleOpenNewInput = () => setOpenNewInput((cur) => !cur);
    const handleDialogState = () => setDialogState(!dialogState);
    const deleteProduct = (facilityId) => {
        handleDialogState();
    };
    return (
        <div className="w-full h-full md:p-10 grid grid-cols-4 grid-rows-12 gap-10">
            {/* List */}
            <div className="flex flex-col row-span-12">
                <Card className="p-3 mb-6 border border-blue-gray-200 shadow-none">
                    <span>Ürün Filtrele</span>
                    <hr className="mb-4 mt-2" />
                    <div className="w-full mb-6">
                        <Select label="Maden Seç">
                            <Option>Sart</Option>
                            <Option>Yeniköy</Option>
                            <Option>Küner</Option>
                        </Select>
                    </div>
                    <div className="w-full">
                        <Select label="Fabrika Seç">
                            <Option>1</Option>
                            <Option>2</Option>
                            <Option>3</Option>
                            <Option>4</Option>
                        </Select>
                    </div>
                </Card>
                <div className="w-full h-5/6">
                    <Card className="w-full h-full border border-blue-gray-200 shadow-none">
                        <div className="w-full flex item-center justify-center p-3">
                            <span className="text-center font-semibold text-xl">
                                Ürünler
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
                                        value={newProductName}
                                        onChange={(e) =>
                                            setNewProductName(e.target.value)
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
                                        onClick={() => deleteProduct(1)}
                                    />
                                </ListItemSuffix>
                            </ListItem>
                            <ListItem>
                                <span>Agrega</span>
                                <ListItemSuffix>
                                    <Trash2
                                        size={18}
                                        onClick={() => deleteProduct(1)}
                                    />
                                </ListItemSuffix>
                            </ListItem>
                            <ListItem>
                                <span>Kuvars</span>
                                <ListItemSuffix>
                                    <Trash2
                                        size={18}
                                        onClick={() => deleteProduct(1)}
                                    />
                                </ListItemSuffix>
                            </ListItem>
                            <ListItem>
                                <span>Ağır Mineraller</span>
                                <ListItemSuffix>
                                    <Trash2
                                        size={18}
                                        onClick={() => deleteProduct(1)}
                                    />
                                </ListItemSuffix>
                            </ListItem>
                            <ListItem>
                                <span>Beton</span>
                                <ListItemSuffix>
                                    <Trash2
                                        size={18}
                                        onClick={() => deleteProduct(1)}
                                    />
                                </ListItemSuffix>
                            </ListItem>
                            <ListItem>
                                <span>Beton</span>
                                <ListItemSuffix>
                                    <Trash2
                                        size={18}
                                        onClick={() => deleteProduct(1)}
                                    />
                                </ListItemSuffix>
                            </ListItem>
                        </List>
                    </Card>
                </div>
            </div>

            {/* Inputs (TR) */}
            <div className="w-full h-full flex flex-col row-span-12">
                <div className="mb-6">
                    <Input
                        label="Ürün İsmi"
                        value={openNewInput ? newProductName : productName}
                        onChange={(e) => {
                            setProductName(e.target.value);
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
                <div className="w-full mb-6">
                    <Select label="Fabrika">
                        <Option>1</Option>
                        <Option>2</Option>
                        <Option>3</Option>
                        <Option>4</Option>
                    </Select>
                </div>
                <div className="flex flex-1 mb-6">
                    <Textarea label="Bilgi" className="min-h-52 flex flex-1" />
                </div>
                <div className="flex flex-1 mb-6">
                    <Textarea
                        label="Kullanım Alanları"
                        className="min-h-52 flex flex-1"
                    />
                </div>
                <div className="flex flex-1 mb-6">
                    <Textarea
                        label="Teknik Bilgiler"
                        className="min-h-52 flex flex-1"
                    />
                </div>
                <div>
                    <Input label="Website Linki" />
                </div>
            </div>

            {/* Inputs (EN) */}
            <div className="w-full h-full flex flex-col row-span-12">
                <div className="mb-6">
                    <Input
                        label="Product Name"
                        value={openNewInput ? newProductName : productName}
                        onChange={(e) => {
                            setProductName(e.target.value);
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
                <div className="w-full mb-6">
                    <Select label="Facility">
                        <Option>1</Option>
                        <Option>2</Option>
                        <Option>3</Option>
                        <Option>4</Option>
                    </Select>
                </div>
                <div className="flex flex-1 mb-6">
                    <Textarea
                        label="Description"
                        className="min-h-52 flex flex-1"
                    />
                </div>
                <div className="flex flex-1 mb-6">
                    <Textarea
                        label="Areas Of Usage"
                        className="min-h-52 flex flex-1"
                    />
                </div>
                <div className="flex flex-1 mb-6">
                    <Textarea
                        label="Technical Info"
                        className="min-h-52 flex flex-1"
                    />
                </div>
                <div>
                    <Input label="Website Link" />
                </div>
            </div>

            {/* Images */}
            <div className="w-full h-full flex flex-col row-span-11">
                <Card className="flex items-center justify-center p-6">
                    BgImage
                </Card>
            </div>

            <div className="w-full h-10">
                <Button
                    size="sm"
                    className="w-full bg-[#1e40af]"
                    disabled={!productName}
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
