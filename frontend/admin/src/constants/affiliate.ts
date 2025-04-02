import { Tab } from "@/types/affiliate";

const AffiliateManageTableHeader = [
    "ID",
    "Name",
    "Links",
    "Clicks",
    "Conversion Rate",
    "Revenue",
    "Commission",
];

const LinkManageTableHeader = [
    "ID",
    "Link",
    "Clicks",
    "Conversion Rate",
    "Revenue",
    "Commission",
    "Action",
];

const adminTabs: Tab[] = [
    {
        id: 1,
        label: "Affiliate Manager",
    },
];
const affiliateTabs: Tab[] = [
    {
        id: 2,
        label: "Link Manager",
    },
    {
        id: 3,
        label: "Create Link",
    },
];

export {
    LinkManageTableHeader,
    AffiliateManageTableHeader,
    adminTabs,
    affiliateTabs,
};
