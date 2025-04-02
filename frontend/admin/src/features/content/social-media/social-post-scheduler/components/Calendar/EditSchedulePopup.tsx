import React, { useRef, useState, useEffect } from "react";
import { IScheduleItem } from "../../types/schedule";
import { deleteScheduledPostFacebook, deleteScheduledPostInstagram, editScheduledPostFacebook, editScheduledPostInstagram, getAllScheduledPostsFacebook, getAllScheduledPostsInstagram, schedulePostFacebook, schedulePostInstagram } from "../../api/social-media";
import { toast } from "react-toastify";
import { MdEdit, MdClose } from "react-icons/md";
import { FaShare, FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { images } from "@assets/assets";
import { icons } from "@assets/assets";
import { AiFillLike } from "react-icons/ai";
import { IoIosSave } from "react-icons/io";

interface EditSchedulePopupProps {
    item: IScheduleItem;
    onClose: () => void;
    onSave: (updatedItem: IScheduleItem) => void;
    selectedPageToken: string;
    setIsDeletedPost: (isDeletedPost: boolean) => void;
    setIsUpdatedPost: (isUpdatedPost: boolean) => void;
    selectedPageName: string;
    selectedPageId: string;
    getAllScheduledPosts: () => void;
    setSelectedPageId: React.Dispatch<React.SetStateAction<string>>;
    setSelectedPageToken: React.Dispatch<React.SetStateAction<string>>;
}

interface InstagramPost {
    id: string;
    message: string;
    scheduled_publish_time: number;
    created_time: string;
    status_type: string;
    platform: string;
}

export const EditSchedulePopup: React.FC<EditSchedulePopupProps> = ({
    item,
    setIsDeletedPost,
    onClose,
    onSave,
    setSelectedPageId,
    setSelectedPageToken,
    getAllScheduledPosts,
    setIsUpdatedPost,
    selectedPageName,
    selectedPageToken,
    selectedPageId,
}) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isEditingCaption, setIsEditingCaption] = useState(false);
    const [isEditingTime, setIsEditingTime] = useState(false);
    const [caption, setCaption] = useState(item.caption);
    const [time, setTime] = useState(item.time);
    const [newImageUrl, setNewImageUrl] = useState(item.imageUrl);
    const [isEditingImage, setIsEditingImage] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const handleChange = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedItem: IScheduleItem = {
            ...item,
            time: new Date(time),
            caption: caption,
            imageUrl: newImageUrl,
        };

        if (!updatedItem.caption.trim()) {
            toast.error("Caption cannot be empty.");
            return;
        }

        setIsSaving(true);
        try {
            let instagramPost = null;

            try { //kiem tra xem có post nay trong  list postInstagram không 
                const scheduledInstagramPosts: InstagramPost[] = await getAllScheduledPostsInstagram(selectedPageName);
                instagramPost = scheduledInstagramPosts.find((post) => String(post.id) === String(item.id));
            } catch (error) {
                console.error("Error fetching Instagram posts:", error);
            }
            let platformType = instagramPost ? "INSTAGRAM" : "FACEBOOK";

            switch (platformType) {
                case "INSTAGRAM":
                    await editScheduledPostInstagram(
                        updatedItem.id,
                        updatedItem.caption,
                        Math.floor(updatedItem.time.getTime() / 1000),
                    );
                    break;
                case "FACEBOOK":
                    await editScheduledPostFacebook(
                        selectedPageToken,
                        updatedItem.id,
                        updatedItem.caption,
                        updatedItem.time
                    );

                    if (newImageUrl !== item.imageUrl) {
                        await handleChangeImageForFacebook();
                    }
                    break;
                default:
                    console.error("Unknown platform type");
            }

            setIsUpdatedPost(true);
            onSave(updatedItem);
            getAllScheduledPosts();
            onClose();
            toast.success("Update successfully!");
        } catch (error) {
            toast.error("Failed to save changes. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };


    const handleDeletePostWithId = async () => {
        if (!item.id || !selectedPageToken) {
            toast.error("Please make sure the post has a valid ID.");
            return;
        }

        if (!selectedPageName) {
            return;
        }

        setIsDeleting(true);
        try {
            let isInstagramPost = false;
            try {
                const scheduledInstagramPosts = await getAllScheduledPostsInstagram(selectedPageName);
                isInstagramPost = scheduledInstagramPosts.some((post: InstagramPost) => String(post.id) === String(item.id));
            } catch (error) {
                console.error("Error fetching Instagram posts:", error);
            }

            if (isInstagramPost) {
                await deleteScheduledPostInstagram(item.id, selectedPageName);
            } else {
                await deleteScheduledPostFacebook(selectedPageToken, item.id);
            }

            toast.success("Deleted successfully");
            setIsDeletedPost(true);
            await getAllScheduledPosts();
            onClose();
        } catch (error) {
        } finally {
            setIsDeleting(false);
        }
    };

    const handleChangeImageForFacebook = async () => {
        if (!newImageUrl.trim()) {
            toast.error("Image URL cannot be empty.");
            return;
        }

        setIsSaving(true);
        try {
            await deleteScheduledPostFacebook(selectedPageToken, item.id);

            const scheduledTime = Math.floor(new Date(time).getTime() / 1000);

            await schedulePostFacebook(
                selectedPageToken,
                selectedPageId,
                caption,
                newImageUrl,
                scheduledTime
            );

            setIsUpdatedPost(true);
            await getAllScheduledPosts();
            onClose();
        } catch (error) {
            toast.error("Failed to update image. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };


    const adjustTimeToLocal = (time: Date) => {
        const localTime = new Date(time);
        const year = localTime.getFullYear();
        const month = String(localTime.getMonth() + 1).padStart(2, "0");
        const day = String(localTime.getDate()).padStart(2, "0");
        const hours = String(localTime.getHours()).padStart(2, "0");
        const minutes = String(localTime.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 100; // Giới hạn số ký tự hiển thị

    const toggleExpand = () => setIsExpanded(!isExpanded);
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="flex justify-center rounded-md  min-w-[500px]">
                <div
                    ref={popupRef}
                    className={`bg-white shadow border border-gray-300 rounded-lg w-full max-w-[500px] ${isExpanded ? 'max-h-[90vh] overflow-y-auto' : 'max-h-[95vh] overflow-hidden'
                        } flex flex-col p-2`}
                >
                    <div className="flex justify-between items-center px-2">
                        <div className="flex items-center">
                            <div className="flex justify-end items-center space-x-2 flex-shrink-0 pt-2">
                                {!(isEditingCaption || isEditingTime || isEditingImage) && (
                                    <button
                                        onClick={handleDeletePostWithId}
                                        className="text-white bg-dashboard-red hover:bg-dashboard-red/90 font-semibold  p-2 rounded-full flex items-center justify-center"
                                        disabled={isDeleting || isSaving}
                                    >
                                        {isDeleting ? "Deleting..." : <FaTrashAlt size={15} />}
                                    </button>
                                )}

                                {(isEditingCaption || isEditingTime || isEditingImage) && (
                                    <button
                                        onClick={handleChange}
                                        className="text-white bg-blue-600 hover:bg-blue-500 p-2 rounded-full flex items-center justify-center"
                                        disabled={isDeleting || isSaving}
                                    >
                                        {isSaving ? "Saving..." : <IoIosSave size={15} />}
                                    </button>
                                )}


                            </div>
                        </div>

                        <div>
                            <button onClick={onClose} className="text-gray-500 flex justify-end p-2">
                                <MdClose size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="p-4 flex items-start">
                        <img alt="Profile picture" className="rounded-full w-10 h-10" src={images.loadingGenerate} />
                        <div className="ml-3 flex-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="font-bold text-primary-black/">{selectedPageName}</span>
                                </div>
                            </div>
                            <div className="text-gray-500 text-sm flex items-center justify-between">
                                <div>
                                    {isEditingTime ? (
                                        <input
                                            type="datetime-local"
                                            value={adjustTimeToLocal(time)}
                                            onChange={(e) => setTime(new Date(e.target.value))}
                                            className="p-1 border rounded-md"
                                        />
                                    ) : (
                                        <span>{new Date(time).toLocaleString()}</span>
                                    )}
                                    <i className="fas fa-globe-americas ml-1"></i>
                                </div>
                                <button
                                    className="text-primary-black"
                                    onClick={() => setIsEditingTime(!isEditingTime)}
                                >
                                    <MdEdit
                                        size={20}
                                        className={isEditingTime ? "text-primary" : "hover:text-primary"}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    <button
                        className="flex justify-end mr-4 text-primary-black"
                        onClick={() => setIsEditingCaption(!isEditingCaption)}
                    >
                        <MdEdit size={20}
                            className={isEditingCaption ? "text-primary" : "hover:text-primary"}
                        />
                    </button>

                    <div className="px-4 pb-4 flex-1">
                        <div className="w-full flex flex-col">
                            {isEditingCaption ? (
                                <textarea
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    className="w-full p-2 border rounded-md resize-none  min-w-[450px] min-h-[250px] text-sm"


                                />

                            ) : (
                                <div className="w-full flex flex-col">
                                    <p className="text-primary-black whitespace-pre-wrap text-sm">
                                        {isExpanded || caption.length <= maxLength
                                            ? caption
                                            : `${caption.substring(0, maxLength)}...`}
                                    </p>

                                    {caption.length > maxLength && (
                                        <button
                                            onClick={toggleExpand}
                                            className="text-blue-500 underline   hover:underline mt-1 self-end"
                                        >
                                            {isExpanded ? "See less" : "See more"}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="relative p-2 flex-shrink-0">
                        <img
                            alt="Image not available, please input the Image Url"
                            className="w-full h-[200px] object-contain rounded-md"
                            src={item.imageUrl}
                        />
                        <button
                            onClick={() => setIsEditingImage(!isEditingImage)}
                            className="absolute top-3 right-4 bg-white text-primary-black p-1 rounded-full"
                        >
                            <MdEdit size={20}
                                className={isEditingImage ? "text-primary" : "hover:text-primary"}
                            />
                        </button>
                    </div>

                    {isEditingImage && (
                        <div className="px-4 pb-4 flex-shrink-0">
                            <input
                                type="text"
                                value={newImageUrl}
                                onChange={(e) => setNewImageUrl(e.target.value)}
                                className="w-full p-2 border rounded-md"
                                placeholder="Enter new image URL"
                            />
                        </div>
                    )}

                    <div className="w-full p-2">
                        <div>
                            <div className="flex items-center justify-between text-gray-600 text-sm">
                                <div className="flex items-center space-x-1">
                                    <img alt="Reaction icon 1" className="w-5 h-5" height="20" src={icons.iconLike} width="20" />
                                    <img alt="Reaction icon 2" className="w-5 h-5" height="20" src={icons.iconLove} width="20" />
                                    <img alt="Reaction icon 3" className="w-5 h-5" height="20" src={icons.iconHaha} width="20" />
                                    <span>100k</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <i className="fas fa-pen"></i>
                                    <span>21 Comments 10 Shares</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <button className="flex items-center space-x-1 text-blue-600">
                                    <i className="fas fa-thumbs-up"></i>
                                    <span className="flex items-center font-semibold gap-2">
                                        <AiFillLike size={20} />
                                        Like
                                    </span>
                                </button>
                                <button className="flex items-center space-x-1 text-gray-600">
                                    <i className="fas fa-share"></i>
                                    <span className="flex items-center gap-2 font-semibold">
                                        <FaShare size={20} />
                                        Share
                                    </span>
                                </button>
                            </div>
                            <div className="mt-4 text-gray-600 text-sm">
                                <span>View more 16 Comments</span>
                            </div>
                            <div className="flex items-center mt-4">
                                <img alt="User avatar" className="w-10 h-10 rounded-full" height="40" src="https://storage.googleapis.com/a1aa/image/ryJKlu1hDIHkPoIhqjidn2fTjgjXMmDDcM_K8yXbYsU.jpg" width="40" />
                                <div className="flex-1 ml-2 bg-gray-100 rounded-full flex items-center px-3 py-2">
                                    <input className="flex-1 bg-transparent outline-none text-sm" placeholder="Write a comment..." type="text" />
                                    <div className="flex items-center space-x-2 text-gray-500">
                                        <i className="fas fa-smile"></i>
                                        <i className="fas fa-camera"></i>
                                        <i className="fas fa-image"></i>
                                        <i className="fas fa-sticky-note"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};