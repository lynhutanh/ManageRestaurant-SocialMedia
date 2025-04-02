//components
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterBar from "./components/FilterBar";
import ListOrders from "./components/ListOrder";
import PagingBar from "../../../shared/paging-bar";

import { getSumOrdersByParams } from "./services/order";

export default function Order() {
    const navigate = useNavigate();
    const isLogin = useSelector((state: any) => state.userSlice.isLogin);
    const [params] = useSearchParams();
    const [totalPage, setTotalPage] = useState<number>(0);
    const limit = 10;

    useEffect(() => {
        getSumOrdersByParams(params).then((data) => {
            setTotalPage(Math.ceil(data / limit));
        });
    }, [params]);

    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        }
        sessionStorage.setItem("active", "1");
    }, []);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="h-[10vh]">
                <FilterBar />
            </div>
            <div className="h-[85vh] overflow-auto">
                <ListOrders isRender={true} />
            </div>
            <div className="h-[5vh] py-5">
                <PagingBar totalPage={totalPage} />
            </div>
        </div>
    );
}
