import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

const useHandleFilterBar = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const [status, setStatus] = useState("");
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("");

    const [params] = useSearchParams();

    const handleReset = () => {
        setStatus("");
        setSearch("");
        setDate("");
        params.delete(t("status"));
        params.delete(t("title"));
        params.delete(t("date"));
        navigate(`?${params.toString()}`);
        window.location.reload();
    };
    const handleChangeDate = (value: string) => {
        setDate(value as string);
        if (value === "") {
            params.delete(t("date"));
            navigate(`?${params.toString()}`);
            return;
        }
        params.delete(t("date"));
        params.append(t("date"), value as string);
        navigate(`?${params.toString()}`);
    };

    const handleChangeStatus = (value: string) => {
        setStatus(value as string);
        if (value === "") {
            params.delete(t("status"));
            navigate(`?${params.toString()}`);
            return;
        }
        params.delete(t("status"));
        params.append(t("status"), value as string);
        navigate(`?${params.toString()}`);
    };
    const handleChangeSearch = (event: any) => {
        setSearch(event.target.value as string);
        if (event.target.value === "") {
            params.delete(t("title"));
            navigate(`?${params.toString()}`);
            return;
        }
        params.delete(t("title"));
        params.append(t("title"), event.target.value as string);
        navigate(`?${params.toString()}`);
    };

    return {
        status,
        search,
        date,
        handleReset,
        handleChangeStatus,
        handleChangeSearch,
        handleChangeDate,
    };
};

export default useHandleFilterBar;
