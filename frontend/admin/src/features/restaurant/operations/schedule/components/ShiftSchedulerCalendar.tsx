import React, { useState } from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FaDeleteLeft } from "react-icons/fa6";

import { IShift } from "@/types/schedule";

import { useTranslation } from "react-i18next";
import { IoAddOutline } from "react-icons/io5";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const localizer = momentLocalizer(moment);

interface EventProps {
    shifts: IShift[];
    handleDeleteShift: (shiftId: string) => void;
    setIsOpenForm: (value: boolean) => void;
}
const ShiftSchedulerCalendar: React.FC<EventProps> = ({
    shifts,
    handleDeleteShift,
    setIsOpenForm,
}) => {
    const { t } = useTranslation();
    const [selectedShift, setSelectedShift] = useState<string | null>(null);
    const handleSelectEvent = (event: any) => {
        setSelectedShift(event._id);
    };

    return (
        <div className="shift-scheduler p-5">
            <div className="flex flex-row justify-between items-center">
                <span className="text-2xl font-semibold text-primary">
                    {t("Schedule Staff Shifts")}
                </span>
                <div className="flex justify-end items-center  gap-3">
                    <div
                        onClick={() => setIsOpenForm(true)}
                        className="flex items-center justify-center px-4 py-2 cursor-pointer w-max text-lg font-semibold bg-dashboard-green rounded-md text-white  hover:bg-dashboard-green/90 transition-colors duration-200 ease-in-out"
                    >
                        <span className="flex gap-2 items-center">
                            <IoAddOutline className="text-2xl " />
                            {t("Add new schedule")}
                        </span>
                    </div>
                    <div
                        onClick={() =>
                            handleDeleteShift(selectedShift as string)
                        }
                        className="flex items-center justify-center px-4 py-2 cursor-pointer w-max bg-transparent  border-dashboard-red border-2 rounded-md text-dashboard-red  hover:bg-dashboard-red/20 font-semibold transition-colors duration-200 ease-in-out"
                    >
                        <span className=" flex gap-2 items-center">
                            <FaDeleteLeft className="text-xl " />
                            {t("Delete schedule")}
                        </span>
                    </div>
                </div>
            </div>
            <div
                className="calendar-container"
                style={{ height: "auto", marginTop: "40px" }}
            >
                <Calendar
                    localizer={localizer}
                    events={shifts as Event[]}
                    startAccessor="start"
                    endAccessor="end"
                    titleAccessor="title"
                    defaultView="week"
                    style={{ height: 500 }}
                    views={["month", "week", "day"]}
                    onSelectEvent={handleSelectEvent}
                />
            </div>
        </div>
    );
};
export default ShiftSchedulerCalendar;
