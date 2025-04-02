import { Pagination, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ReferralTableProps {}

const fakeData = [
    {
        user: {
            name: "Molly Sanders",
            id: "42",
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
        },
        created_at: "Sept 28, 2019",
        status: "Pending",
        amount: 12,
        region: "en",
    },
    {
        user: {
            name: "Anh Nguyen",
            id: "23",
            img: "https://ai.flux-image.com/flux/26309145-e946-43c8-96d2-86e9777a2466.jpg",
        },
        created_at: "Tháng 3, 2020",
        status: "Completed",
        amount: 41,
        region: "vi",
    },
    {
        user: {
            name: "John Doe",
            id: "12",
            img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
        },
        created_at: "June 15, 2021",
        status: "Overdue",
        amount: 22,
        region: "en",
    },
    {
        user: {
            name: "Trang Tran",
            id: "16",
            img: "https://media.istockphoto.com/id/1388517977/photo/portrait-of-young-asian-girl-posing-on-background.jpg?s=612x612&w=0&k=20&c=vsLLWN1UP1aqlzSwkR5U1LSaMaFrwG4txsfMSZeMRkQ=",
        },
        created_at: "Ngày 10 tháng 8, 2022",
        status: "Pending",
        amount: 42,
        region: "vi",
    },
    {
        user: {
            name: "Emily Clark",
            id: "521",
            img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80",
        },
        created_at: "January 5, 2023",
        status: "Completed",
        amount: 12,
        region: "en",
    },
];

// const StatusFilterList = [
//     { label: "All", value: "" },
//     { label: "Pending", value: "pending" },
//     { label: "Successfully", value: "successfully" },
// ];

const generateTheme = (t: string) => {
    switch (t) {
        case "Pending":
            return "text-pending bg-pending/20";
        case "Completed":
            return "text-delivered bg-delivered/20";
        case "Overdue":
            return "text-off bg-off/20";
        default:
            return "text-pending bg-pending/20";
    }
};

const listTableHeader = [
    "ID",
    "User",
    "Amount Converted",
    "Created At",
    "Status",
];

const ReferralTable: React.FC<ReferralTableProps> = () => {
    const { t } = useTranslation();
    // const [searchValue, setSearchValue] = useState("");
    return (
        <div className="container h-auto w-full bg-inherit pb-3">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto ">
                <div className="inline-block w-full rounded-md gap-4 bg-white p-5   ">
                    <div className="w-full flex justify-between items-center pb-3">
                        <span className="text-lg font-bold text-primary">
                            {t("Leader board")}
                        </span>
                        {/* <div className="flex justify-center items-center gap-2 h-full">
                            <SearchInput
                                value={searchValue}
                                onChange={setSearchValue}
                                placeholder={t("Search something")}
                            />
                            <div className="flex justify-end h-full min-h-[40px]">
                                <select
                                    id="statusFilter"
                                    className=" border border-gray-300 rounded px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 "
                                >
                                    {StatusFilterList.map((item, index) => {
                                        return (
                                            <option
                                                value={item.value}
                                                key={index}
                                            >
                                                {t(item.label)}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div> */}
                    </div>
                    <table className="min-w-full leading-normal ">
                        <thead>
                            <tr className="bg-white rounded-xl">
                                {listTableHeader.map((item, index) => (
                                    <th
                                        key={index}
                                        className="px-5 py-3 border-b-2 border-gray-200  text-left font-semibold text-gray-700 uppercase tracking-wider"
                                    >
                                        {t(item)}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {fakeData.map((item, index) => {
                                if (
                                    item.region !==
                                    localStorage.getItem("language")
                                ) {
                                    return null;
                                }

                                return (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50 cursor-pointer bg-white"
                                    >
                                        <td className="px-5 py-5 border-b border-gray-200">
                                            <p className="text-gray-600 whitespace-no-wrap">
                                                {item.user?.id}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {item.user?.name}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {item.amount}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {item.created_at}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200">
                                            <span
                                                className={`relative inline-block px-3 py-1 rounded-md font-medium leading-tight ${generateTheme(
                                                    item.status
                                                )}`}
                                            >
                                                <span className={`relative `}>
                                                    {t(item.status)}
                                                </span>
                                            </span>
                                        </td>
                                        {/* <td className="px-5 py-5 border-b border-gray-200 text-sm text-right gap-2">
                                            <div className="inline-block bg-dashboard-blue/15 p-1 rounded-md text-dashboard-blue hover:bg-dashboard-blue/25 mr-2">
                                                <svg
                                                    className="inline-block h-6 w-6 fill-current"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
                                                </svg>
                                            </div>
                                            <div className="inline-block bg-dashboard-violet/15 p-1 rounded-md text-dashboard-violet hover:bg-dashboard-violet/25">
                                                <svg
                                                    className="inline-block h-6 w-6 fill-current"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                                                </svg>
                                            </div>
                                        </td> */}
                                    </tr>
                                );
                            })}

                            {/* Thêm các dòng dữ liệu khác ở đây */}
                        </tbody>
                    </table>
                    <div className="w-auto pt-4 float-end">
                        <Stack spacing={1}>
                            <Pagination
                                count={22}
                                siblingCount={0}
                                onChange={(event, page) => {}}
                            />
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferralTable;
