import axios from "@config/axios";

export const getFoodByIdAPI = async (id: any) => {
    return await axios({
        method: "GET",
        url: `/menu-item/${id}`,
    });
};

export const addFoodAPI = async (data: any) => {
    return await axios({
        method: "POST",
        url: "/menu-item",
        data,
    });
};

export const getFoodByParamsAPI = async (data: any) => {
    return await axios({
        method: "GET",
        url: "/menu-item",
        params: data,
    });
};

export const uploadImageAPI = async (data: any) => {
    return await axios({
        method: "POST",
        url: "/menu-item/image",
        data,
    });
};

export const updateFoodAPI = async (data: any) => {
    return await axios({
        method: "PUT",
        url: `/menu-item/${data.m_id}`,
        data,
    });
};

export const updateStatusFoodAPI = async (data: any) => {
    return await axios({
        method: "PUT",
        url: `/menu-item/status/${data.m_id}`,
        data,
    });
};

export const deleteFoodAPI = async (id: any) => {
    return await axios({
        method: "DELETE",
        url: `/menu-item/${id}`,
    });
};
