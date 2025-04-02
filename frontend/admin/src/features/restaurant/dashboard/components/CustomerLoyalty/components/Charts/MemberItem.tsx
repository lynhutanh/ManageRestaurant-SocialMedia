import { FaUsers } from "react-icons/fa";

interface MemberItemProps {
    title: string;
    value: number;
}
const MemberItem: React.FC<MemberItemProps> = ({ title, value }) => {
    return (
        <div className="w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
                <span className=" font-medium text-[12px] text-primary-black">{title}</span>
                <span className=" font-semibold text-2xl text-primary">{value}</span>
            </div>
        </div>
    );
};
export default MemberItem;
