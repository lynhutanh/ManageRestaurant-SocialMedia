import axios from "axios";
import { VITE_URL_SERVER } from "..";
import {
    deleteLoginCookies,
    getLoginCookies,
} from "@/utils/auth/handleCookies";
import toast from "react-hot-toast";
const instance = axios.create({
    baseURL: `${VITE_URL_SERVER}/api`,
});

instance.interceptors.request.use(
    function (config) {
        const loginCookies = getLoginCookies();
        if (loginCookies && loginCookies.token) {
            config.headers.Authorization = `Bearer ${loginCookies.token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status === 403) {
            toast.error("Your session has expired, please login again");
            window.localStorage.removeItem("persist:user");
            deleteLoginCookies();
            setTimeout(() => {
                window.location.href = "/#/login";
            }, 2000);
        }
        return error?.data;
    }
);

export default instance;
