import { toast } from "react-toastify";
import Swal from "sweetalert2";
//icons
import { LiaArrowRightSolid, LiaTimesCircle } from "react-icons/lia";
import Tooltip from "@mui/material/Tooltip";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { IOrder } from "@/types/order";
import OrderDetail from "./OrderDetail";
import { FormatCurrency } from "@utils/common/formatCurrency";
import { FormatDay, GetTime } from "@utils/common/formatTime";
import { statusMap1, statusMap2, title } from "@constants/order";
import TextColumn from "./TextColumn";
import { cancelOrderAPI, changeStatusOrderAPI } from "../api/order";
import Driver from "./ListDriver";
import SocketSingleton from "@config/socket";
import sendNotification from "@utils/socket/sendNotification";
import { useTranslation } from "react-i18next";
import LoadingItems from "@components/loadings/LoadingItems";
import { sendNotificationToUser } from "../../../operations/notification/services/notification";
import useFetchOrders from "../hooks/useFetchOrders";

interface ListOrdersProps {
    isRender: boolean;
    history?: number;
}

const ListOrders: React.FC<ListOrdersProps> = ({ isRender, history }) => {
    const { t } = useTranslation();
    const socket = SocketSingleton.getInstance();
    const {
        list,
        fetchData,
        isOpenFormDetail,
        setIsOpenFormDetail,
        selectedOrder,
        setSelectedOrder,
        selectedStatus,
        setSelectedStatus,
        isOpenShowSelectDriver,
        setIsOpenShowSelectDriver,
    } = useFetchOrders(history || 0);

    const nextStage = async (status: string) => {
        if (status === "Pending") {
            return "Processing";
        }
        if (status === "Processing") {
            return "Packed";
        }
        if (status === "Packed") {
            return "Delivering";
        }
    };
    const handleChangeStatus = async (
        status: string,
        shipper_id?: string,
        order_id?: string
    ) => {
        Swal.fire({
            title: t("Are you sure?"),
            text: shipper_id
                ? t("Confirm to choose this driver?")
                : t("Do you want to confirm this order?"),
            icon: "question",
            showCancelButton: true,
            confirmButtonText: t("Yes"),
            cancelButtonText: t("No"),
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const stage = await nextStage(status);

                    const rs = await changeStatusOrderAPI({
                        user_id: shipper_id,
                        order_id: order_id || selectedOrder,
                        status: stage,
                    });
                    if (rs?.status === 200) {
                        socket.emit("orderArrive", shipper_id);
                        toast.success(t("Change status success"));

                        const user_id = sessionStorage.getItem("user_id");
                        //send notification
                        await sendNotificationToUser({
                            title: t("Order is delivering"),
                            content: `${t("Order #")} ${selectedOrder} ${t(
                                "has been delivering"
                            )}`,
                            type: "done",
                            link: "/order",
                            user_id: user_id || "",
                        });
                        sendNotification();

                        setIsOpenShowSelectDriver(false);
                        fetchData();
                    }
                } catch (error) {
                    toast.error(t("Change status failed"));
                }
            }
        });
    };
    const handleCancelOrder = async (id: string) => {
        const { value: text } = await Swal.fire({
            title: t("Cancel order"),
            text: t("Do you want to cancel this order?"),
            input: "textarea",
            inputLabel: t("Please input your message"),
            inputPlaceholder: t("Type your message here..."),
            inputAttributes: {
                "aria-label": t("Type your message here..."),
            },
            showCancelButton: true,
        });
        if (text) {
            try {
                const rs = await cancelOrderAPI({
                    order_id: id,
                    message: text,
                });
                if (rs?.status === 200) {
                    toast.success(t("Cancel order success"));
                    fetchData();
                }
            } catch (error) {
                toast.error(t("Cancel order failed"));
            }
        }
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            {isOpenFormDetail && (
                <OrderDetail
                    status={selectedStatus}
                    orderID={selectedOrder}
                    userID={sessionStorage.getItem("user_id") || ""}
                    setIsShowDetail={setIsOpenFormDetail}
                />
            )}
            {isOpenShowSelectDriver && (
                <Driver
                    setIsOpenShowSelectDriver={setIsOpenShowSelectDriver}
                    handleSelectDriver={handleChangeStatus}
                />
            )}

            <div className="h-[5%] my-2 grid grid-cols-12 grid-rows-1 w-full px-[30px]">
                {title.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={`flex ${item.justify} items-center ${item.colSpan}`}
                        >
                            <p className="text-lg font-medium text-black py-2 whitespace-nowrap">
                                {t(item.title)}
                            </p>
                        </div>
                    );
                })}
            </div>
            {list.length === 0 ? (
                <LoadingItems />
            ) : (
                <div className="flex-1 w-full h-full grid grid-cols-1 grid-rows-10  bg-white rounded-md items-center justify-center p-[30px] ">
                    {list.map((item: IOrder, index: number) => {
                        return (
                            <div
                                onClick={() => {
                                    setSelectedStatus(item.status);
                                    setSelectedOrder(item.order_id);

                                    sessionStorage.setItem(
                                        "user_id",
                                        item.user_id || ""
                                    );
                                    setIsOpenFormDetail(true);
                                }}
                                key={index}
                                className={` grid grid-cols-12 grid-rows-1 w-full h-full rounded-[5px] hover:bg-gray-100 text-[#374151] font-medium ${
                                    index !== 4 ? `border-b-[1px]` : ""
                                } border-gray-200`}
                            >
                                <TextColumn
                                    text={`${item.order_id.slice(0, 8)}...`}
                                    classNameValue={
                                        "justify-center items-center col-span-1 truncate"
                                    }
                                />

                                <TextColumn
                                    text={`${item.order_id.slice(0, 8)}...`}
                                    classNameValue={
                                        "justify-start items-center col-span-1"
                                    }
                                />
                                <TextColumn
                                    text={FormatCurrency(item.total_price)}
                                    classNameValue={
                                        "justify-start items-center col-span-1"
                                    }
                                />
                                <TextColumn
                                    text={item.message as string}
                                    classNameValue={
                                        "justify-start items-center col-span-3"
                                    }
                                />

                                <div className="flex flex-row gap-2 w-full justify-start items-center col-span-1">
                                    <div
                                        className={`flex items-center justify-center`}
                                    >
                                        <div
                                            className={`w-[10px] h-[10px] rounded-full ${statusMap2.get(
                                                item.status
                                            )}`}
                                        ></div>
                                    </div>
                                    <p
                                        className={`text-sm font-semibold whitespace-nowrap ${statusMap1.get(
                                            item.status
                                        )}`}
                                    >
                                        {t(item.status)}
                                    </p>
                                </div>

                                <TextColumn
                                    text={
                                        item.delivery_time
                                            ? (GetTime(
                                                  item.delivery_time || ""
                                              ) as string)
                                            : `${FormatDay(item.create_at)}`
                                    }
                                    classNameValue={
                                        "justify-center items-center col-span-2"
                                    }
                                />
                                <TextColumn
                                    text={FormatDay(item.create_at)}
                                    classNameValue={
                                        "justify-center items-center col-span-2"
                                    }
                                />

                                <div className="flex justify-end items-center p-2 col-span-1">
                                    {item.status === "Pending" && (
                                        <div
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setSelectedOrder(item.order_id);
                                                sessionStorage.setItem(
                                                    "user_id",
                                                    item.user_id || ""
                                                );
                                                handleChangeStatus(
                                                    item.status,
                                                    undefined,
                                                    item.order_id
                                                );
                                            }}
                                            className="w-full h-full flex items-center justify-end gap-2 animate-bounce-slow"
                                        >
                                            <Tooltip
                                                title={t(
                                                    "Confirm move to next stage"
                                                )}
                                                arrow
                                            >
                                                <span>
                                                    <LiaArrowRightSolid className="text-[30px] text-processing hover:text-processing/50" />
                                                </span>
                                            </Tooltip>
                                        </div>
                                    )}
                                    {item.status === "Packed" && (
                                        <div
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                setSelectedOrder(item.order_id);
                                                sessionStorage.setItem(
                                                    "user_id",
                                                    item.user_id || ""
                                                );
                                                setIsOpenShowSelectDriver(true);
                                            }}
                                            className="w-full h-full flex items-center justify-end gap-2 animate-bounce-slow"
                                        >
                                            <Tooltip
                                                title={t(
                                                    "Confirm move to next stage"
                                                )}
                                                arrow
                                            >
                                                <span>
                                                    <MdOutlineDeliveryDining className="text-[30px] text-delivering hover:text-delivering/50" />
                                                </span>
                                            </Tooltip>
                                        </div>
                                    )}
                                    {item.status !== "Cancelled" &&
                                        item.status !== "Delivered" &&
                                        item.status !== "Successfully" && (
                                            <div
                                                onClick={(event) => {
                                                    event.stopPropagation();

                                                    handleCancelOrder(
                                                        item.order_id
                                                    );
                                                }}
                                                className="w-full h-full flex items-center justify-end gap-2    "
                                            >
                                                <Tooltip
                                                    title={t("Cancel order")}
                                                    arrow
                                                >
                                                    <span>
                                                        <LiaTimesCircle className="text-[30px] text-cancelled hover:text-cancelled/50" />
                                                    </span>
                                                </Tooltip>
                                            </div>
                                        )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ListOrders;
