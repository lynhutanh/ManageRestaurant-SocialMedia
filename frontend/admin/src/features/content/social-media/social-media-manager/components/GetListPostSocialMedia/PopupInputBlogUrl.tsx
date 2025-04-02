import React from 'react'
import { IoMdClose } from "react-icons/io";

interface IPopupInputBlogUrl {
    handleTogglePopupListBlogInput: () => void;
    handleSubmitBlogUrl: () => void;
    blogUrl: string;
    setBlogUrl: React.Dispatch<React.SetStateAction<string>>; // Đây là kiểu đúng cho setState
}

const PopupListPostSocialMedia: React.FC<IPopupInputBlogUrl> = ({
    handleTogglePopupListBlogInput,
    blogUrl,
    setBlogUrl,
    handleSubmitBlogUrl
}) => {
    return (
        <>
            <div
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
                onClick={handleTogglePopupListBlogInput}
            ></div>

            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-lg p-6 z-50 w-[40%]">
                <h1 className="font-bold mb-4">Input Blog Page URL:</h1>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    placeholder="Enter blog page URL"
                    value={blogUrl}
                    onChange={(e) => setBlogUrl(e.target.value)}
                />
                <button
                    onClick={handleSubmitBlogUrl}
                    className={`w-full py-2 rounded-md transition-all duration-300 ease-in-out ${blogUrl.trim() ? 'bg-[#0C2556] text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-600'
                        }`}
                    disabled={!blogUrl.trim()}
                >
                    Submit
                </button>

                <button
                    onClick={handleTogglePopupListBlogInput}
                    className="absolute top-3 right-3 text-gray-600 hover:text-red-600 transition text-2xl"
                >
                    <IoMdClose />
                </button>
            </div>
        </>
    )
}

export default PopupListPostSocialMedia