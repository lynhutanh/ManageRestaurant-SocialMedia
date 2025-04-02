import axios from "@config/axios";

export const changePassword = async (data: any) => {
    return await axios({
        method: "PUT",
        url: `/auth/changePassword`,
        data,
    });
};
export const getStaffByIdAPI = async (id: any) => {
    return await axios({
        method: "GET",
        url: `/user/admin/${id}`,
    });
};
export const editUserAPI = async (data: any) => {
    return await axios({
        method: "PUT",
        url: `/user/admin/${data.user_id}`,
        data,
    });
};
export const uploadImageAPI = async (data: any) => {
    return await axios({
        method: "POST",
        url: `/user/image`,
        data: data,
    });
}
