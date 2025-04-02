import { createAsyncThunk} from "@reduxjs/toolkit";
import INotification from "@/types/notification";
import { getAllNotificationsAPI } from "@features/restaurant/operations/notification/api/notification";
import { sendNotification } from "@features/restaurant/operations/notification/services/notification";

export const fetchNotifications = createAsyncThunk(
    "notifications/fetchNotifications",
    async () => {
        const response = await getAllNotificationsAPI();
   
        return response.data.data;
    }
)

export const sendNotificationAction = createAsyncThunk(
    "notifications/sendNotification",
    async (data: INotification) => {
      
        const response = await sendNotification(data);
    
        return response;
    }
)