import { CircleX, Check } from "lucide-react";
import { Dialog } from "@material-tailwind/react";

export default function DialogModal({ status, errorText }) {
    const Success = () => {
        return (
            <div className="flex w-full flex-col h-full justify-center items-center">
                <Check size={90} color="rgb(0,150,0)" className="mb-5" />
                <span className="text-black">Başarılı</span>
            </div>
        );
    };

    const Error = () => {
        return (
            <div className="flex w-full flex-col h-full justify-center items-center">
                <CircleX size={90} color="rgb(190,0,0)" className="mb-5" />
                <span className="text-black">Bir sorun oluştu</span>
                <span className="text-black">{errorText}</span>
            </div>
        );
    };

    return (
        <Dialog
            open={true}
            className="bg-slate-50 h-[200px] shadow-lg absolute left-0 right-0 m-auto top-0 bottom-0 rounded-lg"
        >
            {status == "success" && <Success />}
            {status == "error" && <Error />}
        </Dialog>
    );
}
