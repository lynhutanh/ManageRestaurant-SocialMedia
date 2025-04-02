import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ListClientSelectionProps {
    listSelections: string[];
    handleSuggestionClick: (select: string) => void;
}

const ListClientSelection: React.FC<ListClientSelectionProps> = ({
    listSelections,
    handleSuggestionClick,
}) => {
    const [showInput, setShowInput] = useState(false);
    const [customValue, setCustomValue] = useState("");

    const handleSelect = (value: string) => {
        if (value === "Other") {
            setShowInput(!showInput);
            return;
        }
        handleSuggestionClick(value);
    };
    const handleOnClick = () => {
        if (customValue.trim()) {
            handleSelect(customValue);
            setCustomValue("");
            setShowInput(false);
        }
    };
    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-end items-center gap-2 flex-wrap">
                {listSelections.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleSelect(item)}
                        className="py-3 px-4 rounded-xl text-black  border border-gray-300 hover:bg-blue-600/10 cursor-pointer transition-colors duration-100 ease-in-out"
                    >
                        {item}
                    </div>
                ))}
            </div>
            <div className="w-full">
                {/* Animated Input Field */}
                {showInput && (
                    <motion.div
                        initial={{ width: 0, opacity: 0.5 }}
                        animate={{ width: "auto", opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="flex justify-between items-center gap-2 p-2"
                    >
                        <input
                            className="w-full border p-2 rounded-md border-primary-black"
                            type="text"
                            value={customValue}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleOnClick()
                            }
                            onChange={(e) => setCustomValue(e.target.value)}
                            placeholder="Enter custom value..."
                        />
                        <button onClick={handleOnClick} className="shrink-0 bg-primary-black p-3 rounded-md">
                            <Send className="h-5 w-5 text-white" />
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ListClientSelection;
