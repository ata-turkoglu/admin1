import React, { useRef, useState } from "react";
import { CircleMinus, CirclePlus, CircleCheck } from "lucide-react";

export default function ListView({ header, receivedList, setList }) {
    const [newInputState, setNewInputState] = useState(false);
    const textareaRef = useRef();

    let dragedKey = null;
    let enteredKey = null;

    const dragStart = (index) => {
        dragedKey = index;
    };

    const dragEnd = () => {
        let list = [...receivedList];
        const item = list.splice(dragedKey, 1)[0];
        list.splice(enteredKey, 0, item);
        dragedKey = null;
        setList(list);
    };

    const addText = () => {
        setList([...receivedList, textareaRef.current.value]);
    };

    const deleteItem = (indx) => {
        const list = [...receivedList];
        list.splice(indx, 1);
        setList(list);
    };

    const RenderList = ({ list }) => {
        return (
            <div className="flex flex-col mt-1 h-full">
                {list.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="w-full flex items-center justify-between cursor-pointer"
                            draggable
                            onDragStart={() => dragStart(index)}
                            onDragEnter={() => (enteredKey = index)}
                            onDragEnd={() => dragEnd()}
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
    };

    return (
        <div className="w-full min-h-80 flex flex-col flex-1 border border-blue-gray-200 shadow-md rounded-md p-3">
            <div className="w-full flex justify-between mb-3">
                <span className="text-sm text-blue-gray-500">{header}</span>
                {!newInputState ? (
                    <CirclePlus
                        size="16"
                        className="text-blue-gray-500 cursor-pointer"
                        onClick={() => {
                            setNewInputState(true);
                        }}
                    />
                ) : (
                    <CircleMinus
                        size="16"
                        className="text-blue-gray-500 cursor-pointer"
                        onClick={() => {
                            setNewInputState(false);
                        }}
                    />
                )}
            </div>
            {newInputState && (
                <div className="w-full flex items-center justify-between mb-3">
                    <textarea
                        ref={textareaRef}
                        type="text"
                        className="border border-blue-gray-200 w-full h-16 rounded-md mr-3 outline-none px-2 py-1 text-xs"
                    />
                    <CircleCheck
                        size={16}
                        className="cursor-pointer text-blue-gray-500"
                        onClick={addText}
                    />
                </div>
            )}
            <RenderList list={receivedList} />
        </div>
    );
}
