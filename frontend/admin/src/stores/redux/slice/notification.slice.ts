import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import INotification from '@/types/notification';
import { fetchNotifications } from '../api/notification';

interface NotificationState {
    notifications: INotification[];
}

const initialState: NotificationState = {
    notifications: [],
};

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<INotification>) => {
            state.notifications.push(action.payload);
        },
        setIsRead: (state, action: PayloadAction<number>) => {
            state.notifications = state.notifications.map((notification) => {
                if (notification.nof_id === action.payload) {
                    return { ...notification, isRead: true };
                }
                return notification;
            });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
         
            state.notifications = action.payload;
        });   
    }
});

export const { addNotification,setIsRead } = notificationSlice.actions;
export default notificationSlice.reducer;