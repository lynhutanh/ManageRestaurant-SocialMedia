import { lazy, useState } from "react";
import { useTranslation } from "react-i18next";
const System = lazy(() => import("./components/System/System"));
const Referral = lazy(() => import("./components/Referral/Referral"));
const Member = lazy(() => import("./components/CustomerLoyalty/Member"));

const tabs = [
    { label: "System", value: "System" },
    { label: "Referral", value: "Referral" },
    { label: "Member", value: "Member" },
];
export default function DashBoard() {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<string>("Member");

    const renderContent = () => {
        switch (activeTab) {
            case "System":
                return <System />;
            case "Referral":
                return <Referral />;
            case "Member":
                return <Member />;
            default:
                return null;
        }
    };
    return (
        <div className=" w-full h-screen gap-3 bg-primary-gray-th1 rounded-md flex flex-col justify-start items-center">
            <div className="w-full flex border-b border-gray-300 row-span-2">
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={`flex-1 py-2 text-center uppercase font-semibold cursor-pointer border-b-2 border-transparent hover:border-primary transition-colors duration-200 ease-in-out ${
                            activeTab === tab.value
                                ? "!border-primary text-primary"
                                : "text-primary-black"
                        }`}
                        onClick={() => setActiveTab(tab.value)}
                    >
                        {t(tab.label)}
                    </div>
                ))}
            </div>
            {renderContent()}
        </div>
    );
}
