import axios from "@config/axios";
export const changeStatusOrderKitchenAPI = async (params: any) => {
    return await axios({
        method: "PUT",
        url: `/order/status/${params.order_id}`,
        params: params
    })
}
