import React, { useState, useEffect, useRef } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

interface DropdownMenuProps {
    selectedPageName: string;
    pages: { id: string; name: string; access_token: string }[];
    onSelectPage: (page: { id: string; name: string; access_token: string }) => void;
    isInstagram: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
    selectedPageName: propSelectedPageName,
    pages,
    onSelectPage,
    isInstagram,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedPageName, setSelectedPageName] = useState(propSelectedPageName || "");
    const [isDefaultPageSet, setIsDefaultPageSet] = useState(false);
    const navigate = useNavigate();
    const defaultPage = useSelector((state: any) => state.userSlice.defaultPage);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (defaultPage && pages.length > 0 && !isDefaultPageSet) {
            const page = pages.find(p => p.id === defaultPage.id);
            if (page) {
                onSelectPage(page);
                setSelectedPageName(page.name);
                setIsDefaultPageSet(true);
            }
        }
    }, [defaultPage, pages, onSelectPage, isDefaultPageSet]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (pages.length === 0) {
        return (
            <p className="text-gray-500  text-sm flex gap-1 items-center">
                No page available?
                <span
                    className=" text-dashboard-blue/90 hover:underline cursor-pointer"
                    onClick={() => navigate("/setting")}
                >
                    Let's connect
                </span>
            </p>
        );
    }

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full text-left px-4 py-3 border-2 border-primary-gray-th1 rounded-lg hover:border-primary/50 focus:outline-none flex justify-between items-center min-w-[120px] max-w-[300px] whitespace-nowrap overflow-hidden text-ellipsis"
            >
                {selectedPageName || `Select page`} <IoMdArrowDropdown />
            </button>
            {isDropdownOpen && (
                <div className="absolute left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-md z-50 w-full">
                    {pages.map((page) => (
                        <button
                            key={page.id}
                            className="block w-full text-left px-4 py-2 hover:bg-primary/10"
                            onClick={() => {
                                onSelectPage(page);
                                setSelectedPageName(page.name);
                                setIsDropdownOpen(false);
                            }}
                        >
                            {page.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;