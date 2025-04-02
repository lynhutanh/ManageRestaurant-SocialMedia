import { useTranslation } from "react-i18next";
import { TbRefresh } from "react-icons/tb";

interface RefeshButtonProps {
    handleReset: () => void;
}
const RefeshButton = (props: RefeshButtonProps) => {
    const {t} = useTranslation();
    const { handleReset } = props;
    return (
        <div
            className="flex justify-center items-center gap-2 group hover:cursor-pointer underline-offset-4 hover:underline ml-2"
            onClick={handleReset}
        >
            <TbRefresh className="group-hover:rotate-180 transition-all duration-300" />
            <span>{t("Refresh List")}</span>
        </div>
    );
};

export default RefeshButton;
