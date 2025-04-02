import OrderCard from "./OrderCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import ProcessingBar from "@components/loadings/ProcessingBar";
import { getOrdersByParams } from "../../../orders/order/services/order";

interface MainPanelProps {}

const MainPanel: React.FC<MainPanelProps> = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const fetchAllOrder = async () => {
        const orderList = await getOrdersByParams({
            page: 1,
            limit: 10000,
            status: "Processing",
        });
        return orderList;
    };
    const { data, isLoading } = useQuery({
        queryKey: ["fetchOrders"],
        queryFn: fetchAllOrder,
    });
    const refreshData = () => {
        queryClient.invalidateQueries({ queryKey: ["fetchOrders"] });
    };

    return (
        <div className="w-full h-full rounded-md bg-white grid grid-cols-5 grid-rows-2 gap-5 p-5">
            {isLoading ? (
                <ProcessingBar />
            ) : data?.length ? (
                data?.map((order: any) => {
                    return (
                        <OrderCard
                            key={order.order_id}
                            fetchAllOrder={refreshData}
                            message={order.message}
                            orderId={order.order_id}
                            delivery_time={order.delivery_time}
                        />
                    );
                })
            ) : (
                <div className="w-full h-full flex justify-center items-center text-red-500 col-span-5 row-span-2 text-[40px]">
                    {t("There are no orders")}
                </div>
            )}
        </div>
    );
};

export default MainPanel;
