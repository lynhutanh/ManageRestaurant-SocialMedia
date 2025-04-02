import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IOrder } from "@/types/order";
import SocketSingleton from "@config/socket";
import { getOrdersByParams } from "../services/order";

const useFetchOrders = (number: Number) => {
    const [list, setList] = useState<IOrder[]>([]);
    const [isOpenFormDetail, setIsOpenFormDetail] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<string>("");
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const [isOpenShowSelectDriver, setIsOpenShowSelectDriver] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const navigate = useNavigate();
    const socket = SocketSingleton.getInstance();

    const [params] = useSearchParams();

    const fetchData = async () => {
        setIsFetching(true);
        if (number === 1) {
            getOrdersByParams({
                create_at: params.get("date"),
                status: params.get("status"),
                search: params.get("title"),
                page: params.get("page") || 1,
                limit: 10,
                history: 1,
            }).then((data) => {
                setList(data);
            });
        } else {
            setTimeout(() => {
                getOrdersByParams({
                    create_at: params.get("date"),
                    status: params.get("status"),
                    search: params.get("title"),
                    page: params.get("page") || 1,
                    limit: 10,
                }).then((data) => {
                    setList(data);
                });
            }, 100);
        }
        setIsFetching(false);
    };

    useEffect(() => {
        fetchData();
    }, [params, isOpenFormDetail]);

    useEffect(() => {
        if (list?.length === 0) {
            params.delete("page");
            params.append("page", "1");
            navigate(`?${params.toString()}`);
        }
    }, [list, navigate, params]);
    useEffect(() => {
        socket.connect();
        socket.on("orderDelivered", () => {
            fetchData();
        });

        socket.on("orderCommingNotification", () => {
            fetchData();
        });
        return () => {
            socket.off("orderDelivered");
            socket.off("orderCommingNotification");
        };
    }, [socket]);

    return {
        list,
        setList,
        isOpenFormDetail,
        setIsOpenFormDetail,
        selectedOrder,
        setSelectedOrder,
        selectedStatus,
        setSelectedStatus,
        isOpenShowSelectDriver,
        setIsOpenShowSelectDriver,
        fetchData,
        isFetching,
    };
};

export default useFetchOrders;
