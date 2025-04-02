import { IoMdClose } from "react-icons/io";

import React from 'react'
interface IPage {
    id: string;
    name: string;
}

interface IPopupListPostSocialMedia {
    pages: IPage[];
    handleSelectPage: (page: IPage) => void;
    handleTogglePopup: () => void,
    selectedPages: {
        currentFbPage: { pageId: string; pageName: string };
        currentInstaPage: { pageId: string; pageName: string };

    };
}

const PopupListPostSocialMedia: React.FC<IPopupListPostSocialMedia> = ({
    handleTogglePopup,
    selectedPages,
    pages,
    handleSelectPage

}) => {
    return (
        <>
            <div>
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
                    onClick={handleTogglePopup}
                ></div>

                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-lg p-6 z-50 w-[40%] max-h-[80%] overflow-y-auto">
                    <h1 className="font-bold">Select Page:</h1>

                    {!selectedPages.currentFbPage.pageId ? (
                        <ul className="space-y-4 py-4 max-h-[400px] overflow-y-auto">
                            {pages.map((page) => (
                                <li key={page.id} className="p-4 border-b">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-gray-800">{page.name}</p>
                                            <p className="text-sm text-gray-600">ID: {page.id}</p>
                                        </div>
                                        <button
                                            onClick={() => handleSelectPage(page)}
                                            className="px-4 py-2 bg-transparent border-solid border-2 border-[#009951] text-[#009951] rounded-md hover:bg-[#009951] hover:text-white transition-all duration-300 ease-in-out"
                                        >
                                            View Posts
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul className="space-y-4 py-4 max-h-[400px] overflow-y-auto">
                            {pages.map((page) => (
                                <li key={page.id} className="p-4 border border-gray-300 rounded-md bg-white shadow-sm">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-gray-800">{page.name}</p>
                                            <p className="text-sm text-gray-600">ID: {page.id}</p>
                                        </div>
                                        <button
                                            onClick={() => handleSelectPage(page)}
                                            className="px-4 py-2 bg-transparent border-solid border-2 border-[#009951] text-[#009951] rounded-md hover:bg-green-600 hover:text-white transition-all duration-300 ease-in-out"
                                        >
                                            View Posts
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    <button
                        onClick={handleTogglePopup}
                        className="absolute top-3 right-3 text-gray-600 hover:text-red-600 transition text-2xl"
                    >
                        <IoMdClose />
                    </button>
                </div>
            </div>

        </>

    )
}

export default PopupListPostSocialMedia