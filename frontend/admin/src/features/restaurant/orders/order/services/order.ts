import {
    getHistoryOrdersAPI,
    getOdersByParamsAPI,
    getOrderItemsAPI,
    getOrdersByIdOrderAPI,
} from "../api/order";
import { IOrder, IOrderItem } from "../../../../../types/order";
import { ICustomer } from "../../../../../types/customer";
import { getCustomerByIdAPI } from "../api/customer";

export const getHistoryOrders = async (data: any): Promise<IOrder[]> => {
    const rs = await getOdersByParamsAPI({
        ...data,
        history: 1,
    });
    return rs?.data?.result.data;
};

export const getOrdersByParams = async (data: any): Promise<IOrder[]> => {
    const rs = await getOdersByParamsAPI(data);
    return rs?.data?.result.data;
};

export const getSumOrdersByParams = async (data: any): Promise<number> => {
    const rs = await getOdersByParamsAPI(data);
    return rs?.data?.total;
};

export const getSumHistoryOrders = async (data: any): Promise<number> => {
    const rs = await getHistoryOrdersAPI({
        ...data,
        history: 1,
    });
    return rs?.data?.total;
};

export const fetchOrder = async (orderID: string) => {
    const rs = await getOrdersByIdOrderAPI(orderID);
    return rs?.data?.result;
};

export const fetchCustomerById = async (userID: string): Promise<ICustomer> => {
    const rs = await getCustomerByIdAPI(userID);
    return rs?.data?.data;
};

export const fetchOrderItems = async (
    orderID: string
): Promise<IOrderItem[]> => {
    const rs = await getOrderItemsAPI(orderID);
    return rs?.data?.result;
};

export const fetchInformationOrder = async (
    orderID: string,
    userID: string
) => {
    const order = await fetchOrder(orderID);
    const customer = await fetchCustomerById(userID);
    const orderItems = await fetchOrderItems(orderID);
    return {
        order,
        customer,
        orderItems,
    };
};
