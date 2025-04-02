import { HiDotsVertical } from "react-icons/hi";
import { FormatCurrency } from "@utils/common/formatCurrency";
import { FaFilter } from "react-icons/fa";
import { Pagination, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import Tooltip from "@components/tooltip/ToolTip";

interface IMember {
    name: string;
    avatar: string;
    createdAt: string;
    amountSpent: number;
    region?: string;
}

interface MemberTableProps {
    title: string;
    data: IMember[];
    content: string;
}

const MemberCard = (props: IMember) => {
    const { name, createdAt, amountSpent } = props;
    return (
        <div className="w-full grid grid-cols-12 gap-4 p-4 rounded-md hover:bg-blue-100 cursor-pointer">
            {/* <div className="flex flex-col justify-center items-end col-span-2">
                <img
                    src={avatar}
                    alt="avatar"
                    className="h-10 w-10 rounded-full"
                />
            </div> */}
            <div className="h-full w-[2px] bg-primary col-span-1"></div>
            <div className="flex flex-col justify-between items-start gap-2 col-span-6">
                <span className="font-semibold text-sm truncate max-w-full">
                    {name}
                </span>
                <span className="text-sm">{createdAt}</span>
            </div>
            <div className="flex justify-between items-center col-span-5  gap-5 ">
                <span className=" font-medium text-sm">
                    {FormatCurrency(amountSpent)}
                </span>
                <HiDotsVertical className="text-black hover:cursor-pointer" />
            </div>
        </div>
    );
};

const MemberTable: React.FC<MemberTableProps> = ({ data, title, content }) => {
    const { t } = useTranslation();
    return (
        <div className="w-1/3 h-[500px]  flex flex-col justify-between items-center bg-white rounded-md shadow-md p-5">
            <div className="w-full flex justify-between items-center px-4 text-primary">
                <span className="text-lg font-bold ">
                    <Tooltip
                        title={t(title)}
                        altTitle={t(title)}
                        content={t(content)}
                    />
                </span>
                <FaFilter className="cursor-pointer" />
            </div>
            {data.map((item, index) => {
                if (item.region !== localStorage.getItem("language")) {
                    return null;
                }
                return (
                    <MemberCard
                        key={index}
                        name={item.name}
                        avatar={item.avatar}
                        createdAt={item.createdAt}
                        amountSpent={item.amountSpent}
                    />
                );
            })}
            <div className="w-auto pt-4">
                <Stack spacing={1}>
                    <Pagination
                        count={22}
                        siblingCount={0}
                        onChange={(event, page) => {}}
                    />
                </Stack>
            </div>
        </div>
    );
};
export default MemberTable;
