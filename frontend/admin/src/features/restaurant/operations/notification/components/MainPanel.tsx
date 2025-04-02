import { useDispatch, useSelector } from "react-redux";
import ListNotification from "./ListNotifications";
import { useEffect, useState } from "react";
import FilterNotification from "./FilterNotification";
import SocketSingleton from "@config/socket";
import { fetchNotifications } from "@stores/redux/api/notification";
import { useTranslation } from "react-i18next";

interface MainPanelProps {}

const MainPanel: React.FC<MainPanelProps> = ({}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { notifications } = useSelector(
        (state: any) => state.notificationSlice
    );
    const socket = SocketSingleton.getInstance();

    const [filter, setFilter] = useState("");

    const filteredList = notifications
        ?.filter((item: any) => {
            return (
                item.isRead ===
                (filter === "0" ? 0 : filter === "1" ? 1 : item.isRead)
            );
        })
        ?.sort((a: any, b: any) => {
            if (filter === "newest") {
                return new Date(b.time).getTime() - new Date(a.time).getTime(); // Newest first
            } else if (filter === "latest") {
                return new Date(a.time).getTime() - new Date(b.time).getTime(); // Latest first
            }
            return 0;
        })
        .reverse();

    useEffect(() => {
        socket.on("get-notification", () => {
            dispatch<any>(fetchNotifications());
        });
        return () => {
            socket.off("get-notification");
        };
    }, [dispatch, socket, t]);

    return (
        <div className="w-full h-full rounded-md bg-white flex flex-col gap-5 p-5">
            <div className="flex flex-row w-full h-[10%] justify-between items-center pr-5">
                <span className=" text-2xl font-semibold text-primary ">
                    {t("All Notifications")}
                </span>
                <FilterNotification
                    filterValue={filter}
                    setFilter={setFilter}
                />
                {/* <button className="ml-auto bg-primary text-white rounded-md p-2">{t("Only show unread")}</button>                */}
            </div>
            <ListNotification notifications={filteredList} />
        </div>
    );
};

export default MainPanel;
