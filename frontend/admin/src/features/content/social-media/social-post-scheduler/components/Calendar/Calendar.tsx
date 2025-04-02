import React, { useMemo, useState } from "react";
import { IScheduleItem } from "../../types/schedule";
import { CalendarItem } from './CalendarItem';
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import DropdownMenu from "../Schedule/DropdownPages";
import Tooltip from "@components/tooltip/ToolTip";
import { icons } from "@/assets/assets";
import { EditSchedulePopup } from "./EditSchedulePopup";
import { IoEyeSharp } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { GrSchedules } from "react-icons/gr";
import { LuCalendarDays } from "react-icons/lu";


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

interface CalendarProps {
    onClick?: (_day: number, _month: number, _year: number) => void;
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
    setSelectedPageToken: (token: string) => void;

}

export const Calendar: React.FC<CalendarProps> = ({
    onClick,
    setIsDeletedPost,
    setIsUpdatedPost,
    scheduleItems,
    onUpdateItem,
    handleSelectPageFacebookSchedule,
    pages,
    selectedPageName,
    setSelectedPageName,
    getAllScheduledPosts
}) => {


    const [selectedPageToken, setSelectedPageToken] = useState('');
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [selectedPageId, setSelectedPageId] = useState<string>("");

    const [showDetailPopup, setShowDetailPopup] = useState(false);
    const [selectedDatePosts, setSelectedDatePosts] = useState<IScheduleItem[]>([]);
    const [selectedPost, setSelectedPost] = useState<IScheduleItem | null>(null);
    const today = new Date();
    const handleSave = (updatedItem: IScheduleItem) => {

        setShowEditPopup(false);
    };
    const [currentDate, setCurrentDate] = useState<Date>(today);
    const handleViewDetailClick = (date: Date) => {
        const postsInDay = scheduleItems.filter((item) => {
            const itemDate = new Date(item.time);
            return (
                itemDate.getDate() === date.getDate() &&
                itemDate.getMonth() === date.getMonth() &&
                itemDate.getFullYear() === date.getFullYear()
            );
        });

        const sortedPosts = postsInDay.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

        setSelectedDatePosts(sortedPosts);
        setShowDetailPopup(true);
    };
    const handlePostClick = (post: IScheduleItem) => {
        setSelectedPost(post);
        setShowEditPopup(true);
        setShowDetailPopup(false);
    };

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

    const handleDayClick = (date: Date) => {
        if (onClick) {
            onClick(date.getDate(), date.getMonth(), date.getFullYear());
        }
    };

    const handlePageSelect = (page: { id: string; name: string; access_token: string }) => {
        handleSelectPageFacebookSchedule(page);
        setSelectedPageName(page.name);
        setSelectedPageToken(page.access_token);
        setSelectedPageId(page.id)

    };

    const formatTime = (date: Date) => {
        const hours = date.getHours();
        const period = hours >= 12 ? "PM" : "AM";
        const formattedHour = hours % 12 || 12;
        return `${formattedHour}${period.toLowerCase()}`;
    };

    const generateWeeks = () => {
        const middleWeekStart = new Date(currentDate);
        middleWeekStart.setDate(currentDate.getDate() - currentDate.getDay());

        const firstWeekStart = new Date(middleWeekStart);
        firstWeekStart.setDate(middleWeekStart.getDate() - 7);

        const days = Array.from({ length: 21 }, (_, i) => {
            const date = new Date(firstWeekStart);
            date.setDate(firstWeekStart.getDate() + i);
            return date;
        });

        const weeks = Array.from({ length: 3 }, (_, weekIndex) => {
            const weekDays = days.slice(weekIndex * 7, (weekIndex + 1) * 7);

            return (
                <div className="flex w-full" key={`week-${weekIndex}`}>
                    {weekDays.map((date, index) => {
                        const postCount = calculatePostCount(date);

                        const isToday =
                            today.getDate() === date.getDate() &&
                            today.getMonth() === date.getMonth() &&
                            today.getFullYear() === date.getFullYear();

                        const isCurrentWeek = weekIndex === 1;

                        // Lọc và sắp xếp các bài đăng trong ngày
                        const postsInDay = scheduleItems
                            .filter((item) => {
                                const itemDate = new Date(item.time);
                                return (
                                    itemDate.getDate() === date.getDate() &&
                                    itemDate.getMonth() === date.getMonth() &&
                                    itemDate.getFullYear() === date.getFullYear()
                                );
                            })
                            .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

                        return (
                            <div
                                key={`${weekIndex}-${index}`}
                                onClick={() => handleDayClick(date)}
                                className={`relative flex flex-col justify-center items-center  m-[-0.5px] group aspect-square w-full grow cursor-pointer rounded-xl border font-medium transition-all hover:z-20 hover:border-primary/60 hover:bg-primary/5  sm:-m-px sm:size-20 sm:rounded-2xl sm:border-2 lg:size-36 lg:rounded-3xl 2xl:size-40 ${isCurrentWeek
                                    ? "border-primary/20"
                                    : "opacity-30"
                                    }`}
                            >
                                {calculatePostCount(date) > 0 && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleViewDetailClick(date);
                                        }}
                                        title="View Scheduled Posts List"
                                        className="absolute top-2 right-2 text-sm"
                                    >
                                        <div className="relative">
                                            <GrSchedules className="h-6 w-6 text-primary-black hover:text-dashboard-blue" />
                                            <span className="absolute -top-1 -right-1 flex items-center justify-center size-4 rounded-full bg-dashboard-blue text-white text-xs">
                                                {calculatePostCount(date)}
                                            </span>
                                        </div>
                                    </button>
                                )}

                                <span
                                    className={`absolute left-1 top-1 flex size-5 items-center justify-center rounded-full text-xs sm:size-6 sm:text-sm lg:left-2 lg:top-2 lg:size-8 lg:text-base ${isToday
                                        ? "bg-dashboard-yellow font-semibold text-white"
                                        : "text-primary-black"
                                        }`}
                                >
                                    {date.getDate()}
                                </span>

                                <div className="w-full h-2/5 px-2 absolute flex flex-col justify-start items-start overflow-y-scroll scrollbar-hidden gap-2">
                                    {postsInDay.map((item) => (
                                        <CalendarItem
                                            pages={pages}
                                            key={item.id}
                                            {...item}
                                            onUpdate={onUpdateItem}
                                            selectedPageToken={selectedPageToken}
                                            setIsDeletedPost={setIsDeletedPost}
                                            setIsUpdatedPost={setIsUpdatedPost}
                                            selectedPageName={selectedPageName}
                                            getAllScheduledPosts={getAllScheduledPosts}
                                            setSelectedPageToken={setSelectedPageToken}
                                            setSelectedPageId={setSelectedPageId}
                                            postsInDay={postsInDay}
                                            postCount={postCount}
                                            onViewDetailClick={() => handleViewDetailClick(date)}
                                        />
                                    ))}
                                </div>
                                <span className="absolute bottom-0.5 left-0 w-full truncate px-1.5 text-sm font-semibold text-primary-black/50 sm:bottom-0 sm:text-lg lg:bottom-2.5 lg:left-3.5 lg:w-fit lg:px-0">
                                    {monthNames[date.getMonth()].slice(0, 3)}
                                </span>
                            </div>
                        );
                    })}
                </div>
            );
        });

        return weeks;
    };
    const calculatePostCount = (date: Date) => {
        return scheduleItems.filter((item) => {
            const itemDate = new Date(item.time);
            return (
                itemDate.getDate() === date.getDate() &&
                itemDate.getMonth() === date.getMonth() &&
                itemDate.getFullYear() === date.getFullYear()
            );
        }).length;
    };

    return (
        <div className="bg-white pb-10 text-primary-black ">

            <div className="w-[600px] flex-col items-center gap-2 py-3 ml-4">
                <label className="text-sm font-semibold text-pri  w-auto flex py-2  ">Select a page to view scheduled posts:
                    <Tooltip
                        title=""
                        content="Choose a page to view and manage scheduled posts, including their status, platform, and actions like edit or remove."
                        altTitle="View scheduled Posts  "
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

            <div className="w-full rounded-t-2xl bg-white px-5 sm:px-5">
                <div className="mb-4 flex w-full items-center justify-between">
                    <div className="flex items-center gap-4 ">
                        <h1 className="text-xl font-semibold text-primary-black">
                            {`${monthNames[currentDate.getMonth()]
                                } ${currentDate.getFullYear()}`}
                        </h1>
                        <button
                            onClick={handleTodayClick}
                            className="rounded-lg border  border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-primary-black hover:bg-gray-100 lg:px-5 lg:py-2.5"
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
                <div className="grid w-full grid-cols-7 justify-between text-slate-500">
                    {daysOfWeek.map((day, index) => (
                        <div
                            key={index}
                            className="w-full border-b border-slate-200 py-2 text-center font-semibold"
                        >
                            {day}
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full px-5 pt-4 sm:px-5 sm:pt-6">
                {generateWeeks()}
            </div>
            {showDetailPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-primary-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2 text-primary"><LuCalendarDays className="text-primary" size={30} /> List Scheduled Posts</h2>
                            <button
                                onClick={() => setShowDetailPopup(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <IoMdClose className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex-col items-center justify-between p-4 rounded-lg max-h-80 overflow-y-auto">
                                {selectedDatePosts.map((post, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 border-b cursor-pointer"
                                        onClick={() => handlePostClick(post)}
                                    >
                                        <div className="flex items-center">
                                            <img
                                                src={post.page.includes("Facebook") ? icons.iconFacebook : icons.iconInstagram}
                                                alt="Platform Icon"
                                                className="w-10 h-10 mr-4"
                                            />
                                            <div>
                                                <p className="font-semibold">{post.page}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500">{formatTime(new Date(post.time))}</p>

                                        <span className="text-dashboard-blue hover:underline">View </span>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showEditPopup && selectedPost && (
                <EditSchedulePopup
                    item={selectedPost}
                    onClose={() => setShowEditPopup(false)}
                    onSave={handleSave}
                    selectedPageToken={selectedPageToken}
                    selectedPageId={selectedPageId}
                    setIsDeletedPost={setIsDeletedPost}
                    setIsUpdatedPost={setIsUpdatedPost}
                    selectedPageName={selectedPageName}
                    getAllScheduledPosts={getAllScheduledPosts}
                    setSelectedPageToken={setSelectedPageToken}
                    setSelectedPageId={setSelectedPageId}
                />
            )}
        </div>
    );
};