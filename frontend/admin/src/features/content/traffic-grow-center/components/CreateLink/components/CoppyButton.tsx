import { useTranslation } from "react-i18next";
import { MdContentCopy } from "react-icons/md";

interface CoppyButtonProps {
    link: string;
}

const CoppyButton = (props: CoppyButtonProps) => {
    const { t } = useTranslation();
    const { link } = props;

    const handleCopyLink = (link: string) => {
        navigator.clipboard.writeText(link);
        alert(t("Link copied to clipboard!"));
    };
    return (
        <div
            onClick={() => handleCopyLink(link)}
            className="bg-primary w-fit h-full text-white px-4 py-2 rounded-md hover:bg-primary/80 transform duration-200 flex items-center justify-between gap-2 cursor-pointer"
        >
            <MdContentCopy />
            <span className="truncate w-full flex justify-center text-lg font-medium">
                {t("Copy Link")}
            </span>
        </div>
    );
};

export default CoppyButton;
