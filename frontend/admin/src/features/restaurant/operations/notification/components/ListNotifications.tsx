import INotification from "@/types/notification";
import {GetTime } from "@utils/common/formatTime";
import { icons } from "@constants/notification";
//redux
import { useDispatch } from "react-redux";
import { fetchNotifications } from "@stores/redux/api/notification";
import { setIsRead } from "@stores/redux/slice/notification.slice";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { changeIsReadAPI } from "../api/notification";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
// import { FaEye } from "react-icons/fa";

interface ListNotificationProps {
    notifications: INotification[];
}

const ListNotification: React.FC<ListNotificationProps> = ({
    notifications,
}) => {
    const { t } = useTranslation();
    const dispatch: any = useDispatch();

    const handleIsRead = (nof_id: number) => {
        Swal.fire({
            title: t("Confirm you have read this notification"),
            text: t("You won't be able to revert this!"),
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#FF760E",
            cancelButtonColor: "#727D73",
            confirmButtonText: t("Yes, mark it as read!"),
        }).then(async (result) => {
            if (result.isConfirmed) {
                const rs = await changeIsReadAPI(nof_id);
                if (rs.status === 200) {
                    dispatch(setIsRead(nof_id));
                    toast.success(t("Notification marked as read."));
                } else {
                    toast.error(t("Failed to mark notification as read."));
                }
            }
        });
    };

    const renderIcon = (type: string) => {
        switch (type) {
            case "new":
                return icons["new"];
            case "done":
                return icons["done"];
            case "failed":
                return icons["failed"];
            case "ingredient":
                return icons["failed"];
            case "repaired":
                return icons["done"];
            default:
                return icons["new"];
        }
    };

    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

    return (
        <div className="overflow-y-auto w-full h-full flex flex-col justify-start items-start">
            {notifications.length === 0 && (
                <div className="w-full h-full flex flex-row justify-center items-center gap-5 p-2">
                    <span className="text-[18px] font-medium">
                        {t("No notifications")}
                    </span>
                </div>
            )}
            {notifications &&
                notifications?.map((item: INotification, index: number) => {
                    return (
                        <div
                            key={index}
                            className={`w-full h-auto flex flex-row justify-start items-center gap-5 border-b p-2 hover:bg-gray-100 rounded-md`}
                        >
                            <div
                                className={`w-[10%] flex justify-center items-center text-[40px] `}
                            >
                                <div className="w-fit h-fit bg-gray-100 rounded-full flex justify-center items-center p-1">
                                    {renderIcon(item.type as string)}
                                </div>
                            </div>
                            <div className="w-[50%] flex flex-col justify-start">
                                <span className="text-xl font-medium">
                                    {t(item.title)}
                                </span>
                                <span className="text-sm">
                                    {t(item.content)}
                                </span>
                            </div>
                            <div className="w-[20%] flex flex-col justify-start items-end">
                                <span className="text-sm">
                                    {GetTime(item.time as string)}
                                </span>
                            </div>
                            <div className="w-[20%] flex flex-col justify-start items-center text-sm">
                                {item.isRead ? (
                                    <span>-</span>
                                ) : (
                                    <div
                                        onClick={() =>
                                            handleIsRead(item.nof_id as number)
                                        }
                                        className="w-full h-full hover:opacity-80  cursor-pointer flex items-center justify-center gap-2"
                                    >
                                        <span className="h-full text-primary">
                                            {t("Mark as Read")}{" "}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default ListNotification;
