import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    deleteIngredientAPI,
    getIngredientByParamsAPI,
} from "../api/ingredient";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import FormEdit from "./FormEdit";
import SocketSingleton from "@config/socket";
import { title } from "@constants/ingredient";
import { useTranslation } from "react-i18next";

import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import LoadingItems from "@components/loadings/LoadingItems";

interface ListIngredientsProps {
    isRender: boolean;
}

const ListIngredients: React.FC<ListIngredientsProps> = ({ isRender }) => {
    const { t } = useTranslation();
    const socket = SocketSingleton.getInstance();
    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState("");
    const [list, setList] = useState<any[]>([]);
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const handleDelete = async (id: string) => {
        Swal.fire({
            title: t("Are you sure?"),
            text: t("You will not be able to recover this ingredient"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: t("Yes, delete it!"),
            cancelButtonText: t("No, keep it"),
            confirmButtonColor: "#FF760E",
            cancelButtonColor: "#727D73",
            
        }).then(async (result) => {
            if (result.isConfirmed) {
                const rs = await deleteIngredientAPI(id);
                if (rs.status === 200) {
                    toast.success(t("Delete ingredient success"));
                    fetchData();
                } else {
                    toast.error(t("Delete ingredient fail"));
                }
            }
        });
    };

    const handleEdit = async (id: string) => {
        setId(id);
        setIsEdit(true);
    };

    const fetchData = async () => {
        const data = {
            is_available: params.get("status"),
            search: params.get("title"),
            page: params.get("page") || 1,
            limit: 10,
        };
        const rs = await getIngredientByParamsAPI(data);

        setList(rs?.data?.result.data);
    };

    useEffect(() => {
        fetchData();
    }, [params, isRender, isEdit]);

    useEffect(() => {
        socket.connect();
        if (list?.length === 0) {
            params.delete("page");
            params.append("page", "1");
            navigate(`?${params.toString()}`);
        }

        if (list?.length > 0) {
            list?.forEach((item) => {
                if (Number(item.stock) < 10) {
                    socket.emit("Ingredient-Update", {
                        id: item.ingredient_id,
                        is_available: true,
                    });
                }
            });
        }
        return () => {
            socket.disconnect();
        };
    }, [list, navigate, params, socket]);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            {isEdit && <FormEdit isOpen={setIsEdit} i_id={id} />}
            <div className="h-[5%] my-2 grid grid-cols-10 grid-rows-1 w-full px-5">
                {title.map((item, index) => (
                    <div
                        key={index}
                        className={`flex ${item.justify} items-center ${item.colSpan}`}
                    >
                        <p className="text-lg font-medium text-black whitespace-nowrap">
                            {t(item.title)}
                        </p>
                    </div>
                ))}
            </div>
            {list?.length === 0 ? (
                <LoadingItems />
            ) : (
                <div className=" flex-1 w-full h-full grid grid-cols-1 grid-rows-10 bg-white rounded-md items-center justify-center p-5">
                    {list?.map(
                        (
                            item: {
                                ingredient_id: string;
                                name: string;
                                stock: string;
                                unit: string;
                                is_available: boolean;
                            },
                            index: number
                        ) => (
                            <div
                                key={index}
                                className={`grid grid-cols-10 grid-rows-1 w-full h-full rounded-[5px] hover:bg-gray-100 text-[#374151] font-medium ${
                                    index !== 9 ? "border-b-[1px]" : ""
                                } border-gray-200`}
                            >
                                <div className="flex justify-center items-center col-span-3">
                                    <p className="">
                                        {`${item.ingredient_id.slice(
                                            0,
                                            10
                                        )}...`}
                                    </p>
                                </div>

                                <div className="flex justify-start items-center col-span-3">
                                    <p className="">{item.name}</p>
                                </div>

                                <div className="flex justify-start items-center col-span-1">
                                    <p className="">{item.stock}</p>
                                </div>
                                <div className="flex justify-start items-center col-span-1">
                                    <p className="">{item.unit}</p>
                                </div>
                                <div className="flex justify-center items-center gap-3 col-span-2">
                                    <div className="flex flex-row justify-end items-center gap-2">
                                        <div
                                            onClick={() =>
                                                handleEdit(item.ingredient_id)
                                            }
                                            className="text-dashboard-blue bg-dashboard-blue/25 p-1  rounded-md hover:bg-dashboard-blue/50 flex items-center justify-center"
                                        >
                                            <MdOutlineEdit className="size-6 shrink-0" />
                                        </div>
                                        <div
                                            onClick={() =>
                                                handleDelete(item.ingredient_id)
                                            }
                                            className="text-dashboard-red bg-dashboard-red/25 p-1 rounded-md hover:bg-dashboard-red/50 flex items-center justify-center"
                                        >
                                            <MdOutlineDelete className="size-6 shrink-0" />
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

export default ListIngredients;
