import React, { useState } from "react";
import { IScheduleItem } from "../../types/schedule";
import { EditSchedulePopup } from "./EditSchedulePopup";
import { icons } from "@/assets/assets";

interface CalendarItemProps extends IScheduleItem {
    onUpdate?: (updatedItem: IScheduleItem) => void;
    pages: { id: string; name: string; access_token: string }[];
    selectedPageToken: string;
    setIsDeletedPost: (isDeletedPost: boolean) => void;
    setIsUpdatedPost: (isUpdatedPost: boolean) => void;
    selectedPageName: string;
    getAllScheduledPosts: () => void;
    setSelectedPageId: React.Dispatch<React.SetStateAction<string>>;
    setSelectedPageToken: React.Dispatch<React.SetStateAction<string>>;
    postCount: number;
    postsInDay: IScheduleItem[];
    onViewDetailClick: () => void;

}


export const CalendarItem: React.FC<CalendarItemProps> = ({
    selectedPageToken,
    pages,
    setIsDeletedPost,
    setSelectedPageId,
    setSelectedPageToken,
    setIsUpdatedPost,
    getAllScheduledPosts,
    selectedPageName,
    onUpdate,
    postCount,
    postsInDay,
    ...item
}) => {
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [selectedPost, setSelectedPost] = useState<IScheduleItem | null>(null);

    const formatTime = (date: Date) => {
        const hours = date.getHours();
        const period = hours >= 12 ? "PM" : "AM";
        const formattedHour = hours % 12 || 12;
        return `${formattedHour}${period.toLowerCase()}`;
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowEditPopup(true);
    };

    const handleSave = (updatedItem: IScheduleItem) => {
        onUpdate?.(updatedItem);
    };






    return (
        <>
            <div
                onClick={handleClick}
                className="w-full h-max flex items-center justify-between gap-2 cursor-pointer rounded-md transition-colors relative"
            >

                <div className="w-max max-w-1/2 h-full rounded-md flex justify-start items-center truncate p-1">
                    <img
                        src={item.page.includes("Facebook") ? icons.iconFacebook : icons.iconInstagram}
                        alt="Platform Icon"
                        className="w-10 h-10 mr-1"
                    />
                </div>

                <div className="w-1/2 h-full flex items-center justify-end text-sm text-slate-400">
                    {formatTime(new Date(item.time))}
                </div>
            </div>




        </>
    );
};