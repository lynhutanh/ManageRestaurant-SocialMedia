import React from "react";
import { IoAddOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import Selector from "@components/selectors/Selector";
import RefeshButton from "@components/buttons/RefeshButton";
import useHandleFilterIngredients from "../hooks/useHandleFilterIngredients";

interface FilterBarProps {
    setIsAdd: (value: boolean) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ setIsAdd }) => {
    const { t } = useTranslation();
    const {
        handleChangeSearch,
        handleChangeStatus,
        handleReset,
        search,
        status,
    } = useHandleFilterIngredients();

    return (
        <div className="w-full h-full bg-transparent flex justify-center items-center">
            <div className="w-full h-full flex justify-between items-center bg-white rounded-md px-5">
                <div className="w-full h-full flex flex-row gap-2 items-center">
                    <div className="h-fit w-max py-2">
                        <input
                            type="text"
                            id="search"
                            value={search}
                            onChange={handleChangeSearch}
                            className="w-full h-full border border-gray-400 rounded-md px-5 py-2 "
                            placeholder={t("Search_placeholder")}
                        />
                    </div>

                    <Selector
                        title="Status"
                        list={[
                            { id: "false", name: t("Out") },
                            { id: "true", name: t("Active") },
                        ]}
                        value={status}
                        onChange={handleChangeStatus}
                    />
                    <RefeshButton handleReset={handleReset} />
                </div>
                <div className="w-fit h-full flex flex-row gap-2 items-center justify-center py-2">
                    <div
                        onClick={() => setIsAdd(true)}
                        className="w-max h-fit py-2 px-4 flex flex-row  font-bold gap-2 justify-center items-center group border-primary bg-primary hover:bg-primary/90 border rounded-md cursor-pointer transition-all duration-300 ease-linear"
                    >
                        <IoAddOutline className="text-2xl text-white" />
                        <span className=" text-white text-sm ">
                            {t("Add Ingredient")}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
