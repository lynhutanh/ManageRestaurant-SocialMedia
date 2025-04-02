import { useTranslation } from "react-i18next";

interface FilterNotificationProps {
    filterValue: string;
    setFilter: (value: string) => void;
}

const FilterNotification: React.FC<FilterNotificationProps> = ({
    filterValue,
    setFilter,
}) => {
    const { t } = useTranslation();
    return (
        <select
            name="filter"
            id="filter-select"
            value={filterValue}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded-md"
        >
            <option value="all">{t("All")}</option>
            <option value="0">{t("Unread")}</option>
            <option value="1">{t("Read")}</option>
            <option value="newest">{t("Newest")}</option>
            <option value="latest">{t("Latest")}</option>
        </select>
    );
};

export default FilterNotification;