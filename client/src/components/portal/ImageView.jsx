import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const ImageView = ({ url, close }) => {
    return (
        <div id="modelConfirm" className="fixed  z-[999] inset-0 bg-gray-800 bg-opacity-70 overflow-y-auto h-full w-full px-4 ">
            <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">

                <div className="box bg-white border-0">
                    <div className="alert custom-alert1 pb-8 !bg-white" id="dismiss-alert72">
                        <button
                            type="button"
                            onClick={() => close("")}
                            className="btn-close ms-auto !text-black"
                            data-hs-remove-element="#dismiss-alert72"
                            aria-label="Close"
                        >
                            <AiOutlineClose />
                        </button>
                        <div className="text-center px-[3rem] pb-0">
                            <img src={url} alt="" />
                           

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageView;
