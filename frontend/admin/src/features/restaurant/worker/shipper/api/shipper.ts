import axios from "@config/axios";
export const getShipperById = async (id: string) => {
    return await axios({
        method: "GET",
        url: `/user/client/${id}`,
    });
};

export const getShipperOrders = async (id: string) => {
    return await axios({
        method: "GET",
        url: `/order/shipper/${id}`,
    });
};
