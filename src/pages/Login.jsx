import React, { useState } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/reducers/user";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [errorData, setErrorData] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [btnSpinner, setBtnSpinner] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sendUserData = () => {
        setBtnSpinner(true);
        dispatch(login({ username, password })).then((res) => {
            if (!res.payload.status) {
                setErrorData(res.payload.error);
                setTimeout(() => {
                    setErrorData(null);
                }, 4000);
            } else {
                navigate("/common/mines");
            }
            setBtnSpinner(false);
        });
    };

    return (
        <div
            id="login"
            className="w-full h-full flex flex-col items-center justify-center"
        >
            <div
                id="loginForm"
                className="w-[350px] h-[350px] bg-stone-50 border border-neutral-200 rounded flex flex-col items-center justify-start relative pt-12 shadow-lg"
            >
                <div className="w-3/5 flex flex-col mb-6">
                    <label className="mb-2 text-sm text-neutral-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="text"
                        className="border border-neutral-200 text-neutral-700 rounded px-3 py-2 text-sm shadow-inner"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="w-3/5 flex flex-col mb-6">
                    <label className="mb-2 text-sm text-neutral-700">
                        Password
                    </label>
                    <div className="relative w-full">
                        <input
                            id="password"
                            type={!showPass ? "text" : "password"}
                            className="w-full border border-neutral-200 text-neutral-700 rounded px-3 py-2 text-sm shadow-inner"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="absolute right-2 inset-y-0 my-auto cursor-pointer grid items-center">
                            {showPass ? (
                                <Eye
                                    size="16"
                                    color="#525252"
                                    onClick={() => setShowPass(false)}
                                />
                            ) : (
                                <EyeOff
                                    size="16"
                                    color="#525252"
                                    onClick={() => setShowPass(true)}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <button
                    className="w-[100px] m-2 border border-blue-200 rounded px-5 py-2 flex items-center justify-center bg-blue-100 shadow-md hover:shadow-none disabled:bg-stone-100 disabled:shadow-none disabled:text-stone-400 disabled:border-stone-200"
                    onClick={sendUserData}
                    disabled={!username || !password || btnSpinner}
                >
                    {btnSpinner ? (
                        <LoaderCircle
                            className="animate-spin"
                            color="#475569"
                        />
                    ) : (
                        <span className="text-sm">Login</span>
                    )}
                </button>

                {errorData && (
                    <div className="w-fit h-fit p-1 px-10 text-center bottom-3 inset-x-0 mx-auto">
                        <span className="text-sm text-red-800">
                            {errorData}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
