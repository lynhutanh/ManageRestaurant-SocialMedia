//components
import { useTranslation } from "react-i18next";
import MainPanel from "./components/MainPanel";

export default function Kitchen() {
    const { t } = useTranslation();
    return (
        <div className="w-full h-full flex flex-col gap-2">
            <div className="w-full p-3 flex justify-start items-center bg-white rounded-md">
                <span className=" text-2xl font-semibold text-primary">
                    {t("Kitchen Flow")}
                </span>
            </div>

            <MainPanel />
        </div>
    );
}
