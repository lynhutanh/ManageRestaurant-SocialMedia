import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface TooltipProps {
    title: string;
    content: string;
    altTitle: string;
    className?: string;
}

const Tooltip = (props: TooltipProps) => {
    const { t } = useTranslation();
    const { content, title, altTitle, className } = props;
    const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
    const tooltipRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const [hover, setHover] = useState(false);

    useEffect(() => {
        if (hover && tooltipRef.current && triggerRef.current) {
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            let newStyle: React.CSSProperties = {};

            // Horizontal positioning
            if (tooltipRect.right > screenWidth) {
                newStyle.right = "0";
                newStyle.left = "auto";
            } else {
                newStyle.left = triggerRect.left + "px";
                newStyle.right = "auto";
            }

            // Vertical positioning
            const spaceAbove = triggerRect.top;
            const spaceBelow = screenHeight - triggerRect.bottom;

            if (
                spaceBelow < tooltipRect.height + 10 &&
                spaceAbove > spaceBelow
            ) {
                // Position tooltip above
                newStyle.bottom = screenHeight - triggerRect.top + "px";
                newStyle.top = "auto";
                newStyle.marginBottom = "8px";
            } else {
                // Position tooltip below
                newStyle.top = triggerRect.bottom + "px";
                newStyle.bottom = "auto";
                newStyle.marginTop = "8px";
            }

            setTooltipStyle(newStyle);
        }
    }, [hover]);

    // Render the tooltip using React Portal
    const tooltipElement = hover ? (
        <div
            ref={tooltipRef}
            style={{
                position: "absolute",
                ...tooltipStyle,
            }}
            className="absolute inline-block w-auto min-w-[200px] max-w-[300px] px-4 py-3 gap-4 bg-white border border-gray-300 rounded-lg z-[10000] shadow-lg"
        >
            <span className="text-xl flex flex-col items-center justify-center w-full gap-2">
                <IoMdInformationCircleOutline className="text-[#2D427F] text-6xl" />
                <span className="underline font-semibold text-center">{altTitle}</span>
            </span>
            <span className="pt-2 flex px-2 text-sm text-center font-thin w-full ">
                {t(content)}
            </span>
        </div>
    ) : null;

    return (
        <div className="flex items-center justify-center">
            <p>{title}</p>
            <div
                className={`flex items-center text-primary-black cursor-pointer hover:text-black ${className}`}
                onMouseEnter={(e) => {
                    e.stopPropagation();
                    setHover(true);
                }}
                onMouseLeave={() => setHover(false)}
                ref={triggerRef}
            >
                <div className="relative">
                    {createPortal(
                        tooltipElement,
                        document.body // Render outside the parent component
                    )}
                    <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Tooltip;
