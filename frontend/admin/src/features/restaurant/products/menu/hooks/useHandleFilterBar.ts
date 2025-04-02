import { useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import debounce from "lodash/debounce";

const useHandleFilterBar = () => {
    const navigate = useNavigate();

    const [status, setStatus] = useState("");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const [params] = useSearchParams();

    const handleReset = () => {
        setStatus("");
        setSearch("");
        setCategory("");
        params.delete("status");
        params.delete("title");
        params.delete("category");
        navigate(`?${params.toString()}`);
        window.location.reload();
    };

    const handleChangeCategory = (value: string) => {
        setCategory(value);
        if (value === "") {
            params.delete("category");
            navigate(`?${params.toString()}`);
            return;
        }
        params.delete("category");
        params.append("category", value);
        navigate(`?${params.toString()}`);
    };

    const handleChangeStatus = (value: string) => {
        setStatus(value);
        if (value === "") {
            params.delete("status");
            navigate(`?${params.toString()}`);
            return;
        }
        params.delete("status");
        params.append("status", value);
        navigate(`?${params.toString()}`);
    };

    // Debounced search handler
    const debouncedNavigate = useCallback(
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

    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearch(value);
        debouncedNavigate(value);
    };

    return {
        status,
        search,
        category,
        setSearch,
        handleReset,
        handleChangeCategory,
        handleChangeStatus,
        handleChangeSearch,
    };
};

export default useHandleFilterBar;
