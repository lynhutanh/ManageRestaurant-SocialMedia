//components
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FormAdd from "./components/FormAdd";
import PagingBar from "../../../shared/paging-bar";
//api
import { getIngredientByParamsAPI } from "./api/ingredient";
import ListIngredients from "./components/ListIngredients";
import FilterBar from "./components/FilterBar";

export default function Ingredient() {
    const [isAdd, setIsAdd] = useState(false);
    const [isRender, setIsRender] = useState(false);
    const [params] = useSearchParams();

    const [totalPage, setTotalPage] = useState(0);
    const limit = 10;

    const fetchData = async () => {
        const data = {
            is_available: params.get("status"),
            search: params.get("title"),
        };
        const rs = await getIngredientByParamsAPI(data);
        setTotalPage(Math.ceil(rs?.data?.result.total / limit));
    };

    useEffect(() => {
        fetchData();
    }, [params, isRender]);
    return (
        <div className="w-full h-full flex flex-col">
            {isAdd && (
                <FormAdd
                    isOpen={setIsAdd}
                    setIsRender={setIsRender}
                    isRender={isRender}
                />
            )}
            <div className="h-[10vh]">
                <FilterBar setIsAdd={setIsAdd} />
            </div>
            <div className="h-[85vh] overflow-auto">
                <ListIngredients isRender={isRender} />
            </div>
            <div className="h-[5vh] py-5">
                <PagingBar totalPage={totalPage} />
            </div>
        </div>
    );
}
