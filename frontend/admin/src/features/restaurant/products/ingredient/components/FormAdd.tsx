import { useState } from "react";
import Input from "@components/inputs/Input";
import { addIngredientAPI } from "../api/ingredient";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Selector from "@components/selectors/Selector";
import { listUnit } from "@constants/ingredient";

interface FormAddProps {
    isOpen: (value: boolean) => void;
    isRender: boolean;
    setIsRender: (value: boolean) => void;
}

const FormAdd: React.FC<FormAddProps> = ({ isOpen, setIsRender, isRender }) => {
    const { t } = useTranslation();
    const [name, setName] = useState("");
    const [stock, setStock] = useState("");
    const [unit, setUnit] = useState("");

    const handleAdd = async () => {
        if (!name || !stock || !unit) {
            toast.error(t("Please fill in all fields."));
            return;
        }

        const rs = await addIngredientAPI({
            name,
            stock,
            is_available: true,
            unit,
        });
        if (rs.status === 201) {
            toast.success(t("Add ingredient success"));
            setIsRender(!isRender);
            isOpen(false);
        } else {
            toast.error(t("Add ingredient fail"));
        }
    };

    const handleSetUnit = (value: string) => {
        setUnit(value);
    }

    return (
        <div className="fixed inset-0 z-50 bg-opacity-50 bg-black backdrop-blur-sm w-screen h-screen p-[100px] flex justify-center items-center">
            <div className="bg-white w-1/2 h-auto shadow-2xl rounded-md p-[20px] flex flex-col gap-5 justify-start items-center relative">
                <span className="text-[30px] font-bold">{t("Add Ingredient")}</span>
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
                    onChange={handleSetUnit}
                />
                <div
                    onClick={handleAdd}
                    className="bg-primary text-white w-[200px] h-[40px] rounded-md hover:bg-blue-600 flex justify-center items-center cursor-pointer"
                >
                    {t("Add")}
                </div>
                <div
                    onClick={() => isOpen(false)}
                    className="text-red-600 text-[30px] absolute top-5 right-5 hover:text-red-200 cursor-pointer "
                    aria-label={t("Close")}
                >
                    &times;
                </div>
            </div>
        </div>
    );
};

export default FormAdd;