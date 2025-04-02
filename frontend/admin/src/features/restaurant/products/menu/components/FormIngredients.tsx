import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

//api
import {
    addListItemIngredientAPI,
    deleteAllListItemIngredientAPI,
    getIngredientAPI,
    getIngredientByItemIdAPI,
} from "../../ingredient/api/ingredient";

import { IIngredients } from "@/types/menu";
import { useTranslation } from "react-i18next";

interface FormIngretionProps {
    setIsOpenFormIngre: (value: boolean) => void;
    handleSaveIngretionData?: (data: any) => void;
    list?: IIngredients[];
    item_id?: string;
    isEdit?: boolean;
}

const FormIngredients: React.FC<FormIngretionProps> = ({
    setIsOpenFormIngre,
    handleSaveIngretionData,
    list,
    item_id,
    isEdit,
}) => {
    const { t } = useTranslation();
    const [listIngredients, setListIngredients] = useState<IIngredients[]>(
        list || []
    );
    const [isAdd, setIsAdd] = useState(false);
    const [titleAdd, setTitleAdd] = useState("");
    const [idAdd, setIdAdd] = useState("");
    const [quantityAdd, setQuantityAdd] = useState(0);

    const handleAddItem = () => {
        setIsAdd(!isAdd);
        setTitleAdd("");
        setQuantityAdd(1);
    };

    const handleDeleteItem = (index: number) => {
        const newList = [...listIngredients];
        newList.splice(index, 1);
        setListIngredients(newList);
    };

    const handleSave = async () => {
        if (isAdd) {
            if (titleAdd === "" || quantityAdd === 0) {
                setIsAdd(!isAdd);
                toast.error(t("Please fill in all fields."));
                return;
            }
            let itemExisted = false;
            listIngredients &&
                listIngredients.forEach((item) => {
                    if (item.ingredient_id?.name === titleAdd) {
                        itemExisted = true;
                    }
                });
            if (itemExisted) {
                toast.error(t("This item already exists."));
                return;
            }
            setListIngredients((prev) => [
                ...prev,
                {
                    item_id: item_id,
                    quantity_required: quantityAdd,
                    ingredient_id: {
                        ingredient_id: idAdd,
                        name: titleAdd,
                    },
                },
            ]);

            setTitleAdd("");
            setQuantityAdd(1);
            setIsAdd(!isAdd);
            return;
        }
        if (isEdit) {
            if (listIngredients.length !== 0) {
                await deleteAllListItemIngredientAPI({ item_id: item_id });
                await Promise.all(
                    listIngredients.map((item) =>
                        addListItemIngredientAPI({
                            item_id: item_id,
                            quantity_required: item.quantity_required,
                            ingredient_id: item.ingredient_id.ingredient_id,
                        })
                    )
                );
            }
            toast.success(t("Update successfully"));
            setIsOpenFormIngre(false);
            return;
        }
        if (handleSaveIngretionData) {
            handleSaveIngretionData(listIngredients);
        }
        setIsOpenFormIngre(false);
    };

    const fetchData = async () => {
        if (item_id && list === undefined) {
            const rs = await getIngredientByItemIdAPI(item_id);
            setListIngredients(rs?.data?.result);
        }
        const rs = await getIngredientAPI();
        return rs?.data?.result.data;
    };

    const { data } = useQuery({
        queryKey: ["ingredientsItem"],
        queryFn: fetchData,
    });

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-opacity-50 bg-black backdrop-blur-sm w-screen h-screen flex justify-center items-center">
            <div className="relative bg-white w-full max-w-2xl h-[80%] flex flex-col gap-6 shadow-lg rounded-lg p-8">
                <div
                    onClick={() => setIsOpenFormIngre(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-4xl font-bold cursor-pointer"
                >
                    &times;
                </div>
                <h2 className="text-3xl font-semibold text-center">
                    {t("Ingredients Information")}
                </h2>

                <div className="grid grid-cols-3 items-center px-6 py-4 text-lg font-medium border-b">
                    <span>{t("Title")}</span>
                    <span>{t("Quantity")}</span>
                    <div className="flex justify-center">
                        <div
                            onClick={handleAddItem}
                            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600"
                        >
                            <IoAddOutline className="mr-1" />
                            {!isAdd ? t("Add Item") : t("Cancel")}
                        </div>
                    </div>
                </div>

                <div className="h-[60vh] overflow-y-auto px-6 py-2 space-y-4">
                    {isAdd && (
                        <div className="grid grid-cols-3 gap-4 items-center mb-4">
                            <select
                                onChange={(e) => {
                                    setTitleAdd(
                                        e.target.selectedOptions[0].text
                                    );
                                    setIdAdd(e.target.value);
                                }}
                                value={idAdd}
                                className="border border-gray-300 p-3 rounded-md"
                            >
                                <option value="">
                                    {t("Select Ingredient")}
                                </option>
                                {data &&
                                    data?.map(
                                        (
                                            item: {
                                                ingredient_id: string;
                                                name: string;
                                            },
                                            index: number
                                        ) => (
                                            <option
                                                key={index}
                                                value={item.ingredient_id}
                                            >
                                                {item.name}
                                            </option>
                                        )
                                    )}
                            </select>
                            <input
                                type="number"
                                min={1}
                                value={quantityAdd}
                                onChange={(e) =>
                                    setQuantityAdd(Number(e.target.value))
                                }
                                className="border border-gray-300 p-3 rounded-md"
                                placeholder={t("Quantity")}
                            />
                        </div>
                    )}

                    {listIngredients &&
                        listIngredients?.map((item, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-3 gap-4 items-center"
                            >
                                <input
                                    value={item.ingredient_id?.name}
                                    className="border border-gray-300 p-3 rounded-md bg-gray-50"
                                    disabled
                                />
                                <input
                                    type="number"
                                    min={0}
                                    value={item.quantity_required}
                                    onChange={(e) => {
                                        const newList = [...listIngredients];
                                        newList[index].quantity_required =
                                            Number(e.target.value);
                                        setListIngredients(newList);
                                    }}
                                    className="border border-gray-300 p-3 rounded-md"
                                />
                                <div
                                    onClick={() => handleDeleteItem(index)}
                                    className="flex justify-center items-center text-red-500 hover:text-red-600"
                                >
                                    <MdDeleteForever className="text-2xl" />
                                </div>
                            </div>
                        ))}
                </div>

                <div
                    onClick={handleSave}
                    className={`w-full py-3 rounded-md text-white text-lg flex justify-center items-center ${
                        isAdd
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-primary hover:bg-blue-600"
                    }`}
                >
                    {isAdd ? t("Confirm") : t("Save")}
                </div>
            </div>
        </div>
    );
};

export default FormIngredients;
