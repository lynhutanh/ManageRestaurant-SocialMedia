//components
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterBar from "../order/components/FilterBar";
import ListOrders from "../order/components/ListOrder";
import PagingBar from "../../../shared/paging-bar";

import { getSumHistoryOrders } from "../order/services/order";

export default function HistoryOrder() {
    const [params] = useSearchParams();
    const [totalPage, setTotalPage] = useState<number>(0);
    const limit = 5;

    useEffect(() => {
        getSumHistoryOrders(params).then((data) => {
            setTotalPage(Math.ceil(data / limit));
        });
    }, [params]);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="h-[10vh]">
                <FilterBar />
            </div>
            <div className="h-[85vh] overflow-auto">
                <ListOrders isRender={true} history={1} />
            </div>
            <div className="h-[5vh] py-5">
                <PagingBar totalPage={totalPage} />
            </div>
        </div>
    );
}
