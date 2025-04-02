import React, { useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";

interface PropsSchedule {
    selectedPageName: string;
    setSelectedPageName: (name: string) => void;
    scheduledTime: string;
    setScheduledTime: (time: string) => void;
    postMessage: string;
    setPostMessage: (message: string) => void;
    postImageUrl: string;
    setPostImageUrl: (url: string) => void;
    pages: { id: string; name: string; access_token: string }[];
    loading: boolean;
    handleSchedulePostFacebook: () => void;
    handleSchedulePostInstagram: () => void;
    handleSelectPageFacebookSchedule: (page: { id: string; name: string; access_token: string }) => void;
    activeTab: string
}

const Schedule: React.FC<PropsSchedule> = ({
    selectedPageName,
    scheduledTime,
    postMessage,
    postImageUrl,
    pages,
    loading,
    setScheduledTime,
    setPostMessage,
    setPostImageUrl,
    handleSchedulePostFacebook,
    handleSelectPageFacebookSchedule,
    handleSchedulePostInstagram,
    activeTab
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isInstagram, setIsInstagram] = useState(false);

    const togglePlatform = () => {
        setIsInstagram(!isInstagram);
    };

    return (
        <div className="bg-white p-5 rounded-lg shadow-md relative">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-primary">
                    {isInstagram ? "Schedule Instagram Posts" : "Schedule Facebook Posts"}
                </h3>


                <div
                    className={`w-[110px] h-8 flex items-center rounded-full cursor-pointer transition-all relative
    ${isInstagram ? "bg-orange-500" : "bg-gray-400"}`}
                    onClick={togglePlatform}
                >
                    <span
                        className={`absolute font-semibold text-xs transition-all 
        ${isInstagram ? "text-white right-[10px] translate-x-[-30px]" : "text-black left-[10px] translate-x-[30px]"}`}
                    >
                        {isInstagram ? "Facebook" : "Instagram"}
                    </span>

                    <div
                        className={`bg-white w-7 h-7 rounded-full shadow-md transform transition-all
        ${isInstagram ? "translate-x-[80px]" : "translate-x-1"}`}
                    />
                </div>


            </div>


            <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Select {isInstagram ? "Instagram" : "Facebook"} page:</label>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full text-left px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none flex justify-between items-center"
                    >
                        {selectedPageName || `Select ${isInstagram ? "Instagram" : "Facebook"} page`} <IoMdArrowDropdown />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-md z-10">
                            {pages.length > 0 ? (
                                pages.map((page) => (
                                    <button
                                        key={page.id}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                        onClick={() => {
                                            handleSelectPageFacebookSchedule(page);
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        {page.name}
                                    </button>
                                ))
                            ) : (
                                <p className="text-gray-500 p-2">There are no pages!</p>
                            )}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Posting time:</label>
                    <input
                        type="datetime-local"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
            </div>

            {/* Nội dung bài viết & URL hình ảnh */}
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Caption:</label>
                    <textarea
                        value={postMessage}
                        onChange={(e) => setPostMessage(e.target.value)}
                        placeholder="Input caption..."
                        className="w-full h-28 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL:</label>
                    <input
                        type="text"
                        value={postImageUrl}
                        onChange={(e) => setPostImageUrl(e.target.value)}
                        placeholder="Paste image URL..."
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <div className="flex justify-end mt-5">
                        <button
                            onClick={isInstagram ? handleSchedulePostInstagram : handleSchedulePostFacebook}
                            className={`text-xl font-semibold px-4 py-2 border-2 rounded-lg transition-all duration-300 border-primary hover:bg-primary/10 cursor-pointer 
                                ${loading ? "bg-primary text-white" : "bg-white text-primary"}
                            `}
                            disabled={loading}
                        >
                            {loading ? "Scheduling..." : "Schedule"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Schedule;
