import axios from "@config/axios";

export const getNutritionByIdAPI = async (id: any) => {
    return await axios({
        method: "GET",
        url: `/nutrition/${id}`,
    });
};

export const addNutritionAPI = async (data: any) => {
    return await axios({
        method: "POST",
        url: "/nutrition",
        data,
    });
}

export const updateNutritionAPI = async (data: any) => {
    return await axios({
        method: "PUT",
        url: `/nutrition/${data.item_id}`,
        data,
    });
}

