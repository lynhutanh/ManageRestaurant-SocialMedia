import axios from "@config/axios";
import SocketSingleton from "@config/socket";

export const getOdersByParamsAPI = async (params: any) => {
    return await axios({
        method: "GET",
        url: "/order",
        params,
    })
}
export const getHistoryOrdersAPI = async (params: any) => {
    return await axios({
        method: "GET",
        url: "/order",
        params: {
            ...params,
            history: 1
        }
    })
}
export const getOrdersByIdOrderAPI = async (id: string) => {
    return await axios({
        method: "GET",
        url: `/order/${id}`,   
    })
}
export const getOrderItemsAPI = async (id: string) => {
    return await axios({
        method: "GET",
        url: `/order/items/${id}`,
    })
}
export const changeStatusOrderAPI = async (params: any) => {
    const socket = SocketSingleton.getInstance();
    socket.emit("orderStatusChange", params);
    return await axios({
        method: "PUT",
        url: `/order/status/${params.order_id}`,
        data: params
    })
}
export const cancelOrderAPI = async (params: any) => {
    return await axios({
        method: "PUT",
        url: `/order/cancel/${params.order_id}`,
        data: params
    })
}
