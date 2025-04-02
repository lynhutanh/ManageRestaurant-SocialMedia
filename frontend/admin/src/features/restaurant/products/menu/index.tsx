//components
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FilterBar from "./components/FilterBar";
import ListItems from "./components/ListItems";

import { getFoodByParamsAPI } from "./api/menu";
import PagingBar from "../../../shared/paging-bar";
import FormAdd from "./components/FormAdd";
import FormEdit from "./components/FormEdit";

const Menu = () => {
    const [isRender, setIsRender] = useState(false);
    const [params] = useSearchParams();
    const [page, setPage] = useState(1);
    const limit = 5;

    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [m_id, setM_id] = useState("");
    const handleEdit = (isEdit: boolean, m_id: string) => {
        setIsEdit(isEdit);
        setM_id(m_id);
    };

    //api paging
    const getSumFood = async () => {
        try {
            const data = {
                status: params.get("status"),
                title: params.get("title"),
            };

            // Gọi API để lấy dữ liệu
            const res = await getFoodByParamsAPI(data);
            setPage(Math.ceil(res?.data?.data.total / limit));
        } catch (error) {
            console.error("Error fetching sum:", error);
            setPage(0);
        }
    };

    useEffect(() => {
        getSumFood();
        setIsRender(!isRender);
    }, [params, isAdd, isEdit]);

    return (
        <div className="w-full h-full flex flex-col">
            {isAdd && <FormAdd setIsAdd={setIsAdd} />}
            {isEdit && <FormEdit m_id={m_id} setIsEdit={setIsEdit} />}
            <div className="h-[10vh]">
                <FilterBar setIsAdd={setIsAdd} />
            </div>
            <div className="h-[85vh] overflow-auto">
                <ListItems setIsEdit={handleEdit} isRender={isRender} />
            </div>
            <div className="h-[5vh] py-5">
                <PagingBar totalPage={page} />
            </div>
        </div>
    );
};

export default Menu;
