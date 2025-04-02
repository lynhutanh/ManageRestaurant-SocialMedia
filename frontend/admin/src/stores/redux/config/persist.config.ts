import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userSlice from "../slice/user.slice";
import notificationSlice from "../slice/notification.slice";
const persistConfig = {
    key: "user",
    storage,
};
const NotificationPersistConfig = {
    key: "notification",
    storage,
};

export const rootStore = configureStore({
    reducer: {
        userSlice: persistReducer(persistConfig, userSlice),
        notificationSlice: persistReducer(NotificationPersistConfig, notificationSlice),
    },
});
export const persistor = persistStore(rootStore);
