import { useEffect, useState } from "react";
import { FormatCurrency } from "@utils/common/formatCurrency";   
import { GetTime } from "@utils/common/formatTime";
// import MapTilerComponent from "../../test/Map/Map";
import Map from "../../../../../components/map/Map";
import { useSelector } from "react-redux";
import TextFieldComponent from "@components/textfields/TextField";
import SocketSingleton from "@config/socket";
import { fetchCustomerById, fetchOrder, fetchOrderItems } from "@/features/restaurant/orders/order/services/order";

interface DetailShippingProps {
    order_id: string;
    setIsOpenDetail: (isOpen: boolean) => void;
    handleComplete: (stage: string) => Promise<boolean>;
}
const DetailShipping: React.FC<DetailShippingProps> = ({
    order_id,
    setIsOpenDetail,
    handleComplete,
}) => {
    const { id } = useSelector((state: any) => state.userSlice);
    const socket = SocketSingleton.getInstance();
    const [order, setOrder] = useState<any>(null);
    const [customer, setCustomer] = useState<any>(null);
    const [detailOrder, setDetailOrder] = useState<any>(null);
    const data = JSON.parse(
        window.localStorage.getItem("shipperLocation") || "{}"
    );
    const [isStart, setIsStart] = useState(false);

    const [start, setStart] = useState<[number, number]>([0, 0]);

    const handleDelivery = async () => {
        if (isStart) {
            const check = await handleComplete("Delivered");
            if (!check) {
                return;
            }
            setIsStart(false);
        } else {
            setIsStart(true);
        }
    };

    const fetchOrderData = async () => {
        const rs = await fetchOrder(order_id);
        const data = await fetchCustomerById(rs?.user_id);
        const detailOrder = await fetchOrderItems(order_id);
        setOrder(rs);
        setCustomer(data);
        setDetailOrder(detailOrder);
    };

    useEffect(() => {
        socket.on("Shipper-Position-Get", (data) => {
            if (data?.id === id) {
                setStart([
                    data?.shipperLocation?.lng,
                    data?.shipperLocation?.lat,
                ]);
            }
        });

        return () => {
            socket.off("Shipper-Position-Get");
        };
    }, [socket]);

    useEffect(() => {
        fetchOrderData();
    }, []);

    return (
        <div
            onClick={() => setIsOpenDetail(false)}
            className={`fixed py-[50px] px-5 inset-0 z-30 w-screen h-screen bg-primary-gray-th1 bg-opacity-75 flex justify-center items-center`}
        >
            {isStart && (
                <div
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                    className="z-40 fixed inset-0 "
                ></div>
            )}
            <div
                onClick={(event) => {
                    event.stopPropagation();
                }}
                className="w-[90%] h-[80%] z-50 overflow-y-auto scrollbar-hidden  bg-white rounded-xl px-5 "
            >
                <div className="p-5"></div>
                <h2 className="text-2xl font-bold mb-4">Order Details</h2>

                <TextFieldComponent
                    label="Order ID:"
                    value={order_id.toString()}
                />
                <TextFieldComponent
                    label="Customer Name:"
                    value={customer?.fullName}
                />
                <TextFieldComponent
                    label="Shipping Address:"
                    value={order?.address}
                />
                <TextFieldComponent
                    label="Phone number:"
                    value={customer?.phone}
                />
                <TextFieldComponent
                    label="Order time:"
                    value={GetTime(order?.delivery_time)}
                />

                <table className="w-full border px-2 mt-3">
                    <thead>
                        <tr>
                            <th className="text-start">Product Name</th>
                            <th className="text-start">Quantity</th>
                            <th className="text-start">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detailOrder?.map((product: any, index: number) => (
                            <tr key={index}>
                                <td>{product.title}</td>
                                <td>{product.quantity}</td>
                                <td>{product.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mb-2 ">
                    <span className="text-[30px] font-bold">Total price: </span>
                    <span className="text-[20px] font-medium">
                        {FormatCurrency(order?.total_price)}
                    </span>
                </div>

                <div className="mt-4 gap-2 flex flex-col">
                    {isStart ? (
                        <>
                            <Map
                                start={
                                    start[0] === 0 || start[1] === 0
                                        ? [data?.lng, data?.lat]
                                        : start
                                }
                                end={[order?.lng, order?.lat]}
                            />
                            <div
                                onClick={handleDelivery}
                                className="px-4 py-2 w-full bg-green-500 text-white rounded hover:bg-green-700"
                            >
                                Complete Delivery
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                onClick={handleDelivery}
                                className="px-4 py-2 w-full bg-green-500 text-white rounded hover:bg-green-700"
                            >
                                Start Delivery
                            </div>
                            <div
                                onClick={() => setIsOpenDetail(false)}
                                className="px-4 py-2 w-full bg-red-500 text-white rounded hover:bg-red-700"
                            >
                                Cancel
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DetailShipping;
