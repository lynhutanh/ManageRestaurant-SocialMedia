import axios from "@config/axios";

export const loginAPI = async (email: string, password: string) => {
    return await axios({
        method: "POST",
        url: "/auth/admin/login",
        data: { email, password },
    });
};

export const registerAPI = async (data: object) => {
    return await axios({
        method: "POST",
        url: "/auth/admin/register",
        data,
    });
};
