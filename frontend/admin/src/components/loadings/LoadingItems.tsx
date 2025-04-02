import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const LoadingItems = () => {
    const { t } = useTranslation();
    const [isDone, setIsDone] = useState(false);
    setTimeout(() => {
        setIsDone(true);
    }, 5000);
    return (
        <div className="w-full h-full grid-rows-10 bg-white rounded-md flex items-center justify-center p-5">
            {isDone && (
                <span className="text-red-500 font-semibold text-2xl">
                    {t("No item found")}
                </span>
            )}
            {!isDone && (
                <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                </Box>
            )}
        </div>
    );
};

export default LoadingItems;
