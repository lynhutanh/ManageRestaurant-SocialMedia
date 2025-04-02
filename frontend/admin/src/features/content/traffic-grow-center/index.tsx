import { lazy, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Tab } from "@/types/affiliate";
import { adminTabs, affiliateTabs } from "@constants/affiliate";
import PopupFormAffiliate from "./components/Pops-up";
import bgPageNotFound from "../../../assets/images/bgPageNotFound.jpg"

// const AffiliateManage = lazy(() => import("./components/AffiliateManage"));
// const CreateLink = lazy(() => import("./components/CreateLink"));
// const LinkManage = lazy(() => import("./components/LinkManage"));

const AffiliateLink = () => {


    return (
        <div className="h-full w-full bg-white rounded-md relative p-6">
            <img src={bgPageNotFound} alt="" />
        </div>
    );
};

export default AffiliateLink;
