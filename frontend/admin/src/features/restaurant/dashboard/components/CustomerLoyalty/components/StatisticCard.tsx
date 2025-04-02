import { FormatCurrency } from "@utils/common/formatCurrency";

interface MemberCardProps {
    title: string;
    total: number;
    icon: JSX.Element;
    type: string;
    className?: string;
}

const MemberCard: React.FC<MemberCardProps> = ({
    title,
    total,
    icon,
    type,
    className
}) => {
    return (
        <div className="flex flex-col justify-between items-start bg-white rounded-md shadow-md w-full h-full text-black p-6">
            <div className="flex flex-col justify-between items-start gap-2">
                <div className=" text-3xl font-semibold  text-primary-black">
                    {type === "currency"
                        ? FormatCurrency(total)
                        : total}
                </div>
                <div className=" text-sm font-medium text-primary-black">{title}</div>
            </div>
            <div className={`p-2 rounded-lg ${className} `}>{icon}</div>
        </div>
    );
};
export default MemberCard;
