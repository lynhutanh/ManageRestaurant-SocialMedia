import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { IoIosArrowForward } from "react-icons/io";
import { sidebar } from "@assets/assets";
// import logo from "@assets/images/logo.png";
import { logo } from "@assets/assets";
import { IoMdExit } from "react-icons/io";
import { logout } from "@stores/redux/slice/user.slice";
import { sideBarItems, SidebarItem } from "@constants/sidebarTabs";
import LanguageSelector from "@components/selectors/LanguageSelector";
import Tooltip from "@components/tooltip/ToolTip";
import { deleteLoginCookies } from "@utils/auth/handleCookies";
import "./css/index.css";
import path from "@/constants/path";

export default function SideBar() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { permissions, image } = useSelector((state: any) => state.userSlice);

    const [isCollapsedSidebar, setIsCollapsedSidebar] = useState(false);
    const [isOpenSectionSelector, setIsOpenSectionSelector] = useState(false);
    const [openGroups, setOpenGroups] = useState<{ [key: number]: boolean }>(
        {}
    );
    const [activeHover, setActiveHover] = useState<number | null>(null);
    const [activeRoot, setActiveRoot] = useState<number>(() => {
        const savedRoot = sessionStorage.getItem("activeRoot");
        return savedRoot ? parseInt(savedRoot, 10) : sideBarItems[0].id;
    });
    const [active, setActive] = useState<number>(() => {
        const saved = sessionStorage.getItem("active");
        return saved ? parseInt(saved, 10) : 1;
    });

    const itemcss: string = `cursor-pointer w-full py-2 rounded-md flex justify-start items-center gap-2 text-white hover:bg-primary-th1/80 transition-all ${isCollapsedSidebar ? "justify-center" : "px-8"
        }`;

    // Filter sidebar items by permissions
    const filterItems = (items: SidebarItem[]): SidebarItem[] =>
        items
            .map((item) => {
                if (item.children) {
                    const filteredChildren = filterItems(item.children);
                    return filteredChildren.length > 0
                        ? { ...item, children: filteredChildren }
                        : null;
                }
                return permissions.includes(item.permission) ? item : null;
            })
            .filter((item): item is SidebarItem => item !== null);
    const filteredSideBarItems = filterItems(sideBarItems);
    const currentRoot = filteredSideBarItems.find(
        (item) => item.id === activeRoot
    );
    const handleSetActive = (id: number, link?: string) => {
        setActive(id);
        if (link) navigate(link);
    };
    const handleGroupClick = (id: number) => {
        setOpenGroups((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    const handleRootChange = (id: number) => {
        setActiveRoot(id);
        sessionStorage.setItem("activeRoot", id.toString());
        setOpenGroups({});
    };
    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Logout",
            cancelButtonText: "No",
            confirmButtonColor: "#FF760E",
            cancelButtonColor: "#727D73",
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.clear();
                dispatch(logout());
                deleteLoginCookies();
                navigate("/login");
            }
        });
    };
    const renderItems = (items: SidebarItem[]) =>
        items.map((item, index) => (
            <div key={index} className={`w-full mb-2`}>
                {item.children ? (
                    <>
                        <div
                            onMouseEnter={() => setActiveHover(index)}
                            onMouseLeave={() => setActiveHover(null)}
                            onClick={
                                isCollapsedSidebar
                                    ? () => toggleSidebar()
                                    : () => handleGroupClick(item.id)
                            }
                            className={`relative cursor-pointer w-full py-2 rounded-md flex justify-between items-center gap-2 text-white hover:bg-primary-th1/80 transform duration-200 ease-linear ${isCollapsedSidebar
                                ? " !justify-center items-center"
                                : "px-8"
                                }`}
                        >
                            <div
                                className={`flex items-center justify-start gap-2  ${openGroups[item.id] && "font-bold"
                                    }
                                ${isCollapsedSidebar ? "justify-center" : ""}`}
                            >
                                {activeHover === index &&
                                    !isCollapsedSidebar &&
                                    item.id > 100 && (
                                        <div className="absolute left-1 top-1/2 -translate-y-1/2 ">
                                            <Tooltip
                                                title=""
                                                content={
                                                    t(item.info as string) || ""
                                                }
                                                altTitle={t(
                                                    "Manage " + item.name
                                                )}
                                                className="text-white hover:text-white/70"
                                            />
                                        </div>
                                    )}
                                <span className="text-[22px]">{item.icon}</span>
                                <span
                                    className={`text-sm whitespace-nowrap w-max flex items-center ${isCollapsedSidebar ? "hidden" : ""
                                        }`}
                                >
                                    {t(item.name)}
                                </span>
                            </div>
                            <span
                                className={`${isCollapsedSidebar ? "hidden" : ""
                                    }`}
                            >
                                <IoIosArrowForward
                                    className={`text-[14px] transition-transform duration-200 ${openGroups[item.id] ? "rotate-90" : ""
                                        }`}
                                />
                            </span>
                        </div>
                        {openGroups[item.id] && (
                            <div className="mt-1 pl-7 ">
                                {renderItems(item.children)}
                            </div>
                        )}
                    </>
                ) : (
                    <div
                        onMouseEnter={() =>
                            item.id > 100 ? setActiveHover(index) : null
                        }
                        onMouseLeave={() => setActiveHover(null)}
                        onClick={
                            isCollapsedSidebar
                                ? () => toggleSidebar()
                                : () => handleSetActive(item.id, item.link)
                        }
                        className={`cursor-pointer w-full  py-2 rounded-md flex justify-start items-center gap-2 hover:bg-primary-th1/80 transform duration-200 ease-linear  ${active === item.id
                            ? "text-white bg-primary  bg-opacity-10"
                            : "text-white"
                            } ${isCollapsedSidebar ? "justify-center" : "px-8"}`}
                    >
                        {activeHover === index &&
                            !isCollapsedSidebar &&
                            item.id > 100 && (
                                <div className="absolute left-2 top-1/2 -translate-y-1/2 ">
                                    <Tooltip
                                        title=""
                                        content={t(item.info as string) || ""}
                                        altTitle={t("Manage " + item.name)}
                                        className="text-white hover:text-white/70"
                                    />
                                </div>
                            )}
                        <span className="text-[22px]">{item.icon}</span>
                        <span
                            className={`text-sm max-w-1/3 whitespace-nowrap flex items-center ${isCollapsedSidebar ? "hidden" : ""
                                }`}
                        >
                            {t(item.name)}
                        </span>
                    </div>
                )}
            </div>
        ));
    const toggleSidebar = () => {
        setIsCollapsedSidebar(!isCollapsedSidebar);
    };

    useEffect(() => {
        sessionStorage.setItem("active", active.toString());
    }, [active]);

    return (
        <div
            className={`relative h-full bg-custom-sidebar rounded-r-md text-white shadow-2xl border-gray-100 flex flex-col justify-between items-start px-2 transition-all duration-200 ${isCollapsedSidebar ? "w-[57.5px]" : "w-[230px]"
                }`}
        >
            <div
                onClick={toggleSidebar}
                className={`absolute top-3 right-3 p-2 z-50 cursor-pointer transform duration-200 ease-in-out  ${isCollapsedSidebar ? "scale-x-100" : "scale-x-[-1]"
                    }`}
            >
                <img
                    src={sidebar.sidebarToggle}
                    alt=""
                    className="size-4 object-cover"
                />
            </div>
            <div
                className={`${!isCollapsedSidebar ? "block" : "hidden"
                    } w-full h-1/5 flex justify-center items-end`}
            >
                <img
                    className="w-[80%] h-auto object-cover mb-2"
                    src={logo}
                    alt="Logo"
                />
            </div>

            <div className="w-full h-[60%] overflow-y-scroll scrollbar-hidden">
                <div
                    className={`w-full px-5 py-4 ${isCollapsedSidebar
                        ? "opacity-0 pointer-events-none"
                        : ""
                        }`}
                >
                    <div className="relative w-full">
                        <select
                            className="w-full px-4 py-2 rounded-md border border-white bg-transparent text-white appearance-none outline-none"
                            value={activeRoot}
                            onChange={(e) =>
                                handleRootChange(Number(e.target.value))
                            }
                            onFocus={() => setIsOpenSectionSelector(true)}
                            onBlur={() => setIsOpenSectionSelector(false)}
                        >
                            {filteredSideBarItems.map((item) => (
                                <option
                                    key={item.id}
                                    value={item.id}
                                    className="text-black bg-white"
                                >
                                    {item.name}
                                </option>
                            ))}
                        </select>

                        {/* Rotating Arrow */}
                        <div
                            className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white transition-transform duration-200 ${isOpenSectionSelector ? "rotate-90" : ""
                                }`}
                        >
                            <IoIosArrowForward />
                        </div>
                    </div>
                </div>

                <div
                    className={`w-full flex-1 overflow-y-scroll scrollbar-hidden transition-opacity duration-200`}
                >
                    {currentRoot && renderItems(currentRoot.children || [])}
                </div>
            </div>

            {/* bottom section */}
            <div className="w-full text-sm h-[20%] flex flex-col justify-center items-start text-white">
                {/* profile */}
                <div
                    onClick={() => {
                        navigate(path.profile);
                    }}
                    className={itemcss}
                >
                    <div className="flex items-center justify-center h-[22px] w-auto gap-2">
                        <img
                            src={image}
                            alt="avatar"
                            className="w-full h-full object-cover rounded-full max-w-[22px] max-h-[22px]"
                        />
                    </div>
                    <span
                        className={`transition-all ${isCollapsedSidebar ? "hidden" : ""
                            }`}
                    >
                        Profile
                    </span>
                </div>
                {/* language selector */}
                <div className={itemcss}>
                    <LanguageSelector />
                    <span
                        className={`transition-all ${isCollapsedSidebar ? "hidden" : ""
                            }`}
                    >
                        Language
                    </span>
                </div>
                {/* sign out */}
                <div onClick={handleLogout} className={"group " + itemcss}>
                    <IoMdExit className="text-[22px]  cursor-pointer transition-all" />
                    <span
                        className={`  transform duration-200 ease-linear ${isCollapsedSidebar ? "hidden" : ""
                            } `}
                    >
                        Sign out
                    </span>
                </div>
            </div>
        </div>
    );
}
