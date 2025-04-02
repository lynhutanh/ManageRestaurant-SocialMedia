// import Tooltip from "@mui/material/Tooltip/Tooltip";
import { useTranslation } from "react-i18next";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import Tooltip from "@components/tooltip/ToolTip";

interface RatingItemProps {
    title: string;
    altTitle: string;
    icon: JSX.Element;
    value: number;
    content: string;
}
const RatingItem = (props: RatingItemProps) => {
    const { t } = useTranslation();
    const { title, icon, value, altTitle, content } = props;
    const percent = (value - 20) / 100;
    return (
        <div className="w-full h-[100px] bg-white shadow-md text-primary-black  col-span-1 rounded-md px-5 py-2 flex flex-col justify-between">
            <div className="w-full h-full flex justify-start items-center gap-2 text-lg font-medium">
                {icon}
                <Tooltip
                    title={t(title)}
                    altTitle={t(altTitle)}
                    content={t(content)}
                />
            </div>

            <div className="w-full h-full flex justify-between items-end">
                <span className="text-2xl font-semibold truncate">{value}</span>
                <span className={`rounded-md flex gap-2 items-center`}>
                    {percent >= 0 ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
                    {percent}%
                </span>
            </div>
        </div>
    );
};
export default RatingItem;
