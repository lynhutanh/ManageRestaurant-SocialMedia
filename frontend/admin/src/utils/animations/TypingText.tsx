import { useState, useEffect, useRef } from "react";

interface TypingTextProps {
    text: string;
    duration: number; // Duration for typing each character
    startDelay?: number; // Delay before starting the typing effect
    onComplete?: () => void;
}

const TypingText: React.FC<TypingTextProps> = ({
    text,
    duration,
    startDelay = 0,
    onComplete,
}) => {
    const [index, setIndex] = useState(0);
    const animationFrameId = useRef<number | null>(null); // Store requestAnimationFrame ID

    // To track the time elapsed since the last frame
    const lastTimeRef = useRef(0);
    const startTimeRef = useRef(0); // To track the delay start time
    const hasCompletedRef = useRef(false); // Add this to track completion

    const displayedText = text.slice(0, index);

    // Typing effect logic
    const updateTyping = (timestamp: number) => {
        if (startTimeRef.current === 0) {
            startTimeRef.current = timestamp; // Initialize start time for delay
        }

        // If startDelay has passed, start typing
        const elapsedSinceStart = timestamp - startTimeRef.current;

        if (elapsedSinceStart >= startDelay) {
            if (lastTimeRef.current === 0) {
                lastTimeRef.current = timestamp; // Initialize last time
            }

            const elapsed = timestamp - lastTimeRef.current;

            // If enough time has passed, increment the index
            if (elapsed >= duration) {
                lastTimeRef.current = timestamp;
                if (index < text.length) {
                    setIndex((prev) => prev + 1);
                } else if (!hasCompletedRef.current && onComplete) {
                    // Call onComplete when typing is finished and hasn't been called before
                    hasCompletedRef.current = true;
                    onComplete();
                }
            }

            // Continue the animation if we haven't typed the entire text
            if (index < text.length) {
                animationFrameId.current = requestAnimationFrame(updateTyping);
            }
        } else {
            // Keep waiting until startDelay time has passed

            animationFrameId.current = requestAnimationFrame(updateTyping);
        }
    };

    // Reset hasCompleted when text changes
    useEffect(() => {
        hasCompletedRef.current = false;
        setIndex(0);
        lastTimeRef.current = 0;
        startTimeRef.current = 0;
    }, [text]);

    useEffect(() => {
        // Initialize typing animation
        animationFrameId.current = requestAnimationFrame(updateTyping);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [index, text, duration, startDelay]);

    return <span>{displayedText}</span>;
};

export default TypingText;
