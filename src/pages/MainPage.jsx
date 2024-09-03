import React, { useEffect, useLayoutEffect, useState } from "react";
import {
    Card,
    Collapse,
    Tooltip,
    Button,
    Spinner,
} from "@material-tailwind/react";
import { Trash2, CirclePlus, CircleMinus, CircleCheck } from "lucide-react";
import { getMainPageData, saveMainPageData } from "../store/reducers/mainPage";
import { useDispatch, useSelector } from "react-redux";

export default function MainPage() {
    const [newVideoTextTr, setNewVideoTextTr] = useState(false);
    const [videoTexts_tr, setVideoTexts_tr] = useState([]);
    const [newVideoTextEn, setNewVideoTextEn] = useState(false);
    const [videoTexts_en, setVideoTexts_en] = useState([]);

    const [newFacilitiesTextTr, setNewFacilitiesTextTr] = useState(false);
    const [facilitiesText_tr, setFacilitiesText_tr] = useState([]);
    const [newFacilitiesTextEn, setNewFacilitiesTextEn] = useState(false);
    const [facilitiesText_en, setFacilitiesText_en] = useState([]);
    const [facilitiesTextHeader_tr, setFacilitiesTextHeader_tr] = useState("");
    const [facilitiesTextHeader_en, setFacilitiesTextHeader_en] = useState("");

    const [newSustainTextTr, setNewSustainTextTr] = useState(false);
    const [sustainText_tr, setSustainText_tr] = useState([]);
    const [newSustainTextEn, setNewSustainTextEn] = useState(false);
    const [sustainText_en, setSustainText_en] = useState([]);
    const [sustainTextHeader_tr, setSustainTextHeader_tr] = useState("");
    const [sustainTextHeader_en, setSustainTextHeader_en] = useState("");

    const [btnSpinner, setBtnSpinner] = useState(false);

    const dispatch = useDispatch();

    const mainPageData = useSelector(
        (state) => state.mainPageSlice.mainPageData
    );

    useLayoutEffect(() => {
        if (mainPageData == null) {
            dispatch(getMainPageData());
        }
    }, []);

    useEffect(() => {
        if (mainPageData) {
            setVideoTexts_tr(mainPageData.videoTexts_tr);
            setVideoTexts_en(mainPageData.videoTexts_en);

            setFacilitiesText_tr(mainPageData.facilitiesText_tr);
            setFacilitiesText_en(mainPageData.facilitiesText_en);
            setFacilitiesTextHeader_tr(mainPageData.facilitiesTextHeader_tr);
            setFacilitiesTextHeader_en(mainPageData.facilitiesTextHeader_en);

            setSustainText_tr(mainPageData.sustainText_tr);
            setSustainText_en(mainPageData.sustainText_en);
            setSustainTextHeader_tr(mainPageData.sustainTextHeader_tr);
            setSustainTextHeader_en(mainPageData.sustainTextHeader_en);
        }
    }, [mainPageData]);

    const handleSetJSONValue = (setFunc, stateFunc, value, key) => {
        const jsonKey = document.getElementById(key)?.value || null;
        const jsonVal = document.getElementById(value).value;
        jsonKey
            ? setFunc((e) => [...e, { [jsonKey]: jsonVal }])
            : setFunc((e) => [...e, jsonVal]);
        //stateFunc(false);
        jsonKey && (document.getElementById(key).value = null);
        document.getElementById(value).value = null;
    };

    function ArrayList({ list, deleteItem }) {
        return (
            <div className="flex flex-col px-3 mt-1 h-full">
                {list.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="w-full flex items-center justify-between"
                        >
                            <div className="pl-2 w-full text-sm py-2 overflow-hidden">
                                <span className="text-clip">{item}</span>
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

    const deleteItem = (indx, list, func) => {
        let nlist = [...list];
        nlist.splice(indx, 1);
        func(nlist);
    };

    const save = () => {
        setBtnSpinner(true);
        const data = {
            videoTexts_tr,
            videoTexts_en,
            facilitiesTextHeader_tr,
            facilitiesTextHeader_en,
            facilitiesText_tr,
            facilitiesText_en,
            sustainTextHeader_tr,
            sustainTextHeader_en,
            sustainText_tr,
            sustainText_en,
        };
        dispatch(saveMainPageData(JSON.stringify(data))).then(({ payload }) => {
            setNewVideoTextTr(false);
            setNewVideoTextEn(false);
            setNewFacilitiesTextTr(false);
            setNewFacilitiesTextEn(false);
            setNewSustainTextTr(false);
            setNewSustainTextEn(false);
            setBtnSpinner(false);
        });
    };

    return (
        <div className="flex flex-col w-full h-fit p-6 select-text pb-12">
            <span className="pb-3 text-lg"> Video Bölümü</span>
            <div className="w-full grid grid-cols-2 gap-10">
                <Card className="w-full min-h-80 flex flex-col flex-1 border border-blue-gray-200 shadow-md">
                    <div className="w-full p-3 flex justify-between">
                        <span className="text-sm text-blue-gray-500">
                            Video Yazıları
                        </span>
                        <Tooltip content="Yeni Ekle">
                            {!newVideoTextTr ? (
                                <CirclePlus
                                    size="16"
                                    className="text-blue-gray-500 cursor-pointer"
                                    onClick={() => {
                                        setNewVideoTextTr(true);
                                    }}
                                />
                            ) : (
                                <CircleMinus
                                    size="16"
                                    className="text-blue-gray-500 cursor-pointer"
                                    onClick={() => {
                                        setNewVideoTextTr(false);
                                    }}
                                />
                            )}
                        </Tooltip>
                    </div>
                    <div className="w-full">
                        <Collapse
                            open={newVideoTextTr}
                            className="w-full flex items-center"
                        >
                            <div className="w-full px-3 flex items-center justify-between">
                                <textarea
                                    id="video-text-tr-value"
                                    type="text"
                                    className="border border-blue-gray-200 w-full h-16 rounded-md mr-3 outline-none px-2 py-1 text-xs"
                                />
                                <CircleCheck
                                    size={20}
                                    className="cursor-pointer text-blue-gray-500"
                                    onClick={() =>
                                        handleSetJSONValue(
                                            setVideoTexts_tr,
                                            setNewVideoTextTr,
                                            "video-text-tr-value"
                                        )
                                    }
                                />
                            </div>
                        </Collapse>
                    </div>
                    <ArrayList
                        list={videoTexts_tr}
                        deleteItem={(e) =>
                            deleteItem(e, videoTexts_tr, setVideoTexts_tr)
                        }
                    />
                </Card>
                <Card className="w-full min-h-80 flex flex-col flex-1 border border-blue-gray-200 shadow-md">
                    <div className="w-full p-3 flex justify-between">
                        <span className="text-sm text-blue-gray-500">
                            Video Texts
                        </span>
                        <Tooltip content="Yeni Ekle">
                            {!newVideoTextEn ? (
                                <CirclePlus
                                    size="16"
                                    className="text-blue-gray-500 cursor-pointer"
                                    onClick={() => {
                                        setNewVideoTextEn(true);
                                    }}
                                />
                            ) : (
                                <CircleMinus
                                    size="16"
                                    className="text-blue-gray-500 cursor-pointer"
                                    onClick={() => {
                                        setNewVideoTextEn(false);
                                    }}
                                />
                            )}
                        </Tooltip>
                    </div>
                    <div className="w-full">
                        <Collapse
                            open={newVideoTextEn}
                            className="w-full flex items-center"
                        >
                            <div className="w-full px-3 flex items-center justify-between">
                                <textarea
                                    id="video-text-en-value"
                                    type="text"
                                    className="border border-blue-gray-200 w-full h-16 rounded-md mr-3 outline-none px-2 py-1 text-xs"
                                />
                                <CircleCheck
                                    size={20}
                                    className="cursor-pointer text-blue-gray-500"
                                    onClick={() =>
                                        handleSetJSONValue(
                                            setVideoTexts_en,
                                            setNewVideoTextEn,
                                            "video-text-en-value"
                                        )
                                    }
                                />
                            </div>
                        </Collapse>
                    </div>
                    <ArrayList
                        list={videoTexts_en}
                        deleteItem={(e) =>
                            deleteItem(e, videoTexts_en, setVideoTexts_en)
                        }
                    />
                </Card>
            </div>
            <hr className="my-8 w-full" />
            <span className="pb-3 text-lg">İşletmeler</span>
            <div className="w-full grid grid-cols-2 gap-10">
                <Card className="w-full min-h-80 flex flex-col flex-1 border border-blue-gray-200 shadow-md">
                    <div className="w-full h-4rem p-3">
                        <span className="text-sm text-blue-gray-500">
                            Başlık
                        </span>
                        <textarea
                            value={facilitiesTextHeader_tr}
                            onChange={(e) =>
                                setFacilitiesTextHeader_tr(e.target.value)
                            }
                            type="text"
                            className="border border-blue-gray-200 w-full h-16 rounded-md outline-none px-2 py-1 text-xs"
                        />
                    </div>
                    <div className="w-full p-3 flex justify-between">
                        <span className="text-sm text-blue-gray-500">
                            İçerik
                        </span>
                        <Tooltip content="Yeni Ekle">
                            {!newFacilitiesTextTr ? (
                                <CirclePlus
                                    size="16"
                                    className="text-blue-gray-500 cursor-pointer"
                                    onClick={() => {
                                        setNewFacilitiesTextTr(true);
                                    }}
                                />
                            ) : (
                                <CircleMinus
                                    size="16"
                                    className="text-blue-gray-500 cursor-pointer"
                                    onClick={() => {
                                        setNewFacilitiesTextTr(false);
                                    }}
                                />
                            )}
                        </Tooltip>
                    </div>
                    <div className="w-full">
                        <Collapse
                            open={newFacilitiesTextTr}
                            className="w-full flex items-center"
                        >
                            <div className="w-full px-3 flex items-center justify-between">
                                <textarea
                                    id="facilities-text-tr-value"
                                    type="text"
                                    className="border border-blue-gray-200 w-full h-16 rounded-md mr-3 outline-none px-2 py-1 text-xs"
                                />
                                <CircleCheck
                                    size={20}
                                    className="cursor-pointer text-blue-gray-500"
                                    onClick={() =>
                                        handleSetJSONValue(
                                            setFacilitiesText_tr,
                                            setNewFacilitiesTextTr,
                                            "facilities-text-tr-value"
                                        )
                                    }
                                />
                            </div>
                        </Collapse>
                    </div>
                    <ArrayList
                        list={facilitiesText_tr}
                        deleteItem={(e) =>
                            deleteItem(
                                e,
                                facilitiesText_tr,
                                setFacilitiesText_tr
                            )
                        }
                    />
                </Card>
                <Card className="w-full min-h-80 flex flex-col flex-1 border border-blue-gray-200 shadow-md">
                    <div className="w-full h-4rem p-3">
                        <span className="text-sm text-blue-gray-500">
                            Header
                        </span>
                        <textarea
                            value={facilitiesTextHeader_en}
                            onChange={(e) =>
                                setFacilitiesTextHeader_en(e.target.value)
                            }
                            type="text"
                            className="border border-blue-gray-200 w-full h-16 rounded-md outline-none px-2 py-1 text-xs"
                        />
                    </div>
                    <div className="w-full p-3 flex justify-between">
                        <span className="text-sm text-blue-gray-500">
                            Content
                        </span>
                        <Tooltip content="Yeni Ekle">
                            {!newFacilitiesTextEn ? (
                                <CirclePlus
                                    size="16"
                                    className="text-blue-gray-500 cursor-pointer"
                                    onClick={() => {
                                        setNewFacilitiesTextEn(true);
                                    }}
                                />
                            ) : (
                                <CircleMinus
                                    size="16"
                                    className="text-blue-gray-500 cursor-pointer"
                                    onClick={() => {
                                        setNewFacilitiesTextEn(false);
                                    }}
                                />
                            )}
                        </Tooltip>
                    </div>
                    <div className="w-full">
                        <Collapse
                            open={newFacilitiesTextEn}
                            className="w-full flex items-center"
                        >
                            <div className="w-full px-3 flex items-center justify-between">
                                <textarea
                                    id="facilities-text-en-value"
                                    type="text"
                                    className="border border-blue-gray-200 w-full h-16 rounded-md mr-3 outline-none px-2 py-1 text-xs"
                                />
                                <CircleCheck
                                    size={20}
                                    className="cursor-pointer text-blue-gray-500"
                                    onClick={() =>
                                        handleSetJSONValue(
                                            setFacilitiesText_en,
                                            setNewFacilitiesTextEn,
                                            "facilities-text-en-value"
                                        )
                                    }
                                />
                            </div>
                        </Collapse>
                    </div>
                    <ArrayList
                        list={facilitiesText_en}
                        deleteItem={(e) =>
                            deleteItem(
                                e,
                                facilitiesText_en,
                                setFacilitiesText_en
                            )
                        }
                    />
                </Card>
            </div>
            <hr className="my-8 w-full" />
            <span className="pb-3 text-lg">Yenilenebilir Enerji</span>
            <div className="w-full grid grid-cols-2 gap-10">
                <Card className="w-full min-h-80 flex flex-col flex-1 border border-blue-gray-200 shadow-md">
                    <div className="w-full h-4rem p-3">
                        <span className="text-sm text-blue-gray-500">
                            Başlık
                        </span>
                        <textarea
                            value={sustainTextHeader_tr}
                            onChange={(e) =>
                                setSustainTextHeader_tr(e.target.value)
                            }
                            type="text"
                            className="border border-blue-gray-200 w-full h-16 rounded-md outline-none px-2 py-1 text-xs"
                        />
                    </div>
                    <div className="w-full p-3 flex justify-between">
                        <span className="text-sm text-blue-gray-500">
                            Sürdürebilirlik Bilgisi
                        </span>
                        <Tooltip content="Yeni Ekle">
                            {!newSustainTextTr ? (
                                <CirclePlus
                                    size="16"
                                    className="text-blue-gray-500 cursor-pointer"
                                    onClick={() => {
                                        setNewSustainTextTr(true);
                                    }}
                                />
                            ) : (
                                <CircleMinus
                                    size="16"
                                    className="text-blue-gray-500 cursor-pointer"
                                    onClick={() => {
                                        setNewSustainTextTr(false);
                                    }}
                                />
                            )}
                        </Tooltip>
                    </div>
                    <div className="w-full">
                        <Collapse
                            open={newSustainTextTr}
                            className="w-full flex items-center"
                        >
                            <div className="w-full px-3 flex items-center justify-between">
                                <textarea
                                    id="sustain-text-tr-value"
                                    type="text"
                                    className="border border-blue-gray-200 w-full h-16 rounded-md mr-3 outline-none px-2 py-1 text-xs"
                                />
                                <CircleCheck
                                    size={20}
                                    className="cursor-pointer text-blue-gray-500"
                                    onClick={() =>
                                        handleSetJSONValue(
                                            setSustainText_tr,
                                            setNewSustainTextTr,
                                            "sustain-text-tr-value"
                                        )
                                    }
                                />
                            </div>
                        </Collapse>
                    </div>
                    <ArrayList
                        list={sustainText_tr}
                        deleteItem={(e) =>
                            deleteItem(e, sustainText_tr, setSustainText_tr)
                        }
                    />
                </Card>
                <Card className="w-full min-h-80 flex flex-col flex-1 border border-blue-gray-200 shadow-md">
                    <div className="w-full h-4rem p-3">
                        <span className="text-sm text-blue-gray-500">
                            Header
                        </span>
                        <textarea
                            value={sustainTextHeader_en}
                            onChange={(e) =>
                                setSustainTextHeader_en(e.target.value)
                            }
                            type="text"
                            className="border border-blue-gray-200 w-full h-16 rounded-md outline-none px-2 py-1 text-xs"
                        />
                    </div>
                    <div className="w-full p-3 flex justify-between">
                        <span className="text-sm text-blue-gray-500">
                            Sustainability Content
                        </span>
                        <Tooltip content="Yeni Ekle">
                            {!newSustainTextEn ? (
                                <CirclePlus
                                    size="16"
                                    className="text-blue-gray-500 cursor-pointer"
                                    onClick={() => {
                                        setNewSustainTextEn(true);
                                    }}
                                />
                            ) : (
                                <CircleMinus
                                    size="16"
                                    className="text-blue-gray-500 cursor-pointer"
                                    onClick={() => {
                                        setNewSustainTextEn(false);
                                    }}
                                />
                            )}
                        </Tooltip>
                    </div>
                    <div className="w-full">
                        <Collapse
                            open={newSustainTextEn}
                            className="w-full flex items-center"
                        >
                            <div className="w-full px-3 flex items-center justify-between">
                                <textarea
                                    id="sustain-text-en-value"
                                    type="text"
                                    className="border border-blue-gray-200 w-full h-16 rounded-md mr-3 outline-none px-2 py-1 text-xs"
                                />
                                <CircleCheck
                                    size={20}
                                    className="cursor-pointer text-blue-gray-500"
                                    onClick={() =>
                                        handleSetJSONValue(
                                            setSustainText_en,
                                            setNewSustainTextEn,
                                            "sustain-text-en-value"
                                        )
                                    }
                                />
                            </div>
                        </Collapse>
                    </div>
                    <ArrayList
                        list={sustainText_en}
                        deleteItem={(e) =>
                            deleteItem(e, sustainText_en, setSustainText_en)
                        }
                    />
                </Card>
            </div>
            <hr className="my-8 w-full" />
            <div className="w-full flex items-center justify-end">
                <Button
                    className="w-1/5 bg-[#1e40af] flex items-center justify-center"
                    disabled={btnSpinner}
                    size="sm"
                    onClick={() => save()}
                >
                    {btnSpinner ? <Spinner /> : "Kaydet"}
                </Button>
            </div>
        </div>
    );
}
