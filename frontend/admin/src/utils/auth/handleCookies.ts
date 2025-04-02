import Cookies from "universal-cookie";
import { IUserCookie } from "../../types/auth";

const cookies = new Cookies();

export const setLoginCookies = (userData: IUserCookie): void => {
    cookies.set("userLogin", userData, { path: "/" });
};

export const getLoginCookies = (): IUserCookie | null => {
    const cookiesResult = cookies.get("userLogin");
    if (!cookiesResult) return null;
    return cookiesResult;
};

export const deleteLoginCookies = (): void => {
    cookies.remove("userLogin", { path: "/" });
};
export const setAccessToken = (token: string): void => {
    cookies.set("accessToken", token, {
        path: "/",
        secure: true,
        sameSite: "strict"
    });
};

export const getAccessToken = (): string | null => {
    return cookies.get("accessToken") || null;
};

export const removeAccessToken = (): void => {
    cookies.remove("accessToken", { path: "/" });
};


