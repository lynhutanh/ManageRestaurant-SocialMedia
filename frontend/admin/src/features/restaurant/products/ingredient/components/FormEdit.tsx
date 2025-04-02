import React, { useEffect, useState } from "react";
import Input from "@components/inputs/Input";
import { getIngredientByIDAPI, editIngredientAPI } from "../api/ingredient";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Selector from "@components/selectors/Selector";
import {listUnit} from "@constants/ingredient";

interface FormEditProps {
    isOpen: (value: boolean) => void;
    i_id: string;
}

const FormEdit: React.FC<FormEditProps> = ({ isOpen, i_id }) => {
    const { t } = useTranslation();
    const [name, setName] = useState("");
    const [stock, setStock] = useState("");
    const [unit, setUnit] = useState("");

    const fetchData = async () => {
        try {
            const rs = await getIngredientByIDAPI(i_id);
            setName(rs?.data?.result?.name || "");
            setStock(rs?.data?.result?.stock.toString() || "");
            setUnit(rs?.data?.result?.unit || "");
        } catch (error) {
            toast.error(t("Failed to fetch ingredient data."));
        }
    };

    const handleEdit = async () => {
        if (!name || !stock || !unit) {
            toast.error(t("Please fill in all fields."));
            return;
        }

        try {
            const rs = await editIngredientAPI({
                i_id,
                name,
                stock: Number(stock),
                is_available: true,
                unit,
            });
            if (rs.status === 200) {
                toast.success(t("Edit ingredient success"));
                isOpen(false);
            } else {
                toast.error(t("Edit ingredient fail"));
            }
        } catch (error) {
            toast.error(t("An error occurred while editing."));
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="
fixed inset-0 bg-opacity-50 bg-black backdrop-blur-sm w-screen h-screen p-[100px] flex justify-center items-center">
            <div className="bg-white w-1/2 h-auto shadow-2xl rounded-md p-[20px] flex flex-col gap-5 justify-start items-center relative">
                <span className="text-[30px] font-bold">{t("Edit Ingredient")}</span>
                <Input
                    label={t("Name")}
                    placeholder={t("Name_placeholder")}
                    value={name}
                    onChange={setName}
                    error={false}
                />
                <Input
                    type="number"
                    label={t("Stock")}
                    placeholder={t("Stock_placeholder")}
                    value={stock}
                    onChange={setStock}
                    error={false}
                />
                 <Selector
                    title={t("Unit")}
                    list={listUnit}
                    value={unit}
                    onChange={setUnit}
                />
                <div
                    onClick={handleEdit}
                    className="bg-primary text-white w-[200px] h-[40px] rounded-md hover:bg-blue-600 flex justify-center items-center cursor-pointer"
                >
                    {t("Confirm")}
                </div>
                <div
                    onClick={() => isOpen(false)}
                    className="text-red-600 text-[30px] absolute top-5 right-5 hover:text-red-200 cursor-pointer"
                    aria-label={t("Close")}
                >
                    &times;
                </div>
            </div>
        </div>
    );
};

export default FormEdit;