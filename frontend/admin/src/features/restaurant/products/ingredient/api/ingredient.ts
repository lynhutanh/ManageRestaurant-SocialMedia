import axios from "@config/axios";

export const getIngredientAPI = async () => {
    return await axios({
        method: "GET",
        url: "/ingredient",
    });
};

export const getIngredientByParamsAPI = async (params: any) => {
    return await axios({
        method: "GET",
        url: "/ingredient",
        params,
    });
};

export const getIngredientByIDAPI = async (id: any) => {
    return await axios({
        method: "GET",
        url: `/ingredient/${id}`,
    });
};

export const addIngredientAPI = async (data: any) => {
    return await axios({
        method: "POST",
        url: "/ingredient",
        data,
    });
};
export const deleteIngredientAPI = async (id: any) => {
    return await axios({
        method: "DELETE",
        url: `/ingredient/${id}`,
    });
};

export const editIngredientAPI = async (data: any) => {
    return await axios({
        method: "PUT",
        url: `/ingredient/${data.i_id}`,
        data,
    });
};

//list Ingredients data
export const addListItemIngredientAPI = async (data: any) => {
    return await axios({
        method: "POST",
        url: "/menu-ingredient",
        data,
    });
};

export const updateListItemIngredientAPI = async (data: any) => {
    return await axios({
        method: "PUT",
        url: `/menu-ingredient/${data.item_id}`,
        data,
    });
};

export const deleteAllListItemIngredientAPI = async (data: any) => {
    return await axios({
        method: "DELETE",
        url: `/menu-ingredient/all/${data.item_id}`,
    });
};

export const getIngredientByItemIdAPI = async (item_id: string) => {
    return await axios({
        method: "GET",
        url: `/menu-ingredient/${item_id}`,
    });
};
