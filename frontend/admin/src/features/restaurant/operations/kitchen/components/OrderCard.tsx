import { useState } from "react";
import DetailOrder from "./DetailOrder";
import { changeStatusOrderAPI } from "../../../orders/order/api/order";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { sendNotificationAction } from "@stores/redux/api/notification";
import { useTranslation } from "react-i18next";
import { GetDateOnDate, GetTimeOnDate } from "@utils/common/formatTime";

interface OrderCardProps {
    orderId: string;
    userId?: string;
    delivery_time?: string;
    message?: string;
    fetchAllOrder: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
    orderId,
    userId,
    delivery_time,
    message,
    fetchAllOrder,
}) => {
    const { t } = useTranslation();
    const dispatch: any = useDispatch();

    const [isOpenDetail, setIsOpenDetail] = useState(false);

    const handleChangeStatus = async (orderId: string) => {
        Swal.fire({
            title: t("Are you sure?"),
            text: t("You won't be able to revert this!"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF760E",
            cancelButtonColor: "#727D73",
            confirmButtonText: t("Yes, done it!"),
        }).then(async (result) => {
            if (result.isConfirmed) {
                const rs = await changeStatusOrderAPI({
                    order_id: orderId,
                    status: "Packed",
                    delivery_time: delivery_time,
                });
                fetchAllOrder();

                dispatch(
                    sendNotificationAction({
                        title: t("Order Packed"),
                        content: t("Order {{orderId}} has been packed", {
                            orderId,
                        }),
                        link: `/order/${orderId}`,
                        type: "done",
                    })
                );

                if (rs.status === 200) {
                    toast.success(t("Change status successfully!"));
                } else {
                    toast.error(t("Change status failed!"));
                }
            }
        });
    };
    return (
        <>
            {isOpenDetail && (
                <DetailOrder
                    item={{
                        order_id: orderId,
                        message: message as string,
                    }}
                    setIsOpenDetail={setIsOpenDetail}
                />
            )}
            <div className="w-full h-full bg-transparent border-2 border-dashboard-green col-span-1 row-span-1 p-2 rounded-md shadow-md cursor-pointer">
                <div className="w-full h-fit p-2 flex flex-col justify-between items-center">
                    <div className="w-full font-medium text-lg">
                        <span className="font-bold text-dashboard-green">{t("Order")}</span>
                        <div className="w-full truncate"> {orderId}</div>
                    </div>
                    <div className="w-full flex justify-start items-center">
                        <span className="text-sm">
                            {GetTimeOnDate(delivery_time as string)}
                        </span>
                        <span className="text-sm">
                            {GetDateOnDate(delivery_time as string)}
                        </span>
                    </div>
                </div>
                <div className="w-full h-auto flex flex-col justify-center items-center gap-3 p-[10px]">
                    <div
                        onClick={() => {
                            setIsOpenDetail(true);
                        }}
                        className=" text-lg font-semibold w-full h-max p-2 bg-white  text-dashboard-green border-2 border-dashboard-green hover:bg-dashboard-green/10  flex flex-row items-center justify-center rounded-md  cursor-pointer"
                    >
                        {t("View Detail")}
                    </div>
                    <div
                        onClick={() => {
                            handleChangeStatus(orderId);
                        }}
                        className=" text-lg font-semibold w-full h-max p-2 border-2 border-dashboard-green bg-dashboard-green  hover:bg-dashboard-green/90 text-white flex flex-row items-center justify-center rounded-md  cursor-pointer"
                    >
                        {t("Done")}
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderCard;
