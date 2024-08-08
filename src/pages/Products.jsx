import React, { useState, useEffect, useLayoutEffect } from "react";
import {
    Option,
    Select,
    Card,
    List,
    ListItem,
    Collapse,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
    Textarea,
    Spinner,
    Tooltip,
} from "@material-tailwind/react";
import { Trash2, CirclePlus, CircleMinus, CircleCheck } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { getMines } from "../store/reducers/mines";
import { getFacilities } from "../store/reducers/facilities";
import {
    getProducts,
    addEditProduct,
    deleteProduct,
} from "../store/reducers/products";

let deleteDialogResolve;

export default function Products() {
    const [openNewInput, setOpenNewInput] = useState(false);
    const [dialogState, setDialogState] = useState(false);
    const [btnSpinner, setBtnSpinner] = useState();
    const [newTechnicalTr, setNewTechnicalTr] = useState(false);
    const [newTechnicalEn, setNewTechnicalEn] = useState(false);

    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedMine, setSelectedMine] = useState(0);
    const [selectedFacility, setSelectedFacility] = useState(0);
    const [filteredMine, setFilteredMine] = useState({
        mineId: null,
        mineName_tr: "Hepsi",
    });
    const [filteredFacility, setFilteredFacility] = useState({
        facilityId: null,
        facilityName_tr: "Hepsi",
    });

    const [productName_tr, setProductName_tr] = useState("");
    const [productName_en, setProductName_en] = useState("");
    const [description_tr, setDescription_tr] = useState("");
    const [description_en, setDescription_en] = useState("");
    const [areasOfUsage_tr, setAreasOfUsage_tr] = useState(null);
    const [areasOfUsage_en, setAreasOfUsage_en] = useState(null);
    const [technicalInfo_tr, setTechnicalInfo_tr] = useState([]);
    const [technicalInfo_en, setTechnicalInfo_en] = useState([]);
    const [bgImage, setBgImage] = useState(null);
    const [images, setImages] = useState(null);
    const [link, setLink] = useState("");

    const dispatch = useDispatch();

    const minesData = useSelector((state) => state.mineSlice.mines);
    const facilitiesData = useSelector(
        (state) => state.facilitySlice.facilities
    );
    const productsData = useSelector((state) => state.productSlice.products);

    const [filteredFacilities, setFilteredFacilities] = useState(
        ...facilitiesData
    );
    const [filteredProducts, setFilteredProducts] = useState([]);

    const toggleOpenNewInput = () =>
        setOpenNewInput((cur) => {
            setSelectedProductId(null);
            if (!cur) {
                setProductName_tr("");
                setProductName_en("");
                setDescription_tr("");
                setDescription_en("");
                setAreasOfUsage_tr(null);
                setAreasOfUsage_en(null);
                setTechnicalInfo_tr([]);
                setTechnicalInfo_en([]);
                setBgImage(null);
                setImages(null);
                setLink("");
                setNewTechnicalTr(false);
                setNewTechnicalEn(false);
            }
            return !cur;
        });

    const selectProduct = (productId) => {
        setOpenNewInput(false);

        const foundProduct = productsData.find(
            (product) => product.productId == productId
        );
        const foundMine = minesData.find(
            (mine) => mine.mineId == foundProduct.mineId
        );
        const foundFacility = facilitiesData.find(
            (item) => item.facilityId == foundProduct.facilityId
        );

        setSelectedProductId(foundProduct.productId);
        setSelectedMine(foundMine);
        setSelectedFacility(foundFacility);

        setProductName_tr(foundProduct.productName_tr);
        setProductName_en(foundProduct.productName_en);

        setDescription_tr(foundProduct.description_tr);
        setDescription_en(foundProduct.description_en);

        setAreasOfUsage_tr(foundProduct.areasOfUsage_tr);
        setAreasOfUsage_en(foundProduct.areasOfUsage_en);

        setTechnicalInfo_tr(foundProduct.technicalInfo_tr);
        setTechnicalInfo_en(foundProduct.technicalInfo_en);

        setLink(foundProduct.link);
    };

    const validation = () => {
        return (
            selectedMine.mineId != null &&
            selectedFacility.facilityId != null &&
            productName_tr != "" &&
            productName_en != null
        );
    };

    const save = () => {
        setBtnSpinner(true);
        const data = {
            productId: selectedProductId,
            mineId: selectedMine.mineId,
            facilityId: selectedFacility.facilityId,
            productName_tr,
            productName_en,
            description_tr,
            description_en,
            areasOfUsage_tr,
            areasOfUsage_en,
            technicalInfo_tr: JSON.stringify(technicalInfo_tr),
            technicalInfo_en: JSON.stringify(technicalInfo_en),
            bgImage,
            images,
            link,
        };
        dispatch(addEditProduct(data)).then(({ payload }) => {
            setOpenNewInput(false);
            setSelectedMine(0);
            setSelectedFacility(0);
            setProductName_tr("");
            setProductName_en("");
            setDescription_tr("");
            setDescription_en("");
            setAreasOfUsage_tr(null);
            setAreasOfUsage_en(null);
            setTechnicalInfo_tr([]);
            setTechnicalInfo_en([]);
            setBgImage(null);
            setImages(null);
            setLink("");
            setNewTechnicalTr(false);
            setNewTechnicalEn(false);
            setBtnSpinner(false);
        });
    };

    useLayoutEffect(() => {
        if (minesData.length <= 0) {
            dispatch(getMines());
        }
        if (facilitiesData.length <= 0) {
            dispatch(getFacilities());
        }
        dispatch(getProducts());
    }, []);

    useEffect(() => {
        const filtered = facilitiesData.filter(
            (item) => item.mineId == filteredMine.mineId
        );

        if (filteredMine.mineId == null) {
            setFilteredFacilities(facilitiesData);
        } else {
            setFilteredFacilities(filtered);
        }
    }, [filteredMine, productsData]);

    useEffect(() => {
        if (filteredFacility.facilityId == null) {
            setFilteredProducts(productsData);
        } else {
            const filtered = productsData.filter(
                (item) => item.mineId == filteredFacility.facilityId
            );
            setFilteredProducts(filtered);
        }
    }, [filteredFacility, productsData]);

    const handleTechnical = (lang, key, value, func) => {
        const jsonKey = document.getElementById(key).value;
        const jsonVal = document.getElementById(value).value;

        if (lang == "tr") {
            setTechnicalInfo_tr((e) => [...e, { [jsonKey]: jsonVal }]);
        } else if (lang == "en") {
            setTechnicalInfo_en((e) => [...e, { [jsonKey]: jsonVal }]);
        }

        func(false);
        document.getElementById(key).value = null;
        document.getElementById(value).value = null;
    };

    const deleteHandle = (productId) => {
        new Promise((resolve) => {
            setDialogState(true);
            deleteDialogResolve = resolve;
        }).then((state) => {
            if (state) {
                dispatch(deleteProduct(productId)).then(({ payload }) => {
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

    const deleteItem = (indx, list, func) => {
        let nlist = [...list];
        nlist.splice(indx, 1);
        func(nlist);
    };

    function ObjectList({ list, deleteItem }) {
        let keys = [];
        let values = [];
        list.forEach((el) => {
            keys.push(...Object.keys(el));
            values.push(...Object.values(el));
        });

        return (
            <div className="flex flex-col px-3 mt-1 h-full">
                {keys.map((key, index) => {
                    return (
                        <div
                            key={index}
                            className="w-full flex items-center justify-between"
                        >
                            <div className="pl-2 w-2/5 text-sm py-1 overflow-hidden">
                                <Tooltip content={key}>
                                    <span className="truncate">{key}</span>
                                </Tooltip>
                            </div>
                            <div className="pl-2 w-2/5 text-sm py-1 overflow-hidden">
                                <Tooltip content={values[index]}>
                                    <span className="truncate">
                                        {values[index]}
                                    </span>
                                </Tooltip>
                            </div>
                            <CircleMinus
                                className="text-blue-gray-500 cursor-pointer"
                                size={16}
                                onClick={() => deleteItem(index)}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="w-full h-full md:p-10 grid grid-cols-4 grid-rows-12 gap-10">
            {/* List */}
            <div className="flex flex-col row-span-12">
                <Card className="p-3 mb-6 border border-blue-gray-200 shadow-none">
                    <span>Ürün Filtrele</span>
                    <hr className="mb-4 mt-2" />
                    <div className="w-full mb-6">
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
                    <div className="w-full">
                        {filteredFacilities && (
                            <Select
                                label="Fabrikalar"
                                size="md"
                                value={filteredFacility.facilityName_tr}
                            >
                                <Option
                                    onClick={() =>
                                        setFilteredFacility({
                                            facilityId: null,
                                            facilityName_tr: "Hepsi",
                                        })
                                    }
                                >
                                    Hepsi
                                </Option>
                                ;
                                {filteredFacilities.map((facility, index) => {
                                    return (
                                        <Option
                                            key={index}
                                            onClick={() =>
                                                setFilteredFacility(facility)
                                            }
                                        >
                                            {facility.facilityName_tr}
                                        </Option>
                                    );
                                })}
                            </Select>
                        )}
                    </div>
                </Card>
                <div className="w-full h-5/6">
                    <Card className="w-full h-full  border border-blue-gray-200 shadow-none">
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
                                        value={productName_tr}
                                        onChange={(e) =>
                                            setProductName_tr(e.target.value)
                                        }
                                    />
                                </div>
                            </Collapse>
                        </div>
                        <List className="w-full h-full overflow-auto">
                            {filteredProducts.map((product, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between"
                                    >
                                        <ListItem
                                            selected={
                                                selectedProductId ==
                                                product.productId
                                            }
                                            onClick={() =>
                                                selectProduct(product.productId)
                                            }
                                        >
                                            <span>
                                                {product.productName_tr}
                                            </span>
                                        </ListItem>
                                        <Trash2
                                            size={18}
                                            className="cursor-pointer mx-3"
                                            onClick={() =>
                                                deleteHandle(product.productId)
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </List>
                    </Card>
                </div>
            </div>

            {/* Common */}
            <div className="w-full h-full grid grid-cols-2 col-span-2 row-span-2">
                <div className="pr-5">
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
                    <div className="w-full">
                        <Select
                            label="Fabrika"
                            value={selectedFacility.facilityName_tr}
                        >
                            {facilitiesData
                                .filter(
                                    (itm) => itm.mineId == selectedMine.mineId
                                )
                                .map((facility, index) => {
                                    return (
                                        <Option
                                            key={index}
                                            onClick={() =>
                                                setSelectedFacility(facility)
                                            }
                                        >
                                            {facility.facilityName_tr}
                                        </Option>
                                    );
                                })}
                        </Select>
                    </div>
                </div>
                <div className="pl-5">
                    <div className="mb-6">
                        <Input
                            label="Website Linki"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Images */}
            <div className="w-full h-full flex flex-col row-span-11">
                <Card className="flex items-center justify-center p-6">
                    BgImage
                </Card>
            </div>

            {/* Inputs (TR) */}
            <div className="w-full h-full flex flex-col row-span-10">
                <div className="mb-6">
                    <Input
                        label="Ürün İsmi"
                        value={productName_tr}
                        onChange={(e) => {
                            setProductName_tr(e.target.value);
                        }}
                        disabled={openNewInput}
                    />
                </div>
                <div className="flex flex-1 mb-6">
                    <Textarea
                        label="Bilgi"
                        className="min-h-52 flex flex-1"
                        value={description_tr}
                        onChange={(e) => setDescription_tr(e.target.value)}
                    />
                </div>
                <div className="flex flex-1 mb-6">
                    <Textarea
                        label="Kullanım Alanları"
                        className="min-h-52 flex flex-1"
                        value={areasOfUsage_tr || ""}
                        onChange={(e) => setAreasOfUsage_tr(e.target.value)}
                    />
                </div>
                <div className="flex flex-1">
                    <Card className="w-full min-h-52 flex flex-col flex-1 border border-blue-gray-200 shadow-none">
                        <div className="w-full p-3 flex justify-between">
                            <span className="text-sm text-blue-gray-500">
                                Teknik Bilgiler
                            </span>
                            <Tooltip content="Yeni Ekle">
                                <CirclePlus
                                    size="16"
                                    className="text-blue-gray-500 cursor-pointer"
                                    onClick={() => {
                                        setNewTechnicalTr((cur) => !cur);
                                    }}
                                />
                            </Tooltip>
                        </div>
                        <div className="w-full">
                            <Collapse
                                open={newTechnicalTr}
                                className="w-full flex items-center"
                            >
                                <div className="w-full px-3 flex items-center justify-between">
                                    <input
                                        id="technical-tr-key"
                                        type="text"
                                        className="border border-blue-gray-200 w-2/5 rounded-md mr-3 outline-none px-2 py-1 text-xs"
                                    />
                                    <input
                                        id="technical-tr-value"
                                        type="text"
                                        className="border border-blue-gray-200 w-2/5 rounded-md mr-3 outline-none px-2 py-1 text-xs"
                                    />
                                    <CircleCheck
                                        size={20}
                                        className="cursor-pointer text-blue-gray-500"
                                        onClick={() =>
                                            handleTechnical(
                                                "tr",
                                                "technical-tr-key",
                                                "technical-tr-value",
                                                setNewTechnicalTr
                                            )
                                        }
                                    />
                                </div>
                            </Collapse>
                        </div>
                        <ObjectList
                            list={technicalInfo_tr}
                            deleteItem={(e) =>
                                deleteItem(
                                    e,
                                    technicalInfo_tr,
                                    setTechnicalInfo_tr
                                )
                            }
                        />
                    </Card>
                </div>
            </div>

            {/* Inputs (EN) */}
            <div className="w-full h-full flex flex-col row-span-10">
                <div className="mb-6">
                    <Input
                        label="Product Name"
                        value={productName_en}
                        onChange={(e) => {
                            setProductName_en(e.target.value);
                        }}
                    />
                </div>
                <div className="flex flex-1 mb-6">
                    <Textarea
                        label="Description"
                        className="min-h-52 flex flex-1"
                        value={description_en}
                        onChange={(e) => setDescription_en(e.target.value)}
                    />
                </div>
                <div className="flex flex-1 mb-6">
                    <Textarea
                        label="Areas Of Usage"
                        className="min-h-52 flex flex-1"
                        value={areasOfUsage_en || ""}
                        onChange={(e) => setAreasOfUsage_en(e.target.value)}
                    />
                </div>
                <div className="flex flex-1">
                    <Card className="w-full min-h-52 flex flex-col flex-1 border border-blue-gray-200 shadow-none">
                        <div className="w-full p-3 flex justify-between">
                            <span className="text-sm text-blue-gray-500">
                                Technical Info
                            </span>
                            <Tooltip content="Yeni Ekle">
                                <CirclePlus
                                    size="16"
                                    className="text-blue-gray-500 cursor-pointer"
                                    onClick={() => {
                                        setNewTechnicalEn((cur) => !cur);
                                    }}
                                />
                            </Tooltip>
                        </div>
                        <div className="w-full">
                            <Collapse
                                open={newTechnicalEn}
                                className="w-full flex items-center"
                            >
                                <div className="w-full px-3 flex items-center justify-between">
                                    <input
                                        id="technical-en-key"
                                        type="text"
                                        className="border border-blue-gray-200 w-2/5 rounded-md mr-3 outline-none px-2 py-1 text-xs"
                                    />
                                    <input
                                        id="technical-en-value"
                                        type="text"
                                        className="border border-blue-gray-200 w-2/5 rounded-md mr-3 outline-none px-2 py-1 text-xs"
                                    />
                                    <CircleCheck
                                        size={20}
                                        className="cursor-pointer text-blue-gray-500"
                                        onClick={() =>
                                            handleTechnical(
                                                "en",
                                                "technical-en-key",
                                                "technical-en-value",
                                                setNewTechnicalEn
                                            )
                                        }
                                    />
                                </div>
                            </Collapse>
                        </div>
                        <ObjectList
                            list={technicalInfo_en}
                            deleteItem={(e) =>
                                deleteItem(
                                    e,
                                    technicalInfo_en,
                                    setTechnicalInfo_en
                                )
                            }
                        />
                    </Card>
                </div>
            </div>

            <div className="w-full h-10">
                <Button
                    className="w-full bg-[#1e40af] flex items-center justify-center"
                    disabled={!setProductName_tr || !validation()}
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
