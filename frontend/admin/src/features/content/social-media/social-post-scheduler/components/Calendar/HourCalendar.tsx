"use client";

import React, { useMemo, useRef, useState } from "react";
import { IScheduleItem } from "../../types/schedule";
import { EditSchedulePopup } from "./EditSchedulePopup";
import { IoMdArrowDropdown } from "react-icons/io";
import { editScheduledPostFacebook } from "../../api/social-media";
import DropdownMenu from "../Schedule/DropdownPages";
import Tooltip from "@/components/tooltip/ToolTip";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

interface HourlyCalendarProps {
    onClick?: (
        _hour: number,
        _day: number,
        _month: number,
        _year: number
    ) => void;
    scheduleItems: IScheduleItem[];
    onUpdateItem?: (updatedItem: IScheduleItem) => void;
    selectedPageName: string;
    setSelectedPageName: (name: string) => void;
    isOpenListFaceBookSchedule: boolean;
    setisOpenListFaceBookSchedule: (open: boolean) => void;
    pages: { id: string; name: string; access_token: string }[];
    loading: boolean;
    handleSelectPageFacebookSchedule: (page: { id: string; name: string; access_token: string }) => void;
    setIsDeletedPost: (isDeletedPost: boolean) => void;
    setIsUpdatedPost: (isUpdatedPost: boolean) => void;
    getAllScheduledPosts: () => void;
    setSelectedPageId: (id: string) => void;



}

