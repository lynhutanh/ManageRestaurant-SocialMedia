import React, { useState } from "react";
import CoppyButton from "./components/CoppyButton";
import { useTranslation } from "react-i18next";

const AffiliateLinkGenerator: React.FC = () => {
    const { t } = useTranslation();
    const [pageUrl, setPageUrl] = useState("");
    const [customLink, setCustomLink] = useState("");
    const handleGenerateLink = () => {
        if (!pageUrl) return;
        let link = `${pageUrl}`;
        setCustomLink(link);
    };

    return (
        <div className="w-full p-5 bg-white shadow-md rounded-md mt-3">
            <div>
                <label className="block text-primary text-sm font-semibold mb-2">
                    {t("Link Generator")}
                </label>
                <p className="text-gray-500 text-sm mb-3">
                    {t(
                        "Enter any URL from this website in the form below to generate a custom link"
                    )}
                </p>
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        value={pageUrl}
                        onChange={(e) => setPageUrl(e.target.value)}
                        placeholder={t("Page URL")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <div
                        onClick={handleGenerateLink}
                        className="bg-primary text-white text-lg font-medium px-4 py-2 rounded-md hover:bg-primary/80 transform duration-200 flex justify-center items-center cursor-pointer"
                    >
                        {t("Create Custom Link")}
                    </div>
                </div>

                {customLink && (
                    <div className="mt-5">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            {t("Generated Custom Link")}
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={customLink}
                                readOnly
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <CoppyButton link={customLink} />
                     
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AffiliateLinkGenerator;
