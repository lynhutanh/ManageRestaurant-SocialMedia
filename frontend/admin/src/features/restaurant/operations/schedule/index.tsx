//components
import { useEffect, useState } from "react";
import ShiftSchedulerCalendar from "./components/ShiftSchedulerCalendar";
import { IShift } from "../../../../types/schedule";
import "./css/calendar.css";
import FormAdd from "./components/FormAdd";
import { getShift } from "./services/shift";
import { deleteShiftAPI } from "./api/schedule";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function Schedule() {
    const { t } = useTranslation();
    const [shifts, setShifts] = useState<IShift[]>([]);
    const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
    const [list, setList] = useState<IShift[]>([]);

    const fetchShifts = async () => {
        const rs = await getShift();
        const rs2 = rs.map((item: IShift) => {
            return {
                _id: item._id,
                staffId: item.staffId,
                staffName: item.staffName,
                start: new Date(item.start),
                end: new Date(item.end),
                title: item.title,
            };
        });
        setList(rs2);
    };
    useEffect(() => {
        fetchShifts();
    }, [shifts]);

    const handleDeleteShift = async (shiftId: string) => {
        if (!shiftId) {
            toast.error(t("Please select a shift to delete"));
            return;
        }
        const response = await deleteShiftAPI(shiftId);
        if (response.status === 200) {
            fetchShifts();
            toast(t("Delete shift successfully"), { type: "success" });
        } else {
            console.error(t("Failed to delete shift"));
        }
    };

    return (
        <>
            {/* content */}
            {isOpenForm && (
                <FormAdd
                    setOpenForm={setIsOpenForm}
                    shifts={shifts}
                    setShifts={setShifts}
                />
            )}

            <div className="w-full h-full flex items-center justify-center">
                <ShiftSchedulerCalendar
                    setIsOpenForm={setIsOpenForm}
                    handleDeleteShift={handleDeleteShift}
                    shifts={list}
                />
            </div>
        </>
    );
}
