import React, { useEffect, useState } from 'react';
import Modal from "@/features/shared/pops-up";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import PrimaryButton from "@/components/buttons/PrimaryButton";
import DropdownMenu from './DropdownPages';
import { icons } from "@assets/assets"
import { IAccountSate, IPostState } from '../../types/schedule';


interface PropsScheduleModal {
    isOpen: boolean;
    postState: IPostState;
    accountState: IAccountSate;
    setPostState: React.Dispatch<React.SetStateAction<IPostState>>;
    setAccountState: React.Dispatch<React.SetStateAction<IAccountSate>>;
    onClose: () => void;
    selectedPageName: string;
    pages: { id: string; name: string; access_token: string }[];
    loading: boolean;
    handleSchedulePostFacebook: () => void;
    handleSchedulePostInstagram: () => void;
    handleSelectPageFacebookSchedule: (page: { id: string; name: string; access_token: string }) => void;
    activeTab: string;
    setActiveTab: (platform: string) => void;
    handleRefetchPages: () => void;
}

const ScheduleModal: React.FC<PropsScheduleModal> = ({
    isOpen,
    onClose,
    selectedPageName,
    pages,
    loading,
    postState,
    setPostState,
    activeTab,
    setActiveTab,
    handleSchedulePostFacebook,
    handleSelectPageFacebookSchedule,
    handleSchedulePostInstagram,

    handleRefetchPages
}) => {
    const tabs = [
        { label: "Facebook", value: "facebook" },
        { label: "Instagram", value: "instagram" },
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const isInstagram = activeTab === "instagram";


    const defaultPage = useSelector((state: any) => state.userSlice.defaultPage);

    useEffect(() => {
        if (isOpen) {
            const savedPost = localStorage.getItem("schedulingPost");
            if (savedPost) {
                const parsedPost = JSON.parse(savedPost);
                setPostState({
                    postMessage: parsedPost.postMessage || "",
                    postImageUrl: parsedPost.postImageUrl || "",
                    scheduledTime: parsedPost.scheduledTime || "",
                });
            }
        }
    }, [isOpen]);

    const resetState = () => {
        setPostState(prevState => ({
            ...prevState, // Giữ nguyên các giá trị khác trong postState
            scheduledTime: "", // Reset scheduledTime về giá trị mặc định
        }));
        setCurrentPage(1);

    };




    useEffect(() => {
        resetState();
    }, [activeTab]);

    const handleNext = () => {
        if (currentPage < 3) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleCancel = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const navigate = useNavigate();
    const handleOpenSettings = () => {
        navigate("/setting");
        setShowLoginPopup(false);
    };
    const handleCancelPopup = () => {
        setShowLoginPopup(false);
    };
    const handleSchedule = async () => {
        if (!selectedPageName) {
            setPostState({
                postMessage: postState.postMessage,
                postImageUrl: postState.postImageUrl,
                scheduledTime: postState.scheduledTime,
            });


            localStorage.setItem(
                "schedulingPost",
                JSON.stringify({
                    postMessage: postState.postMessage,
                    postImageUrl: postState.postImageUrl,
                    scheduledTime: postState.scheduledTime,
                })
            );

            setShowLoginPopup(true);
            return;
        }

        try {
            isInstagram ? await handleSchedulePostInstagram() : await handleSchedulePostFacebook();
            onClose();
            resetState();
            localStorage.removeItem("schedulingPost");
        } catch (error) {
            setShowLoginPopup(false);
        }
    };
    const handlePlatformSelection = (platform: string) => {
        setActiveTab(platform);
        setCurrentPage(2);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-4xl w-full ">
            <div className="bg-white  w-full flex flex-col h-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-primary">
                        {isInstagram ? "Schedule Instagram Post" : "Schedule Facebook Post"}
                    </h3>
                </div>

                {currentPage == 1 && (
                    <div className="flex flex-col space-y-6 flex-grow">
                        <div className="text-center">
                            <h4 className="text-lg font-semibold text-primary-black  ">
                                Which social platform do you want to schedule posts for?
                            </h4>
                        </div>
                        <div className="flex justify-center gap-4">
                            {tabs.map((tab, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col items-center p-4 border-2 rounded-md cursor-pointer transition-all duration-200 ${activeTab === tab.value
                                        ? "border-primary/90 "
                                        : "border-primary-gray-th1 hover:border-primary/90 text-primary-black hover:-translate-y-1"
                                        }`}
                                    onClick={() => handlePlatformSelection(tab.value)}
                                >
                                    <span className="text-lg font-semibold flex items-center gap-2">
                                        <img
                                            src={tab.value === "facebook" ? icons.iconFacebook : icons.iconInstagram}
                                            alt={tab.value}
                                            className="w-8 h-8 object-contain"
                                        />
                                        {tab.label}
                                    </span>
                                </div>
                            ))}


                        </div>
                    </div>
                )}

                {currentPage === 2 && (
                    <div className="flex flex-col space-y-6 flex-grow">
                        <div>
                            <label className="block text-sm font-semibold text-primary-black mb-2">Content:</label>
                            <textarea
                                value={postState.postMessage}
                                onChange={(e) => setPostState(prevState => ({ ...prevState, postMessage: e.target.value }))}
                                placeholder="Input content..."
                                className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-primary-black mb-2">Image URL:</label>
                            <input
                                type="text"
                                value={postState.postImageUrl}
                                onChange={(e) => setPostState(prevState => ({ ...prevState, postImageUrl: e.target.value }))}
                                placeholder="Paste image URL..."
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                        <div className="flex justify-between mt-6">
                            <PrimaryButton
                                label="Previous"
                                onClick={handleCancel}
                                className="border-2 border-dashboard-blue text-dashboard-blue rounded-md hover:bg-dashboard-blue/80 hover:text-white"
                            />
                            <PrimaryButton
                                label="Next"
                                onClick={handleNext}
                                className={`border-2 bg-dashboard-green text-white rounded-md hover:bg-dashboard-green/90 border-dashboard-green 
                                    `} />
                        </div>
                    </div>
                )}

                {currentPage === 3 && (
                    <div className="flex flex-col space-y-6 flex-grow">
                        <div className="flex items-center gap-2">
                            <label className="block text-sm font-semibold text-primary-black">
                                Select {isInstagram ? "Instagram" : "Facebook"} page:
                            </label>
                        </div>

                        <DropdownMenu
                            selectedPageName={selectedPageName}
                            pages={pages}
                            onSelectPage={handleSelectPageFacebookSchedule}
                            isInstagram={isInstagram}
                        />

                        <div>
                            <label className="block text-sm font-semibold text-primary-black mb-2">Posting time:</label>
                            <input
                                type="datetime-local"
                                value={postState.scheduledTime}
                                onChange={(e) => setPostState(prevState => ({ ...prevState, scheduledTime: e.target.value }))}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                        <div className="flex justify-between mt-6">
                            <PrimaryButton
                                label="Previous"
                                onClick={handleCancel}
                                className="border-2 border-dashboard-blue text-dashboard-blue rounded-md hover:bg-dashboard-blue/80 hover:text-white"
                            />
                            <PrimaryButton
                                label={loading ? "Scheduling..." : "Schedule"}
                                onClick={handleSchedule}
                                className="border-2 bg-dashboard-green text-white rounded-md hover:bg-dashboard-green/90 border-dashboard-green"
                            />
                        </div>
                    </div>
                )}

                {showLoginPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold mb-4">Please login</h3>
                            <p className="mb-6">You need to login to continue.</p>
                            <div className="flex justify-end">
                                <PrimaryButton
                                    label="Cancel"
                                    onClick={handleCancelPopup}
                                    className="text-xl font-semibold px-6 py-3 border-2 rounded-lg transition-all duration-300 border-primary hover:bg-primary/10 cursor-pointer bg-white text-primary mr-4"
                                />
                                <PrimaryButton
                                    label="Đăng nhập"
                                    onClick={handleOpenSettings}
                                    className="text-xl font-semibold px-6 py-3 border-2 rounded-lg transition-all duration-300 border-primary bg-primary text-white"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ScheduleModal;