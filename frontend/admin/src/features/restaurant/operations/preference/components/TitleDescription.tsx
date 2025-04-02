import React from "react";
import { useTranslation } from "react-i18next";

interface TitleDescriptionProps {
    title: string;
    description: string;
}

const TitleDescription: React.FC<TitleDescriptionProps> = ({ title, description }) => {
    const { t } = useTranslation();
    return (
        <div className="p-4 border rounded shadow-md">
            <h1 className="text-xl font-bold mb-2">{t(title)}</h1>
            <p className="text-gray-600">{t(description)}</p>
        </div>
    );
};

export default TitleDescription;