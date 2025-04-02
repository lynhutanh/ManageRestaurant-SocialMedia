import { useState } from "react";
import { icons } from "@assets/assets";

interface IconItemProps {
    icon: string;
}
const IconItem = (props: IconItemProps) => {
    return (
        <div className="w-[22px] h-[22px]">
            <img src={props.icon} alt="English" />
            <div className="relative block w-0 group-hover:w-full h-[2px] bg-transparent transition-all duration-500 group-hover:bg-primary-gray-th1-blue"></div>
        </div>
    );
};

const LanguageSelector = () => {
    const { iconEN, iconVN, iconJA } = icons;

    const [selectedLanguage, setSelectedLanguage] = useState(
        localStorage.getItem("language") || "en"
    );

    const handleLanguageChange = (language: string) => {
        localStorage.setItem("language", language);
        setSelectedLanguage(language);
        window.location.reload();
    };

    return (
        <div className="group flex flex-row items-center gap-2 relative">
            {selectedLanguage === "en" && <IconItem icon={iconEN} />}
            {selectedLanguage === "vi" && <IconItem icon={iconVN} />}
            {selectedLanguage === "ja" && <IconItem icon={iconJA} />}
            <div className="absolute hidden text-lg text-black group-hover:block bg-white shadow-lg rounded-md w-[200px] mt-2 py-2 top-[-130px]">
                <div
                    className="px-4 py-1 hover:bg-gray-200 cursor-pointer flex justify-between gap-2"
                    onClick={() => handleLanguageChange("vi")}
                >
                    Tiếng Việt <IconItem icon={iconVN} />
                </div>
                <div
                    className="px-4 py-1 hover:bg-gray-200 cursor-pointer flex justify-between gap-2"
                    onClick={() => handleLanguageChange("en")}
                >
                    English <IconItem icon={iconEN} />
                </div>
                <div
                    className="px-4 py-1 hover:bg-gray-200 cursor-pointer flex justify-between gap-2"
                    onClick={() => handleLanguageChange("ja")}
                >
                    日本 <IconItem icon={iconJA} />
                </div>
            </div>
        </div>
    );
};

export default LanguageSelector;
