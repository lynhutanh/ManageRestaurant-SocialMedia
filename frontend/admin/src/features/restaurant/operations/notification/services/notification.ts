import {
    getAllNotificationsAPI,
    sendNotificationAPI,
} from "../api/notification";

// export const getAllNotifications = async () => {
//     const rs = await getAllNotificationsAPI();
//     return rs?.data?.data;
// };
export const sendNotification = async (data: any) => {
    const rs = await sendNotificationAPI(data);
    return rs?.data;
};

export const sendNotificationToUser = async (data: {
    title: string;
    content: string;
    type: "new" | "done" | "repaired" | "ingredient" | "failed";
    link: string;
    user_id: string;
}) => {
    const rs = await sendNotificationAPI(data);
    return rs?.data;
};
