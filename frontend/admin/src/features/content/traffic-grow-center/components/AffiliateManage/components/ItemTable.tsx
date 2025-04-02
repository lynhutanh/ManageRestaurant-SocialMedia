import { Pagination, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IAffiliateUser } from "@/types/affiliate";
import { FormatCurrency } from "@utils/common/formatCurrency";
import { AffiliateManageTableHeader } from "@constants/affiliate";

interface ReferralTableProps {
    data: IAffiliateUser[];
}

const ReferralTable: React.FC<ReferralTableProps> = ({ data }) => {
    const { t } = useTranslation();
    return (
        <div className="container h-auto w-full bg-inherit">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto ">
                <div className="inline-block w-full rounded-md gap-4 bg-white p-5 ">
                    <div className="w-full flex justify-between items-center  pb-3 ">
                        <span className="text-2xl font-semibold text-primary">
                            {t("Members")}
                        </span>
                    </div>
                    <table className="min-w-full ">
                        <thead>
                            <tr className="bg-white rounded-xl">
                                {AffiliateManageTableHeader.map(
                                    (item, index) => (
                                        <th
                                            key={index}
                                            className="px-5 py-3 border-b-2 border-gray-200  text-left text-xs font-bold text-gray-700  tracking-wider"
                                        >
                                            {t(item)}
                                        </th>
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item: IAffiliateUser, index: number) => {
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
                                        {/* Affiliate Name */}
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {item.id}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {item.name}
                                            </p>
                                        </td>

                                        {/* Links Count */}
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {item.links}
                                            </p>
                                        </td>

                                        {/* Clicks Count */}
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {item.clicks}
                                            </p>
                                        </td>

                                        {/* Conversion Rate */}
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {item.conversionRate}
                                            </p>
                                        </td>

                                        {/* Revenue */}
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {FormatCurrency(item.revenue)}
                                            </p>
                                        </td>

                                        {/* Commission */}
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {FormatCurrency(
                                                    item.commission
                                                )}
                                            </p>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="w-auto pt-4 float-end">
                        <Stack spacing={1}>
                            <Pagination
                                count={10}
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
