import axios from "@config/axios";

export const getCustomerByIdAPI = async (id: string) => {
    return await axios({
        method: "GET",
        url: `/user/client/${id}`,
        params: {_id: id },
    });
};