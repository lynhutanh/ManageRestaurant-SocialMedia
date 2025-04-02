import { useQuery } from "@tanstack/react-query";
import { IOrderItem } from "@/types/order";
import { useTranslation } from "react-i18next";
import { fetchOrderItems } from "../../../orders/order/services/order";

const DetailOrder = ({
    item: { order_id, message },
    setIsOpenDetail,
}: {
    item: {
        order_id: string;
        message: string;
    };
    setIsOpenDetail: (value: boolean) => void;
}) => {
    const { t } = useTranslation();

    const fetchAllOrder = async () => {
        const rs = await fetchOrderItems(order_id);
        return rs;
    };
    const { data } = useQuery({
        queryKey: ["fetchOrderItems", order_id],
        queryFn: fetchAllOrder,
    });
    return (
        <div
            onClick={() => setIsOpenDetail(false)}
            className="fixed inset-0 z-50 w-screen h-screen p-[30px] flex justify-center items-center backdrop-filter backdrop-blur-sm bg-black/20 "
        >
            <div
                onClick={(event) => {
                    event?.stopPropagation();
                }}
                className="w-[25%] h-[80%] bg-white rounded-md flex flex-col justify-start items-center"
            >
                <span className="w-full text-lg pt-6 px-10 text-center flex flex-col ">
                    <span className="font-bold">{t("Order")}</span>
                    <span className="w-full truncate">{order_id}</span>
                </span>
                <div className="w-full h-[30%] flex flex-col justify-start items-start gap-2 pt-[20px] px-[20px]">
                    <p className="w-full h-full bg-recipe/50 border border-primary/20 text-black p-2">
                        <span className="">{t("Note")}: </span>
                        {message}
                    </p>
                </div>
                <div className="w-full h-full overflow-y-auto flex flex-col justify-start items-center gap-1 p-[20px]">
                    {data?.map((item: IOrderItem, index: number) => {
                        return (
                            <div
                                key={index}
                                className="flex flex-row w-full h-auto py-1 items-center justify-start gap-5 transition transform hover:scale-105 border-b cursor-pointer"
                            >
                                <div className="w-[40%] flex justify-start items-start">
                                    <img
                                        className="w-[100px] h-[100px] rounded-md object-cover"
                                        src={item.image}
                                        alt={item.title}
                                    />
                                </div>
                                <div className="w-[40%] max-w-[40%] h-auto text-[15px] font-medium">
                                    {item.title}
                                </div>
                                <span className="text-[15px]">
                                    <span className="text-[10px]">X</span>{" "}
                                    {item.quantity}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DetailOrder;
