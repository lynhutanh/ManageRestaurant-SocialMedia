const SetLanguage = (lang: string) => {
    switch (lang) {
        case "VN":
            localStorage.setItem("language", "vi");
            window.location.reload();

            return;
        case "EN":
            localStorage.setItem("language", "en");
            window.location.reload();

            return;
        default:
            localStorage.setItem("language", "en");
            window.location.reload();
    }
};

export default SetLanguage;
