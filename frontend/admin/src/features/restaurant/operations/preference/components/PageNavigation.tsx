import React from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface PageNavigationProps {}

const pages = [
    {
        id: 1,
        name: "Home",
        value: "home",
    },
    {
        id: 2,
        name: "About",
        value: "about",
    },
    {
        id: 3,
        name: "Contact",
        value: "contact",
    }
];

const PageNavigation: React.FC<PageNavigationProps> = () => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const handleChangePage = (page: string) => {
        setSearchParams({ page });
    }
    return (
        <div className="flex items-center justify-start gap-5 py-2 px-5 border rounded-md">
            {/* Page tabs */}
            <h2 className="text-[25px] font-medium">{t("Pages")}</h2>
            <div className="flex space-x-2">
                {pages.map((page) => (
                    <div
                        onClick={() => handleChangePage(page.value)}
                        key={page.id}
                        className={`px-4 py-2 rounded cursor-pointer hover:bg-gray-300 ${
                            searchParams.get("page") === page.value ? "bg-primary text-white" : "bg-gray-200"
                        }`}
                    >
                        {t(page.name)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PageNavigation;