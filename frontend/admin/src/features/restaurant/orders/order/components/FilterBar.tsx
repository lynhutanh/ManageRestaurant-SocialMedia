import React from "react";
import { listFilterOrder, timeFilterOrder } from "@constants/order";
import { useTranslation } from "react-i18next";
import Selector from "@components/selectors/Selector";
import useHandleFilterBar from "../hooks/useHandleFilterbar";
import RefeshButton from "@components/buttons/RefeshButton";

interface FilterBarProps {}

const FilterBar: React.FC<FilterBarProps> = () => {
    const { t } = useTranslation();
    const {
        handleChangeSearch,
        handleChangeStatus,
        handleChangeDate,
        handleReset,
        search,
        status,
        date,
    } = useHandleFilterBar();

    return (
        <div className="w-full h-full  bg-transparent flex justify-center items-center">
            <div className=" w-full h-full flex justify-start items-center bg-white rounded-md gap-2 px-5">
                <input
                    type="text"
                    id="search"
                    value={search}
                    onChange={handleChangeSearch}
                    placeholder={t("Search order...")}
                    className="w-max h-[40px] border border-gray-400 rounded-md px-5 "
                />
                <Selector
                    title="Status"
                    list={listFilterOrder}
                    value={status}
                    onChange={handleChangeStatus}
                />
                <Selector
                    title="Time"
                    list={timeFilterOrder}
                    value={date}
                    onChange={handleChangeDate}
                />

                <RefeshButton handleReset={handleReset} />
            </div>
        </div>
    );
};

export default FilterBar;
