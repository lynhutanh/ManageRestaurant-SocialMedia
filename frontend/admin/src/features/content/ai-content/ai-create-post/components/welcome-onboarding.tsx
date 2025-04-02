import React from 'react';

interface WelcomeOnboardingProps {
    handleStart: () => void

}

const WelcomeOnboarding: React.FC<WelcomeOnboardingProps> = ({ handleStart }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full space-y-8">
            <h1 className="text-4xl font-bold text-foreground/80">
                🎉 Welcome to Your Marketing Strategy Assistant!🚀
            </h1>
            <p className="text-foreground/80 text-center max-w-4xl">
                🎀Hello! Welcome to our marketing strategy assistant. The information you provide
                will help us gather the basic details needed to create a
                tailored marketing plan for you. Let's get started!🎉
            </p>
            <button
                onClick={handleStart}
                className="px-6 py-3 text-lg bg-primary-black text-white rounded-md hover:bg-primary-black/90"
            >
                🚀 Let's Get Started!
            </button>
        </div>
    );
};

export default WelcomeOnboarding;