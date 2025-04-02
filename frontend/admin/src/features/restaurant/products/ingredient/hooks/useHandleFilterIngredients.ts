import { debounce } from "lodash";
import { useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const useHandleFilterIngredients = () => {
    const navigate = useNavigate();

    const [status, setStatus] = useState("");
    const [search, setSearch] = useState("");

    const [params] = useSearchParams();

    const handleReset = () => {
        setStatus("");
        setSearch("");
        params.delete("status");
        params.delete("title");
        navigate(`?${params.toString()}`);
        window.location.reload();
    };

    const handleChangeStatus = (value: string) => {
        setStatus(value as string);
        if (value === "") {
            params.delete("status");
            navigate(`?${params.toString()}`);
            return;
        }
        params.delete("status");
        params.append("status", value as string);
        navigate(`?${params.toString()}`);
    };

    const debounceSearch = useCallback(
        debounce((value: string) => {
            if (value === "") {
                params.delete("title");
            } else {
                params.delete("title");
                params.append("title", value);
            }
            navigate(`?${params.toString()}`);
        }, 500),
        [params, navigate]
    );

    const handleChangeSearch = (event: any) => {
        setSearch(event.target.value as string);
        debounceSearch(event.target.value);
    };

    return {
        handleChangeSearch,
        handleChangeStatus,
        handleReset,
        search,
        status,
    }
};

export default useHandleFilterIngredients;