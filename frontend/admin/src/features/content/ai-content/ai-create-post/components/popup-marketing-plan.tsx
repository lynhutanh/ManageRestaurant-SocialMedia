import { useState } from "react";
import { BiSolidCalendarHeart } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";

interface ChatBoxProps {
    isOpen: boolean; // Đảm bảo isOpen là kiểu boolean
    onClose: () => void;
    onGenerateSchedulePlan: () => void;
    marketingPlan: string
    postTitles: string[]
    onCancel: () => void;
}

export default function Popup({ isOpen, onClose, onGenerateSchedulePlan, marketingPlan, postTitles, onCancel }: ChatBoxProps) {
    const closePopup = () => {
        onClose();
    };
    const n_post = postTitles.length;

    const estimatedMinutes = (n_post * 30) / 60;
    const marketingPlanFormat: string[] = marketingPlan.trim().split("\n");

    const handleGenerateSchedulePlan = () => {
        onGenerateSchedulePlan();
        closePopup();

    }



    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[60%] relative">
                    {/* Nút đóng "X" */}
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        &times;
                    </button>

                    <h2 className="text-lg font-semibold mb-4 text-primary-black flex items-center gap-2">
                        <SlCalender size={25} />
                        POSTING SCHEDULE
                    </h2>

                    <h2 className="flex items-center gap-2">
                        <FaRegClock size={25} />
                        Estimated Generation Time: {estimatedMinutes} minutes
                    </h2>

                    <ul className="text-sm text-gray-500 mb-4 max-h-60 overflow-y-auto">
                        {marketingPlanFormat.map((schedule, index) => (
                            <li className="py-5" key={index}>{schedule}</li>
                        ))}
                    </ul>

                    <div className="flex justify-between space-x-3">
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 cursor-pointer w-max text-lg font-semibold border-2 border-dashboard-blue text-dashboard-blue rounded-md hover:bg-dashboard-blue/80 hover:text-white">
                            Cancel
                        </button>
                        <button
                            className="px-2 py-2 text-lg w-max self-end text-white font-medium rounded-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex items-center gap-2"
                            onClick={handleGenerateSchedulePlan}
                        >
                            Generate Schedule Plan <BsStars className="inline" />
                        </button>
                    </div>
                </div>
            </div>
        )
    );

}