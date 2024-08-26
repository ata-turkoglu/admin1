import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import {
    Button,
    Spinner,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getAboutText, saveAboutText } from "../store/reducers/about";

export default function About() {
    const [text_tr, setText_tr] = useState(null);
    const [text_en, setText_en] = useState(null);
    const [btnSpinner, setBtnSpinner] = useState();
    const [activeTab, setActiveTab] = useState("tr");

    const dispatch = useDispatch();

    const aboutPageText = useSelector(
        (state) => state.aboutPageSlice.aboutText
    );

    const modules = {
        toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["clean"],
            [
                { align: "" },
                { align: "center" },
                { align: "right" },
                { align: "justify" },
            ],
        ],
    };

    useLayoutEffect(() => {
        if (!aboutPageText) {
            dispatch(getAboutText());
        }
    }, []);

    useEffect(() => {
        if (aboutPageText) {
            setText_tr(aboutPageText.text_tr);
            setText_en(aboutPageText.text_en);
        }
    }, [aboutPageText]);

    const save = () => {
        setBtnSpinner(true);
        const data = { text_tr, text_en };
        dispatch(saveAboutText(JSON.stringify(data))).then((res) => {
            setBtnSpinner(false);
        });
    };

    return (
        <div id="about" className="h-full flex flex-col p-6">
            <Tabs value={activeTab} className="h-full">
                <TabsHeader
                    className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                    indicatorProps={{
                        className:
                            "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                    }}
                >
                    <Tab
                        key="tr"
                        value="tr"
                        onClick={() => setActiveTab("tr")}
                        className={activeTab === "tr" ? "text-gray-900" : ""}
                    >
                        Türkçe
                    </Tab>
                    <Tab
                        key="en"
                        value="en"
                        onClick={() => setActiveTab("en")}
                        className={activeTab === "en" ? "text-gray-900" : ""}
                    >
                        İngilizce
                    </Tab>
                </TabsHeader>
                <TabsBody className="h-full">
                    <TabPanel key="tr" value="tr" className="h-full">
                        <ReactQuill
                            key="ReactQuill1"
                            theme="snow"
                            value={text_tr}
                            modules={modules}
                            onChange={setText_tr}
                            className="h-5/6"
                        />
                    </TabPanel>
                    <TabPanel key="en" value="en" className="h-full">
                        <ReactQuill
                            key="ReactQuill2"
                            theme="snow"
                            value={text_en}
                            modules={modules}
                            onChange={setText_en}
                            className="h-5/6"
                        />
                    </TabPanel>
                </TabsBody>
            </Tabs>
            <div className="w-full flex justify-end items-center mt-6">
                <Button
                    className="w-1/5 bg-[#1e40af] flex items-center justify-center"
                    disabled={!text_tr || !text_en || btnSpinner}
                    size="sm"
                    onClick={() => save()}
                >
                    {btnSpinner ? <Spinner /> : "Kaydet"}
                </Button>
            </div>
        </div>
    );
}
