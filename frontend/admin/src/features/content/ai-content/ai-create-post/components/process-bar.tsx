import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ProcessBarProps {
    percentProcess: number;
    isOnboarding: boolean;
}

const ProcessBar: React.FC<ProcessBarProps> = ({
    percentProcess,
    isOnboarding,
}) => {
    return (
        <AnimatePresence>
            {isOnboarding && (
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="h-2 bg-gray-200 rounded-full overflow-hidden"
                >
                    <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${percentProcess}%` }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProcessBar;
