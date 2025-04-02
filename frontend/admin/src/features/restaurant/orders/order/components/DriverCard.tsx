import { useTranslation } from "react-i18next";

interface DriverCardProps {
    driver: any;
    handleSelectDriver: (status: string, shipper_id?: string, order_id?: string) => void;
}
const DriverCard: React.FC<DriverCardProps> = ({
    driver,
    handleSelectDriver,
}) => {
    const { t } = useTranslation();
    return (
        <>
            {driver && (
                <div
                    className="w-full cursor-pointer text-left px-4 py-2 border rounded hover:bg-gray-100"
                    onClick={() => handleSelectDriver(t("Packed"), driver?.user_id)}
                >
                    <div className="flex flex-row items-center justify-between">
                        <img
                            src={driver?.image}
                            className="w-[50px] h-[50px] object-cover rounded-md"
                            alt={t("Driver Image")}
                        />
                        <div className="flex flex-col">
                            <span className="font-semibold">
                                {driver?.fullName}
                            </span>
                            <span>{driver?.phone}</span>
                        </div>
                        <div className="w-[10px] h-[10px] rounded-[100px] bg-delivered"></div>
                    </div>
                </div>
            )}
        </>
    );
};
export default DriverCard;