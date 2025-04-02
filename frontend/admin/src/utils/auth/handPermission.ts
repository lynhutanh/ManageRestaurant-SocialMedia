import { getLoginCookies } from "./handleCookies";

export const CheckIsAdmin = (): boolean => {
    const user = getLoginCookies();
    if (!user) return false;
  if (user.role !== "admin") {
    return false;
  }
  return true;
};
