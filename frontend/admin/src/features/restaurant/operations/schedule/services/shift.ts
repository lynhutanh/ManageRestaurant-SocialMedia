import { IShift } from "@/types/schedule";
import { getShiftsAPI, addShiftAPI } from "../api/schedule";
export const getShift = async (): Promise<IShift[]> => {
    const res = await getShiftsAPI();
    return res?.data.data;
};
export const addShift = async (data: any) => {
    const res = await addShiftAPI(data);
    return res?.data;
};