export const HourlyCalendar: React.FC<HourlyCalendarProps> = ({
    onClick,
    setIsDeletedPost,
    setIsUpdatedPost,
    setSelectedPageId,
    scheduleItems,
    onUpdateItem,
    handleSelectPageFacebookSchedule,
    pages,
    selectedPageName,
    getAllScheduledPosts,
    setSelectedPageName,

}) => {
    const handlePageSelect = (page: { id: string; name: string; access_token: string }) => {
        handleSelectPageFacebookSchedule(page);
        setSelectedPageName(page.name);
        setSelectedPageToken(page.access_token);
        setIsDropdownOpen(false);
    };



    const [selectedPageToken, setSelectedPageToken] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const today = new Date();
    const [currentDate, setCurrentDate] = useState<Date>(today);
    const formRef = useRef<HTMLFormElement>(null);





    const handlePrevWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 7);
        setCurrentDate(newDate);
    };

    const handleNextWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 7);
        setCurrentDate(newDate);
    };

    const handleTodayClick = () => {
        setCurrentDate(new Date());
    };

    const handleTimeClick = (hour: number, date: Date) => {
        if (onClick) {
            onClick(hour, date.getDate(), date.getMonth(), date.getFullYear());
        }
    };

    const getItemsForTimeSlot = (date: Date, hour: number) => {
        return scheduleItems.filter((item) => {
            const itemDate = new Date(item.time);
            return (
                itemDate.getDate() === date.getDate() &&
                itemDate.getMonth() === date.getMonth() &&
                itemDate.getFullYear() === date.getFullYear() &&
                itemDate.getHours() === hour
            );
        });
    };

    const generateTimeGrid = useMemo(() => {
        // Get the start of the week
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay());

        // Generate week days
        const weekDays = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + i);
            return date;
        });

        return (
            <div className="relative">
                <div className="grid grid-cols-[auto_1fr] gap-4">
                    <div className="space-y-8 pr-4 text-right min-w-[60px]"></div>
                    {/* Day headers */}
                    <div className="grid grid-cols-7 gap-4 border-b pb-4">
                        {weekDays.map((date, index) => {
                            const isToday =
                                today.getDate() === date.getDate() &&
                                today.getMonth() === date.getMonth() &&
                                today.getFullYear() === date.getFullYear();

                            return (
                                <div
                                    key={index}
                                    className={`text-center ${isToday
                                        ? "rounded-lg bg-blue-50 py-2"
                                        : "py-2"
                                        }`}
                                >
                                    <div className="text-sm font-semibold text-slate-600">
                                        {daysOfWeek[date.getDay()]}
                                    </div>
                                    <div className="text-lg font-bold text-slate-800">
                                        {date.getDate()}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Time grid */}
                <div className="relative mt-4">
                    {/* Current time indicator */}
                    <div
                        className="absolute left-0 right-0 border-t-2 border-blue-500 z-10"
                        style={{
                            top: `${(today.getHours() * 60 + today.getMinutes()) *
                                (100 / 1440)
                                }%`,
                        }}
                    />

                    {/* Time slots */}
                    <div className="grid grid-cols-[auto_1fr] gap-4">
                        {/* Time labels */}
                        <div className="space-y-8 pr-4 text-right">
                            {Array.from({ length: 24 }, (_, i) => (
                                <div
                                    key={i}
                                    className="text-sm text-slate-500 h-24"
                                >
                                    {i.toString().padStart(2, "0")}:00
                                </div>
                            ))}
                        </div>

                        {/* Events grid */}
                        <div className="relative grid grid-cols-7 gap-4">
                            {weekDays.map((date, dayIndex) => (
                                <div key={dayIndex} className="relative">
                                    <div className="absolute inset-0 grid grid-rows-24 gap-1">
                                        {Array.from(
                                            { length: 24 },
                                            (_, hour) => {
                                                const isNow =
                                                    today.getDate() ===
                                                    date.getDate() &&
                                                    today.getMonth() ===
                                                    date.getMonth() &&
                                                    today.getFullYear() ===
                                                    date.getFullYear() &&
                                                    today.getHours() === hour;
                                                const itemsInSlot =
                                                    getItemsForTimeSlot(
                                                        date,
                                                        hour
                                                    );

                                                return (
                                                    <div
                                                        key={hour}
                                                        onClick={() =>
                                                            handleTimeClick(
                                                                hour,
                                                                date
                                                            )
                                                        }

                                                        className={`group relative h-full rounded-lg border transition-all hover:border-primary ${isNow
                                                            ? "border-primary/20 bg-blue-50"
                                                            : "border-slate-200"
                                                            }`}
                                                    >
                                                        {itemsInSlot.map(
                                                            (item) => (
                                                                <div
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    className="absolute inset-x-0 top-0 m-1 rounded-lg bg-white p-2 shadow-md border border-blue-200"
                                                                >
                                                                    <div className="flex items-start justify-between">
                                                                        <div className="flex-1 min-w-0">
                                                                            <h3 className="text-sm font-medium text-gray-900 truncate">
                                                                                {
                                                                                    item.caption
                                                                                }
                                                                            </h3>
                                                                            <p className="text-xs text-gray-500 truncate">
                                                                                {
                                                                                    item.page
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                        <div className="ml-2 flex-shrink-0">
                                                                            <div className="flex space-x-1">
                                                                                <button
                                                                                    onClick={(
                                                                                        e
                                                                                    ) => {
                                                                                        e.stopPropagation();
                                                                                        setEditingItem(
                                                                                            item
                                                                                        );
                                                                                    }}
                                                                                    className="p-1 text-dashboard-yellow hover:text-dashboard-yellow/80"
                                                                                >
                                                                                    <svg
                                                                                        className="w-4 h-4"
                                                                                        fill="none"
                                                                                        stroke="currentColor"
                                                                                        viewBox="0 0 24 24"
                                                                                    >
                                                                                        <path
                                                                                            strokeLinecap="round"
                                                                                            strokeLinejoin="round"
                                                                                            strokeWidth={
                                                                                                2
                                                                                            }
                                                                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                                                        />
                                                                                    </svg>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }, [currentDate, scheduleItems]);

    // Add state for editing item
    const [editingItem, setEditingItem] = useState<IScheduleItem | null>(null);

    return (
        <div className="rounded-b-md bg-white pb-10 text-primary-black h-auto">
            <div className=" top-0 z-20 w-full rounded-t-2xl bg-white px-5">
                <div className="w-[600px] flex-col items-center gap-2 py-3">
                    <label className="text-sm font-semibold text-primary-black  w-auto flex py-2  ">Select a page to view scheduled posts:

                        <Tooltip
                            title=""
                            content="Choose a page to view and manage scheduled posts, including their status, platform, and actions like edit or remove."
                            altTitle="View scheduled Posts"
                            className="text-dashboard-blue hover:text-dashboard-blue/90"
                        /></label>
                    <div className="w-[300px]">
                        <DropdownMenu
                            selectedPageName={selectedPageName}
                            pages={pages}
                            onSelectPage={handlePageSelect}
                            isInstagram={false}

                        />
                    </div>

                </div>
                <div className="mb-4 flex w-full items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-semibold">
                            {`${monthNames[currentDate.getMonth()]
                                } ${currentDate.getFullYear()}`}
                        </h1>
                        <button
                            onClick={handleTodayClick}
                            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 lg:px-5 lg:py-2.5"
                        >
                            Today
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handlePrevWeek}
                            className="rounded-full border border-slate-300 p-1 transition-colors hover:bg-slate-100 sm:p-2"
                        >
                            <svg
                                className="size-5 text-slate-800"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m15 19-7-7 7-7"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={handleNextWeek}
                            className="rounded-full border border-slate-300 p-1 transition-colors hover:bg-slate-100 sm:p-2"
                        >
                            <svg
                                className="size-5 text-slate-800"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m9 5 7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-h-[80vh] overflow-y-auto px-5 pt-4 sm:pt-6">
                {generateTimeGrid}
            </div>

            {/* Add EditSchedulePopup */}
            {editingItem && (
                <EditSchedulePopup
                    item={editingItem}
                    onClose={() => setEditingItem(null)}
                    onSave={(updatedItem) => {
                        onUpdateItem?.(updatedItem);
                        setEditingItem(null);
                    }}
                    setIsDeletedPost={setIsDeletedPost}
                    setIsUpdatedPost={setIsUpdatedPost}
                    selectedPageToken={selectedPageToken}
                    selectedPageName={selectedPageName}
                    getAllScheduledPosts={getAllScheduledPosts}
                    setSelectedPageId={setSelectedPageId}
                    setSelectedPageToken={setSelectedPageToken}
                />
            )}
        </div>
    );
};
