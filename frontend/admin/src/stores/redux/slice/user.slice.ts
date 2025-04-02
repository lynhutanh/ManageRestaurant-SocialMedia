import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        fullName: "",
        isLogin: false,
        id: "",
        role: "",
        permissions: [],
        appId: '',
        image: "",
        listSocialPages: [],
        defaultPage: {},
        defaultBusinessType: "",
    },
    reducers: {
        login: (state, action) => {
            state.isLogin = true;
            state.id = action.payload.id;
            state.role = action.payload.role;
            state.permissions = action.payload.permissions;
            state.fullName = action.payload.fullName;
            state.image = action.payload.image;
        },
        logout: (state) => {
            state.id = "";
            state.role = "";
            state.permissions = [];
            state.isLogin = false;
            state.fullName = "";
            state.image = "";
            state.listSocialPages = [];
            state.defaultPage = {};
            state.defaultBusinessType = "";
        },
        setAppId: (state, action) => {
            state.appId = action.payload;
        },
        setSocialPages: (state, action) => {
            state.listSocialPages = action.payload;
        },
        setDefaultPage: (state, action) => {
            state.defaultPage = action.payload;
        },
        setDefaultBusinessType: (state, action) => {
            state.defaultBusinessType = action.payload;
        },
        resetPages: (state) => {
            state.listSocialPages = [];
            state.defaultPage = {};
        },
    },
});

export const { login, logout, setAppId, setSocialPages, setDefaultPage, setDefaultBusinessType, resetPages } = UserSlice.actions;
export default UserSlice.reducer;
