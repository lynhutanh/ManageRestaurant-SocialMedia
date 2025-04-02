import { useSelector } from "react-redux";
import useGetIp from "./useGetIp";
import { startTransition, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SetLanguage from "../utils/common/setLanguage";
import { permissionPath } from "../constants/permissions";
import toast from "react-hot-toast";

const useHandleCheckPermission = () => {
    const { isLogin, role, permissions } = useSelector(
        (state: any) => state.userSlice
    );
    const pathname = window.location.hash.slice(1);
    const { data } = useGetIp();
    const navigate = useNavigate();

    useEffect(() => {
        if (data && !localStorage.getItem("language")) {
            SetLanguage(data?.country as string);
        }
        startTransition(() => {
            if (!isLogin && window.location.hash !== "#/register") {
                navigate("/login");
            }
            if (
                role === "shipper" &&
                window.location.pathname !== "#/shipper"
            ) {
                navigate("/shipper");
            }
            if (
                role === "cashier" &&
                window.location.hash.slice(1) === "/dashboard"
            ) {
                navigate("/order");
            }
            if (
                role === "chef" &&
                window.location.hash.slice(1) === "/dashboard"
            ) {
                navigate("/kitchen");
            }

            const checkPermission = permissionPath.find(
                (item) => item.path === pathname
            );
            if (
                checkPermission &&
                !permissions.includes(checkPermission.permission)
            ) {
                toast.error("Permission denied");
                navigate("/");
            }
        });
    }, [isLogin, navigate, data]);

    return { isLogin, role, permissions };
}

export default useHandleCheckPermission;