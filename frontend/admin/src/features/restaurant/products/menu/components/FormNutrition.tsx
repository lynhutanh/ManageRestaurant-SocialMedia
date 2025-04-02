import { useEffect, useState } from "react";
import Input from "@components/inputs/Input";
import { updateNutritionAPI } from "../api/nutrition";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { getNutritionByID } from "../services/nutrition";

interface FormNutritionProps {
    setIsOpenFormNutri: (value: boolean) => void;
    handleSaveNutritionData?: (data: any) => void;
    data?: any;
    id?: string;
    caloriesProps?: string;
    proteinProps?: string;
    fatProps?: string;
    carbohydrateProps?: string;
    isEdit?: boolean;
}

const FormNutrition: React.FC<FormNutritionProps> = ({
    setIsOpenFormNutri,
    handleSaveNutritionData,
    id,
    caloriesProps,
    proteinProps,
    fatProps,
    carbohydrateProps,
    data,
    isEdit,
}) => {
    const { t } = useTranslation();
    const [calories, setCalories] = useState(caloriesProps || "");
    const [protein, setProtein] = useState(proteinProps || "");
    const [fat, setFat] = useState(fatProps || "");
    const [carbohydrate, setCarbohydrate] = useState(carbohydrateProps || "");
    const [, setNutritional_info_id] = useState(
        data?.nutritional_info_id || 0
    );

    const handleSave = async () => {
        if (isEdit) {
            // Edit data
            try {
                const res = await updateNutritionAPI({
                    item_id: id,
                    calories,
                    proteins: protein,
                    fats: fat,
                    carbs: carbohydrate,
                });
                if (res.status === 200) {
                    toast.success(t("Edit success"));
                } else {
                    toast.error(t("Edit failed"));
                }
            } catch (error) {
                toast.error(t("An error occurred while editing."));
            }
            setIsOpenFormNutri(false);
            return;
        }
        if (handleSaveNutritionData) {
            handleSaveNutritionData({
                nutritional_info_id: id,
                calories,
                proteins: protein,
                fats: fat,
                carbs: carbohydrate,
            });
        }
        toast.success(t("Save successfully"));
        setIsOpenFormNutri(false);
    };

    useEffect(() => {
        if (data) {
            setCalories(data.calories);
            setProtein(data.proteins);
            setFat(data.fats);
            setCarbohydrate(data.carbs);
        }
        if (id) {
            // Get data
            const fetchNutrition = async () => {
                try {
                    const res = await getNutritionByID(id);
                    setNutritional_info_id(res?.nutritional_info_id);
                    setCalories(res?.calories.toString() || "");
                    setProtein(res?.proteins.toString() || "");
                    setFat(res?.fats.toString() || "");
                    setCarbohydrate(res?.carbs.toString() || "");
                } catch (error) {
                    toast.error(t("Failed to fetch nutrition data."));
                }
            };
            fetchNutrition();
        }
    }, [id, data, t]);

    return (
        <div className="fixed inset-0 z-50 bg-opacity-50 bg-black backdrop-blur-sm w-screen h-screen p-[100px] flex justify-center items-center">
            <div className="relative bg-white w-1/3 h-auto flex gap-3 flex-col shadow-2xl rounded-md p-5">
                <div
                    onClick={() => setIsOpenFormNutri(false)}
                    className="hover:text-red-500 cursor-pointer absolute top-0 right-5 text-[30px] text-red font-bold"
                >
                    &times;
                </div>

                <span className="text-[25px] font-bold text-center">
                    {t("Nutrition")}
                </span>
                <Input
                    value={calories}
                    onChange={setCalories}
                    placeholder={t("kcal")}
                    type="number"
                    label={t("Calories")}
                    error={false}
                />
                <Input
                    value={protein}
                    onChange={setProtein}
                    placeholder={t("gram")}
                    type="number"
                    label={t("Protein")}
                    error={false}
                />
                <Input
                    value={fat}
                    onChange={setFat}
                    placeholder={t("gram")}
                    type="number"
                    label={t("Fat")}
                    error={false}
                />
                <Input
                    value={carbohydrate}
                    onChange={setCarbohydrate}
                    placeholder={t("gram")}
                    type="number"
                    label={t("Carbohydrate")}
                    error={false}
                />
                <div
                    onClick={handleSave}
                    className="bg-primary text-white p-2 rounded-md hover:bg-blue-600 text-center cursor-pointer"
                >
                    {t("Save")}
                </div>
            </div>
        </div>
    );
};

export default FormNutrition;