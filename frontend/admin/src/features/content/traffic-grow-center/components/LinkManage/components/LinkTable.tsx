import { useState } from "react";
import { Pagination, Stack } from "@mui/material";
import { FaTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { FormatCurrency } from "@utils/common/formatCurrency";
import { ILinkTable } from "@/types/affiliate";
import { LinkManageTableHeader } from "@constants/affiliate";
const linkTableData: ILinkTable[] = [
    {
        id: 1,
        link: "https://example.com/product-1",
        clicks: 422,
        conversionRate: 5,
        revenue: 45,
        commission: 45 * 0.08,
    },
    {
        id: 2,
        link: "https://example.com/product-2",
        clicks: 123,
        conversionRate: 4,
        revenue: 12,
        commission: 12 * 0.08,
    },
    {
        id: 3,
        link: "https://example.com/product-3",
        clicks: 345,
        conversionRate: 6,
        revenue: 32,
        commission: 32 * 0.08,
    },
    {
        id: 4,
        link: "https://example.com/product-4",
        clicks: 244,
        conversionRate: 3,
        revenue: 21,
        commission: 21 * 0.08,
    },
    {
        id: 5,
        link: "https://example.com/product-5",
        clicks: 321,
        conversionRate: 2,
        revenue: 35,
        commission: 35 * 0.08,
    },
];

const LinkTable = () => {
    const { t } = useTranslation();
    const handleDeleteLink = () => {
    };
    return (
        <div className="container h-auto w-full bg-inherit">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
                <div className="inline-block w-full rounded-md gap-4 bg-white p-5">
                    <div className="w-full flex justify-between items-center pb-3">
                        <span className="text-2xl font-semibold text-primary">
                            {t("Affiliate Links Management")}
                        </span>
                    </div>
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="bg-white rounded-xl">
                                {LinkManageTableHeader.map((item, index) => (
                                    <th
                                        key={index}
                                        className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-bold text-gray-700  tracking-wider"
                                    >
                                        {t(item)}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {linkTableData.map((item, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50 cursor-pointer bg-white"
                                >
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {item.id}
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <p className="text-blue-500 underline whitespace-no-wrap">
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {item.link}
                                            </a>
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        {item.clicks}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        {item.conversionRate}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        {FormatCurrency(item.revenue)}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        {FormatCurrency(item.commission)}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                        <div
                                            onClick={handleDeleteLink}
                                            className="flex justify-center items-center p-1  rounded-md w-fit"
                                        >
                                            <FaTrashAlt className="text-dashboard-red/60 hover:text-dashboard-red/80  cursor-pointer size-5" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="w-auto pt-4 float-end">
                        <Stack spacing={1}>
                            <Pagination
                                count={2}
                                siblingCount={0}
                                onChange={(event, page) => { }}
                            />
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LinkTable;
