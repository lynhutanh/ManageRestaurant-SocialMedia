import { useTranslation } from "react-i18next";

interface TextProps {
    text: string;
    classNameValue: string;
}
const TextColumn: React.FC<TextProps> = ({
    text,
    classNameValue,
}) => {
    const { t } = useTranslation();
    return (
        <div className={`flex ${classNameValue}`}>
            <p className="text-sm font-semibold">{t(text)}</p>
        </div>
    );
};

export default TextColumn;