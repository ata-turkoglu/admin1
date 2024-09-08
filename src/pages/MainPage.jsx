import React, { useEffect, useLayoutEffect, useState } from "react";
import { Card, Button, Spinner } from "@material-tailwind/react";
import { getMainPageData, saveMainPageData } from "../store/reducers/mainPage";
import { useDispatch, useSelector } from "react-redux";
import ListView from "../components/listView";

export default function MainPage() {
    const [videoTexts_tr, setVideoTexts_tr] = useState([]);
    const [videoTexts_en, setVideoTexts_en] = useState([]);

    const [facilitiesText_tr, setFacilitiesText_tr] = useState([]);
    const [facilitiesText_en, setFacilitiesText_en] = useState([]);
    const [facilitiesTextHeader_tr, setFacilitiesTextHeader_tr] = useState("");
    const [facilitiesTextHeader_en, setFacilitiesTextHeader_en] = useState("");

    const [sustainText_tr, setSustainText_tr] = useState([]);
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
            setBtnSpinner(false);
        });
    };

    return (
        <div className="flex flex-col w-full h-fit p-6 select-text pb-12">
            <span className="pb-3 text-lg"> Video Bölümü</span>
            <div className="w-full grid grid-cols-2 gap-10">
                <ListView
                    header="Video Yazıları"
                    receivedList={videoTexts_tr}
                    setList={setVideoTexts_tr}
                    border
                />
                <ListView
                    header="Video Texts"
                    receivedList={videoTexts_en}
                    setList={setVideoTexts_en}
                />
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
                    <ListView
                        header="İçerik"
                        receivedList={facilitiesText_tr}
                        setList={setFacilitiesText_tr}
                        border={false}
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
                    <ListView
                        header="Content"
                        receivedList={facilitiesText_en}
                        setList={setFacilitiesText_en}
                        border={false}
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
                    <ListView
                        header="Sürdürebilirlik Bilgisi"
                        receivedList={sustainText_tr}
                        setList={setSustainText_tr}
                        border={false}
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
                    <ListView
                        header="Sustainability Content"
                        receivedList={sustainText_en}
                        setList={setSustainText_en}
                        border={false}
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
