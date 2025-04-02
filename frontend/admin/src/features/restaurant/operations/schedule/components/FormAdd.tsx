import { useState } from "react";
import { IShift, IStaff } from "@/types/schedule";
import { useQuery } from "@tanstack/react-query";

import { useTranslation } from "react-i18next";
import { getAllStaffAPI } from "../api/schedule";
import { addShift } from "../services/shift";

async function getAllStaff() {
    const res = await getAllStaffAPI();
    return res?.data.data;
}

interface FormAddProps {
    setOpenForm: (value: boolean) => void;
    shifts: IShift[];
    setShifts: (value: IShift[]) => void;
}
const FormAdd: React.FC<FormAddProps> = ({
    setOpenForm,
    shifts,
    setShifts,
}) => {
    const { t } = useTranslation();
    const { data } = useQuery({
        queryKey: ["fetchStaff"],
        queryFn: getAllStaff,
    });

    const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
    const [date, setDate] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleScheduleShift = async () => {
        if (!selectedStaff || !date || !startTime || !endTime) {
            setError(t("Please fill out all fields."));
            return;
        }

        const startDateTime = new Date(`${date}T${startTime}`);
        const endDateTime = new Date(`${date}T${endTime}`);

        if (startDateTime >= endDateTime) {
            setError(t("End time must be after the start time."));
            return;
        }

        const staff = data.find((s: IStaff) => s.user_id === selectedStaff);
        if (!staff) return;

        const newShift: IShift = {
            _id: staff._id,
            staffId: staff.user_id,
            staffName: staff.fullName,
            start: startDateTime,
            end: endDateTime,
            title: `${staff.fullName} ${t("shift")}`,
        };
        await addShift(newShift);
        setShifts([...shifts, newShift]);
        clearForm();
        setOpenForm(false);
    };

    const clearForm = () => {
        setSelectedStaff(null);
        setDate("");
        setStartTime("");
        setEndTime("");
        setError(null);
    };
    return (
        <div
            onClick={() => setOpenForm(false)}
            className="fixed inset-0 z-40 bg-opacity-50 bg-black backdrop-blur-sm w-screen h-screen p-[100px] flex justify-center items-baseline"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-fit  py-5 px-10 h-auto flex flex-row shadow-2xl rounded-md relative"
            >
                <div className="schedule-form ">
                    <span className="text-xl font-semibold">
                        {t("Schedule a New Shift")}
                    </span>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleScheduleShift();
                        }}
                    >
                        <div>
                            <label>{t("Staff Member")}</label>
                            <select
                                value={selectedStaff || ""}
                                onChange={(e) =>
                                    setSelectedStaff(e.target.value)
                                }
                            >
                                <option value="" disabled>
                                    {t("Select Staff")}
                                </option>
                                {data?.map((staff: IStaff) => (
                                    <option
                                        key={staff.user_id}
                                        value={staff.user_id}
                                    >
                                        {staff.fullName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>{t("Date")}</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>{t("Start Time")}</label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>{t("End Time")}</label>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </div>

                        {error && <p style={{ color: "red" }}>{t(error)}</p>}

                        <button type="submit">{t("Schedule Shift")}</button>
                    </form>
                </div>
                <div
                    onClick={() => setOpenForm(false)}
                    className="text-red-600 cursor-pointer text-xl absolute top-5 right-5 hover:text-red-200"
                >
                    X
                </div>
            </div>
        </div>
    );
};
export default FormAdd;
