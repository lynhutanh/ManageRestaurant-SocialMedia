import Input from "@components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import SelectInput from "@components/selectors/Select";
import { SelectChangeEvent } from "@mui/material/Select";
import FormNutrition from "./FormNutrition";
import FormIngredients from "./FormIngredients";
//api
import { addNutritionAPI } from "../api/nutrition";
import { uploadImageAPI, addFoodAPI } from "../api/menu";
import { addListItemIngredientAPI } from "../../ingredient/api/ingredient";
import LoadingScreen from "@components/loadings/LoadingScreen";
import { toast } from "react-toastify";

import { IIngredients, IFoodDetail } from "@/types/menu";
import { useTranslation } from "react-i18next";

interface FormAddProps {
    setIsAdd: (value: boolean) => void;
}

const FormAdd: React.FC<FormAddProps> = ({ setIsAdd }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);

    const [foodDetail, setFoodDetail] = useState<IFoodDetail>({
        food: {
            title: "",
            price: "",
            category: "",
            description: "",
            image: "https://images.ctfassets.net/kugm9fp9ib18/3aHPaEUU9HKYSVj1CTng58/d6750b97344c1dc31bdd09312d74ea5b/menu-default-image_220606_web.png",
        },
        nutrition: {
            nutritional_info_id: "",
            calories: 0,
            proteins: 0,
            carbs: 0,
            fats: 0,
        },
        ingredients: [],
    });

    const [isOpenFormNutri, setIsOpenFormNutri] = useState(false);
    const [isOpenFormIng, setIsOpenFormIng] = useState(false);

    const [nutriData, setNutriData] = useState({});
    const [ingData, setIngData] = useState<IIngredients[]>([]);

    //validation
    const [error, setError] = useState({
        title: "",
        price: "",
        category: "",
        description: "",
    });

    function validateData(): boolean {
        const newError = {
            title: foodDetail?.food.title === "" ? t("Title is required") : "",
            price:
                foodDetail?.food.price === "" ||
                Number(foodDetail?.food.price) < 0
                    ? t("Price is required")
                    : "",
            category:
                foodDetail?.food.category === ""
                    ? t("Category is required")
                    : "",
            description:
                foodDetail?.food.description === ""
                    ? t("Description is required")
                    : "",
        };

        setError(newError);
        const hasError = Object.values(newError).some(
            (errorMsg) => errorMsg !== ""
        );
        return !hasError;
    }

    const handleAdd = async () => {
        let id = 0;
        if (validateData()) {
            setIsLoading(true);
            const formData = new FormData();
            formData.append(
                "image",
                selectedImage ||
                    foodDetail?.food.image ||
                    "https://images.ctfassets.net/kugm9fp9ib18/3aHPaEUU9HKYSVj1CTng58/d6750b97344c1dc31bdd09312d74ea5b/menu-default-image_220606_web.png"
            );
            const rsImage = await uploadImageAPI(formData);
            const data = {
                title: foodDetail?.food.title,
                price: foodDetail?.food.price,
                category: foodDetail?.food.category,
                description: foodDetail?.food.description,
                image:
                    rsImage?.data?.data?.path || foodDetail?.food.image || "",
            };
            const rs = await addFoodAPI(data);
            id = rs?.data?.data?.item_id;
        } else {
            return;
        }

        //add nutrition (optional)
        if (nutriData !== null && id !== 0) {
            await addNutritionAPI({ item_id: id, ...nutriData });
        }
        //add ingredients (optional)
        if (ingData.length !== 0 && id !== 0) {
            await Promise.all(
                ingData.map((item) =>
                    addListItemIngredientAPI({
                        item_id: id,
                        quantity_required: item.quantity_required,
                        ingredient_id: item.ingredient_id.ingredient_id,
                    })
                )
            );
        }
        setIsLoading(false);
        toast.success(t("Add item successfully"));
        setIsAdd(false);
    };
    const handleChangeCategory = useCallback((event: SelectChangeEvent) => {
        setFoodDetail((prev) => ({
            ...prev,
            food: { ...prev.food, category: event.target.value },
        }));
    }, []);
    const handeOpenFormNutri = () => {
        setIsOpenFormNutri(true);
    };
    const handleOpenFormIng = () => {
        setIsOpenFormIng(true);
    };

    //image handle
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith("image/") && file.size < 5000000) {
            setSelectedImage(file);
        } else {
            toast.error(t("Invalid file. Only images under 5MB are accepted."));
        }
    };
    const handleChangeImage = () => {
        const input = document.getElementById("image") as HTMLInputElement;
        input?.click();
    };
    useEffect(() => {
        return () => {
            if (selectedImage) {
                URL.revokeObjectURL(URL.createObjectURL(selectedImage));
            }
        };
    }, [selectedImage]);

    return (
        <div className="fixed inset-0 z-40 bg-opacity-50 bg-black backdrop-blur-sm w-screen h-screen p-[100px] flex justify-center items-baseline">
            {isLoading && <LoadingScreen />}
            {isOpenFormNutri && (
                <FormNutrition
                    data={nutriData}
                    handleSaveNutritionData={setNutriData}
                    setIsOpenFormNutri={setIsOpenFormNutri}
                />
            )}
            {isOpenFormIng && (
                <FormIngredients
                    list={ingData}
                    handleSaveIngretionData={setIngData}
                    setIsOpenFormIngre={setIsOpenFormIng}
                />
            )}

            <div className="bg-white w-full h-auto flex flex-row shadow-2xl rounded-md p-5">
                <div className="w-1/2 h-auto p-[75px] flex flex-col justify-center items-center gap-2">
                    {selectedImage && (
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Avatar Preview"
                            className="rounded-md w-[300px] h-[300px] object-cover"
                        />
                    )}
                    {selectedImage === null && (
                        <img
                            src={
                                foodDetail?.food.image ||
                                "https://images.ctfassets.net/kugm9fp9ib18/3aHPaEUU9HKYSVj1CTng58/d6750b97344c1dc31bdd09312d74ea5b/menu-default-image_220606_web.png"
                            }
                            alt="Avatar"
                            className="rounded-md w-[300px] h-[300px] object-cover"
                        />
                    )}
                    <span
                        onClick={handleChangeImage}
                        className="text-blue-500 text-[15px] cursor-pointer"
                    >
                        {t("Change image")}
                    </span>
                    <input
                        onChange={handleFileChange}
                        id="image"
                        type="file"
                        className="hidden"
                    />
                </div>
                <div className="w-1/2 h-full flex flex-col gap-3 justify-center items-start pr-[30px]">
                    <span className="text-[30px] font-bold self-center">
                        {t("Add Menu Item")}
                    </span>
                    <Input
                        value={foodDetail?.food.title as string}
                        onChange={(value: string) => {
                            if (foodDetail) {
                                setFoodDetail((prev: any) => {
                                    return {
                                        ...prev,
                                        food: { ...prev.food, title: value },
                                    };
                                });
                            }
                        }}
                        placeholder={t("Item title")}
                        type="text"
                        label={t("Title")}
                        error={error.title ? true : false}
                        errorMesage={error.title}
                    />
                    <Input
                        value={foodDetail?.food.price as string}
                        onChange={(value: string) => {
                            if (foodDetail) {
                                setFoodDetail({
                                    ...foodDetail,
                                    food: { ...foodDetail.food, price: value },
                                });
                            }
                        }}
                        placeholder={t("Item price")}
                        type="number"
                        label={t("Price")}
                        error={error.price ? true : false}
                        errorMesage={error.price}
                    />
                    <SelectInput
                        value={foodDetail?.food.category as string}
                        onChange={handleChangeCategory}
                        label={t("Category")}
                        listItems={["Food", "Beverage", "Special"]}
                        id={error.category ? true : false}
                    />
                    <Input
                        value={foodDetail?.food.description as string}
                        onChange={(value: string) => {
                            if (foodDetail) {
                                setFoodDetail({
                                    ...foodDetail,
                                    food: {
                                        ...foodDetail.food,
                                        description: value,
                                    },
                                });
                            }
                        }}
                        placeholder={t("Item description")}
                        type="text"
                        label={t("Description")}
                        multiline
                        error={error.description ? true : false}
                        errorMesage={error.description}
                    />

                    <div className="flex justify-center items-center gap-2 w-full ">
                        <div
                            onClick={handleOpenFormIng}
                            className="bg-primary w-full text-white p-2 rounded-md hover:bg-blue-400 flex justify-center items-center  cursor-pointer"
                        >
                            {t("Add Ingredients")}
                        </div>
                        <div
                            onClick={handeOpenFormNutri}
                            className="bg-primary w-full text-white p-2 rounded-md hover:bg-blue-400 flex justify-center items-center  cursor-pointer"
                        >
                            {t("Add Nutrition")}
                        </div>
                    </div>
                    <div
                        onClick={handleAdd}
                        className="bg-primary w-full text-white p-2 rounded-md hover:bg-blue-400 flex justify-center items-center  cursor-pointer"
                    >
                        {t("Confirm")}
                    </div>
                </div>
            </div>
            <div
                onClick={() => setIsAdd(false)}
                className="text-red-600 text-[50px] absolute top-5 right-10 hover:text-red-200 cursor-pointer"
            >
                X
            </div>
        </div>
    );
};
export default FormAdd;
