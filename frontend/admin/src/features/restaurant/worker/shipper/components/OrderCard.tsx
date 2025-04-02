import { useState } from "react";
import DetailShipping from "./DetailShipping";
import Swal from "sweetalert2";
import { changeStatusOrderAPI } from "../../../orders/order/api/order";
import SocketSingleton from "@config/socket";
import { sendNotificationToUser } from "@/features/restaurant/operations/notification/services/notification";
import sendNotification from "@/utils/socket/sendNotification";
interface OrderCardProps {
    order_id: string;
    time: string;
    user_id: string;
    fetchOrders: () => void;
}
const OrderCard: React.FC<OrderCardProps> = ({
    order_id,
    time,
    fetchOrders,
    user_id,
}) => {
    const socket = SocketSingleton.getInstance();
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    let check = false;
    const handleComplete = async (stage: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Confirm that you want complete this order!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF760E",
            cancelButtonColor: "#727D73",
            confirmButtonText: "Yes, complete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const rs = await changeStatusOrderAPI({
                    status: stage,
                    order_id,
                });

                if (rs?.status === 200) {
                    Swal.fire(
                        "Completed!",
                        "Thank for your service <3",
                        "success"
                    );
                    fetchOrders();

                    //send notification
                    await sendNotificationToUser({
                        title: "Order delivered",
                        content: `Order #${order_id} has been delivered`,
                        type: "done",
                        link: "/order",
                        user_id: user_id,
                    });
                    sendNotification()

                    setIsOpenDetail(false);
                    socket.emit("orderDelivered", order_id);
                    check = true;
                }
            }
        });

        return check;
    };
    return (
        <>
            {isOpenDetail && (
                <DetailShipping
                    handleComplete={handleComplete}
                    order_id={order_id}
                    setIsOpenDetail={setIsOpenDetail}
                />
            )}
            <div
                onClick={() => setIsOpenDetail(true)}
                className="text-[20px] px-5 flex flex-row justify-around rounded-md items-center w-full min-h-[150px] h-[150px] bg-blue-200 text-black"
            >
                <span>#{order_id}</span>
                <span className="text-[15px] font-light">{time}</span>
            </div>
        </>
    );
};
export default OrderCard;
