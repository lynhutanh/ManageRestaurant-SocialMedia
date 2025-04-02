import { useEffect, useState } from "react";
import SocketSingleton from "@config/socket";
import DriverCard from "./DriverCard";
import { useTranslation } from "react-i18next";
import { getShipper } from "../../../worker/shipper/services/shipper";

interface DriverProps {
    setIsOpenShowSelectDriver: (value: boolean) => void;
    handleSelectDriver: (
        status: string,
        shipper_id?: string,
        order_id?: string
    ) => void;
}

const Driver: React.FC<DriverProps> = ({
    setIsOpenShowSelectDriver,
    handleSelectDriver,
}) => {
    const { t } = useTranslation();
    const socket = SocketSingleton.getInstance();
    const [drivers, setDrivers] = useState<string[]>([]);
    const [listDriverInfo, setListDriverInfo] = useState<any[]>([]);

    useEffect(() => {
        socket.connect();
        const handleListShipper = (data: any) => {
            setDrivers(data?.list || []);
        };

        if (drivers.length === 0) {
            socket.emit(t("getListShipper"), {});
        }

        socket.on(t("listShipper"), handleListShipper);
        return () => {
            socket.off(t("listShipper"));
        };
    }, [drivers.length, socket, t]);

    const fetchDriver = async (id: string) => {
        const rs = await getShipper(id);
        return rs?.data.data;
    };

    useEffect(() => {
        const fetchAllDrivers = async () => {
            if (drivers.length > 0) {
                const driverInfoArray = await Promise.all(
                    drivers.map(fetchDriver)
                );
                setListDriverInfo(driverInfoArray);
            }
        };

        fetchAllDrivers();
    }, [drivers]);

    return (
        <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">
                    {t("Select a Driver")}
                </h2>
                <div className="flex flex-col gap-2">
                    {listDriverInfo.map((driver, index) => (
                        <div key={index}>
                            <DriverCard
                                driver={driver}
                                handleSelectDriver={handleSelectDriver}
                            />
                        </div>
                    ))}
                </div>
                <div
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded flex justify-center items-center"
                    onClick={() => setIsOpenShowSelectDriver(false)}
                >
                    {t("Close")}
                </div>
            </div>
        </div>
    );
};

export default Driver;
