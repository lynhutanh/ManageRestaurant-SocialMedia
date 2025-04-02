export const FormatCurrency = (value: number) => {
    const lang = localStorage.getItem("language");
    if (lang === "en") {
        return ConvertExchangeRate(value).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    } else {
        return ConvertExchangeRate(value).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    }
};

export const ConvertExchangeRate = (amount: number) => {
    const lang = localStorage.getItem("language");
    if (lang === "vi") {
        return amount * 23000;
    }
    if (lang === "en") {
        return amount;
    }
    if (lang === "jp") {
        return amount * 110;
    }
    return amount;
};
