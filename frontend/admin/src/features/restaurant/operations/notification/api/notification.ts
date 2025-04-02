import axios from "@config/axios";
import sendNotification from "@/utils/socket/sendNotification";

export const getAllNotificationsAPI = async () => {
    return await axios({
        method: "GET",
        url: "/notification",
    });
};

export const sendNotificationAPI = async (data: any) => {
    sendNotification();
    return await axios({
        method: "POST",
        url: "/notification",
        data,
    });
};

export const changeIsReadAPI = async (id: number) => {
    return await axios({
        method: "PUT",
        url: `/notification/${id}`,
    });
};
