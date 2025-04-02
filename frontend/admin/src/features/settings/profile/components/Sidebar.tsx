import React from "react";

interface SidebarProps {
    setSession: (value: string) => void;
    session: string;
}

const sidebarState = [
    {
        label: "Profile",
    },
    {
        label: "Settings",
    },
];

const Sidebar = (props: SidebarProps) => {
    const { setSession, session } = props;
    return (
        <div className="w-1/4 p-6 bg-white border-r">
            <div className="text-2xl font-semibold text-primary px-2 mb-2">
                Settings
            </div>
            <div className="space-y-2 flex flex-col">
                {sidebarState.map((item, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => setSession(item.label)}
                            className={`text-gray-700 hover:text-primary hover:bg-slate-100 cursor-pointer w-full p-2 rounded-md ${
                                session === item.label ? "bg-slate-100" : ""
                            }`}
                        >
                            {item.label}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
