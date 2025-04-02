//components
import SideBar from "@features/shared/side-bar";
import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "./loadings/LoadingPage";

export default function Layout() {
    const navigate = useNavigate();
    const isLogin = useSelector((state: any) => state.userSlice.isLogin);
    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        }
        sessionStorage.setItem("active", "1");
    }, []);
    return (
        <div className="w-screen h-screen flex bg-primary-gray-th1 overflow-x-hidden overflow-y-hidden scrollbar-hidden">
            <SideBar />
            <div className="flex-1 h-auto bg-primary-gray-th1 p-4 overflow-x-hidden overflow-y-auto text-primary-black">
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    );
}
