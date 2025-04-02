import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    getFoodByParamsAPI,
    deleteFoodAPI,
    updateStatusFoodAPI,
} from "../api/menu";
import Swal from "sweetalert2";
import FormIngredients from "./FormIngredients";
import FormNutrition from "./FormNutrition";

//icon
import { LiaEdit } from "react-icons/lia";
import { MdOutlineDelete } from "react-icons/md";
import { FiLink } from "react-icons/fi";
import { FiBox } from "react-icons/fi";
import { FormatCurrency } from "@utils/common/formatCurrency";
import { title } from "@constants/menu";
import { useTranslation } from "react-i18next";
import LoadingItems from "@components/loadings/LoadingItems";

interface ListItemsProps {
    setIsEdit: (value: boolean, m_id: string) => void;
    isRender?: boolean;
}

const ListItems: React.FC<ListItemsProps> = ({ setIsEdit, isRender }) => {
    const { t } = useTranslation();
    const [list, setList] = useState<any[]>([]);
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [isOpenFormNutri, setIsOpenFormNutri] = useState(false);
    const [isOpenFormIngre, setIsOpenFormIngre] = useState(false);
    const [id, setId] = useState("");

    const handleOpenFormIngre = (id: string) => {
        setId(id);
        setIsOpenFormIngre(true);
    };
    const handleOpenFormNutri = (id: string) => {
        setId(id);
        setIsOpenFormNutri(true);
    };
    const handleDelete = (id: string) => {
        Swal.fire({
            title: t("Are you sure?"),
            text: t("You won't be able to revert this!"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: t("Yes, delete it!"),
            cancelButtonText: t("No, keep it"),
            confirmButtonColor: "#FF760E",
            cancelButtonColor: "#727D73",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const rs = await deleteFoodAPI(id);
                if (rs.status === 200) {
                    Swal.fire(
                        t("Deleted!"),
                        t("Your file has been deleted."),
                        "success"
                    );
                } else {
                    Swal.fire(t("Error!"), t("Something went wrong"), "error");
                }
                fetchData();
            }
        });
    };
    const fetchData = async () => {
        const data = {
            availability: params.get("status"),
            title: params.get("title"),
            category: params.get("category"),
            page: params.get("page") || 1,
            limit: 5,
        };
        const rs = await getFoodByParamsAPI(data);
        setList(rs?.data?.data?.data);
    };
    useEffect(() => {
        fetchData();
    }, [params, isRender]);
    useEffect(() => {
        if (list?.length === 0) {
            params.delete("page");
            params.append("page", "1");
            navigate(`?${params.toString()}`);
        }
    }, [list]);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            {isOpenFormIngre && (
                <FormIngredients
                    item_id={id}
                    setIsOpenFormIngre={setIsOpenFormIngre}
                    isEdit={isOpenFormIngre}
                />
            )}
            {isOpenFormNutri && (
                <FormNutrition
                    id={id}
                    setIsOpenFormNutri={setIsOpenFormNutri}
                    isEdit={isOpenFormNutri}
                />
            )}
            <div className="h-[5%] my-2 grid grid-cols-10 grid-rows-1 w-full px-10 gap-2">
                {title.map((item, index) => (
                    <div
                        key={index}
                        className={`flex ${item.justify} items-center ${item.colSpan}`}
                    >
                        <p className="text-lg font-medium text-black py-2 whitespace-nowrap">
                            {t(item.title)}
                        </p>
                    </div>
                ))}
            </div>
            {list?.length === 0 ? (
                <LoadingItems />
            ) : (
                <div className="w-full h-full flex-1 grid grid-cols-1 grid-rows-5 bg-white rounded-md items-center justify-center p-5">
                    {list?.map(
                        (
                            item: {
                                item_id: string;
                                title: string;
                                image: string;
                                price: string;
                                category: string;
                                description: string;
                                availability: boolean;
                            },
                            index: number
                        ) => (
                            <div
                                key={index}
                                className={` grid grid-cols-10 grid-rows-1 gap-2 w-full  h-full rounded-[5px] text-[#374151] font-medium hover:bg-gray-100 px-5 ${
                                    index !== 4 ? `border-b-[1px]` : ""
                                } border-gray-200`}
                            >
                                <div className="flex justify-start items-center col-span-2">
                                    <p className=" py-2 whitespace-nowrap text-start truncate">
                                        {item.title}
                                    </p>
                                </div>
                                <div className="flex justify-start items-center col-span-1">
                                    <img
                                        src={item.image}
                                        alt=""
                                        className="w-[75px] h-[75px] object-cover rounded-md border border-gray-200"
                                    />
                                </div>
                                <div className="flex justify-start items-center col-span-1">
                                    <p className="">
                                        {FormatCurrency(Number(item.price))}
                                    </p>
                                </div>

                                <div className="flex justify-start items-center col-span-1">
                                    <p className="">{item.category}</p>
                                </div>
                                <div className="flex justify-start items-center col-span-2">
                                    <p className=" truncate pr-6">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="flex justify-center items-center col-span-1">
                                    <select
                                        value={
                                            item.availability
                                                ? "available"
                                                : "out_of_service"
                                        }
                                        onChange={async (e) => {
                                            const newStatus =
                                                e.target.value === "available";
                                            // Call API to update status here
                                            await updateStatusFoodAPI({
                                                m_id: item.item_id,
                                                availability: newStatus,
                                            });
                                            fetchData();
                                        }}
                                        className={`w-full h-fit bg-white border border-gray-300 rounded-md p-2 ${
                                            item.availability
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                        }`}
                                    >
                                        <option value="available">
                                            {t("Available")}
                                        </option>
                                        <option value="out_of_service">
                                            {t("Out of service")}
                                        </option>
                                    </select>
                                </div>

                                <div className="flex justify-center items-center gap-3 col-span-2">
                                    <div
                                        onMouseEnter={(e) =>
                                            e.stopPropagation()
                                        }
                                        className="flex flex-row justify-between items-center text-[12px] gap-2"
                                    >
                                        <div
                                            onClick={() =>
                                                handleOpenFormIngre(
                                                    item.item_id
                                                )
                                            }
                                            className=" text-[15px] cursor-pointer text-dashboard-blue bg-dashboard-blue/15  hover:bg-dashboard-blue/25 p-1 rounded-md flex flex-row items-center"
                                        >
                                            <FiBox className=" size-6" />
                                        </div>
                                        <div
                                            onClick={() =>
                                                handleOpenFormNutri(
                                                    item.item_id
                                                )
                                            }
                                            className="text-[15px] cursor-pointer  text-dashboard-yellow bg-dashboard-yellow/15  hover:bg-dashboard-yellow/25 p-1 rounded-md flex flex-row items-center"
                                        >
                                            <FiLink className="size-6" />
                                        </div>
                                        <div
                                            onClick={() =>
                                                setIsEdit(true, item.item_id)
                                            }
                                            className=" text-[15px] cursor-pointer text-dashboard-green bg-dashboard-green/15  hover:bg-dashboard-green/25 p-1 rounded-md flex flex-row items-center"
                                        >
                                            <LiaEdit className="size-6" />
                                        </div>
                                        <div
                                            onClick={() =>
                                                handleDelete(item.item_id)
                                            }
                                            className=" text-[15px] cursor-pointer text-dashboard-red bg-dashboard-red/15  hover:bg-dashboard-red/25 p-1 rounded-md flex flex-row items-center"
                                        >
                                            <MdOutlineDelete className="size-6" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default ListItems;
