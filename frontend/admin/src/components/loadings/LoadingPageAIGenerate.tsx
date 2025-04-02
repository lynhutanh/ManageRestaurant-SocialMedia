import { images } from "@/assets/assets";
import React from "react";

const LoadingPageAIGenerate: React.FC = () => {
    return (
        <div className="z-50 fixed inset-0 flex justify-center items-center">
            {/* Overlay làm tối nền và ngăn bấm ra ngoài */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Nội dung chính */}
            <div className="relative z-10 h-full w-full bg-white rounded-md flex flex-col justify-center items-center">
                <img
                    src={images.loadingGenerate}
                    alt="loadingResult"
                    loading="lazy"
                    className="h-[100px] w-auto"
                />
                <div className="bg-gradient-to-r from-dashboard-green via-dashboard-blue to-dashboard-violet inline-block text-transparent bg-clip-text text-3xl font-bold animate-hueRotate">
                    Generating your social media post...
                </div>
            </div>
        </div>
    );
};

export default LoadingPageAIGenerate;
