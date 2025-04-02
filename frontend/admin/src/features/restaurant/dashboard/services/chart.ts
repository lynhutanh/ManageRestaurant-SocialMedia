import { GetTotalData } from "../api/chart";

export const GetChartData = async (): Promise<{ current: any; last: any }> => {
    const rs = await GetTotalData();
    return {
        current: rs?.data.currentMonth,
        last: rs?.data.lastMonth,
    };
};
