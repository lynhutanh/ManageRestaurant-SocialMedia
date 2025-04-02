import axios from "@config/axios";

const apiCreateUI = async (data: any) => {
    return await axios({
        method: "POST",
        url: "/gpt",
        data,
    });
};
const apiCreateLayout = async (data: any) => {
    return await axios({
        method: "POST",
        url: "/grid",
        data, // page, code, name, prompt
    });
};

const apiGetLayout = async (page: string) => {
    return await axios({
        method: "GET",
        url: `/grid`,
        params: { page: page },
    });
};

const apiUpdateLayout = async (data: any) => {
    return await axios({
        method: "PUT",
        url: `/grid/${data.layout_id}`,
        data, //layout_id, code, name, prompt
    });
};
const apiDeleteLayout = async (layout_id: string) => {
    return await axios({
        method: "DELETE",
        url: `/grid/${layout_id}`,
    });
};

export default {
    apiCreateUI,
    apiCreateLayout,
    apiGetLayout,
    apiUpdateLayout,
    apiDeleteLayout,
};
