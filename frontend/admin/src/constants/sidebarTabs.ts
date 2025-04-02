import React from "react";
import {
    LiaChalkboardSolid,
    LiaAlgolia,
    LiaClipboardListSolid,
    LiaLuggageCartSolid,
    LiaUsersCogSolid,
    LiaBellSolid,
} from "react-icons/lia";
import { IoShareSocial } from "react-icons/io5";
import { SiArtifacthub } from "react-icons/si";
import { FaLink } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { MdAdminPanelSettings } from "react-icons/md";

import path from "./path";
export interface SidebarItem {
    id: number;
    name: string;
    link?: string;
    icon?: React.ReactElement;
    permission: string;
    children?: SidebarItem[];
    info?: string;
}
export const sideBarItems: SidebarItem[] = [
    {
        id: 100,
        name: "Restaurant",
        icon: React.createElement(LiaChalkboardSolid),
        permission: "Restaurant Management",
        children: [
            {
                id: 101,
                name: "Dashboard",
                link: path.dashboard,
                icon: React.createElement(LiaChalkboardSolid),
                permission: "View Dashboard",
                info: "Get a comprehensive overview of the restaurant's performance, including key metrics, sales, and trends to help make informed business decisions",
            },
            {
                id: 102,
                name: "Products",
                icon: React.createElement(LiaClipboardListSolid),
                permission: "Manage Products",
                info: "Manage all aspects of the restaurant's products, including creating, editing, and organizing menu items and ingredients to ensure efficient operations",
                children: [
                    {
                        id: 6,
                        name: "Menu",
                        link: path.menu,
                        permission: "Manage Menu",
                        info: "Organize and manage the restaurant's menu items, including pricing, descriptions, and availability",
                    },
                    {
                        id: 7,
                        name: "Ingredient",
                        link: path.ingredient,
                        permission: "Manage Ingredients",
                        info: "Track and manage the inventory of ingredients to maintain stock levels and reduce waste",
                    },
                ],
            },
            {
                id: 103,
                name: "Orders",
                icon: React.createElement(LiaLuggageCartSolid),
                permission: "Manage Orders",
                info: "Oversee the ordering process, including tracking new orders, reviewing history, and managing vouchers to enhance customer satisfaction",
                children: [
                    {
                        id: 9,
                        name: "Order",
                        link: path.order,
                        permission: "Change AI Content Generation",
                        info: "View and manage active orders, ensuring timely preparation and delivery to customers",
                    },
                    {
                        id: 16,
                        name: "History",
                        link: path.history,
                        permission: "Manage History",
                        info: "Access the restaurant's order history to review past transactions and gain insights into customer preferences",
                    },
                    // {
                    //     id: 10,
                    //     name: "Voucher",
                    //     link: path.voucher,
                    //     permission: "Manage Voucher",
                    //     info: "Create, edit, and manage promotional vouchers to attract customers and boost sales",
                    // },
                ],
            },
            {
                id: 104,
                name: "Operations",
                icon: React.createElement(LiaAlgolia),
                permission: "Manage Operations",
                info: "Streamline the restaurant's operations by managing key areas such as kitchen workflows and staff schedules",
                children: [
                    {
                        id: 12,
                        name: "Kitchen",
                        link: path.kitchen,
                        permission: "Manage Kitchen",
                        info: "Monitor and optimize kitchen operations to ensure efficiency and high-quality food preparation",
                    },
                    {
                        id: 13,
                        name: "Schedule",
                        link: path.schedule,
                        permission: "Manage Schedule",
                        info: "Manage staff schedules to ensure proper coverage and smooth day-to-day operations",
                    },
                ],
            },
            {
                id: 105,
                name: "Notification",
                link: path.notification,
                icon: React.createElement(LiaBellSolid),
                permission: "Manage Notification",
                info: "Configure and manage notifications to keep the staff and management updated on important events and updates",
            },
            {
                id: 106,
                name: "Settings",
                icon: React.createElement(LiaUsersCogSolid),
                permission: "Manage Settings",
                info: "Customize and configure restaurant settings, including user profiles and layout preferences, to suit business needs",
                children: [
                    {
                        id: 18,
                        name: "Profile",
                        link: path.profile,
                        permission: "Manage Profile",
                        info: "Update and manage user profiles, including personal and account details",
                    },
                    {
                        id: 19,
                        name: "Layout",
                        link: path.grid,
                        permission: "Manage Layout",
                        info: "Customize the layout and appearance of the restaurant's system interface to improve usability",
                    },
                ],
            },
        ],
    },
    {
        id: 99,
        name: "Content",
        icon: React.createElement(IoShareSocial),
        permission: "Content Management",
        children: [
            {
                id: 107,
                name: "AI Content",
                link: path.ai_content_creation,
                icon: React.createElement(SiArtifacthub),
                permission: "Manage AI Content",
                info: "Leverage AI tools to generate, manage, and optimize content for marketing, promotions, and customer engagement",

            },
            {
                id: 108,
                name: "Social Media",
                icon: React.createElement(GoPeople),
                permission: "Manage Social Media",
                info: "Organize and manage affiliate links to increase revenue through partnerships and collaborations",
                children: [
                    {
                        id: 20,
                        name: "Media Management",
                        link: path.social_media_management,
                        permission: "",
                        info: "Manage posts on social media platforms",
                    },
                    {
                        id: 21,
                        name: "Post Scheduler",
                        link: path.social_post_scheduler,
                        permission: "",
                        info: "Create a posting schedule with add, delete, and edit operations",
                    },
                ],
            },
            {
                id: 109,
                name: "Traffic Grow Center",
                link: path.affiliate_management,
                icon: React.createElement(FaLink),
                permission: "Manage Affiliate",
                info: "Organize and manage affiliate links to increase revenue through partnerships and collaborations",
            },
            {
                id: 110,
                name: "Settings",
                link: path.setting,
                icon: React.createElement(MdAdminPanelSettings),
                permission: "Setting Content",
                info: "Adjust content settings, including permissions, preferences, and system configurations, to enhance content management efficiency",
            },
        ],
    },
];
