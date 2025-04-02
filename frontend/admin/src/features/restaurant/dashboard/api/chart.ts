import axios from "@config/axios";

export const GetTotalData = async () => {
    return await axios({
        method: "GET",
        url: "/chart/total",
    })
}