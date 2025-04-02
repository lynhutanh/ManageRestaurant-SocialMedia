import PrimaryButton from "@/components/buttons/PrimaryButton";
import { motion } from "framer-motion";


interface WelcomeScreenProps {
    handleChangeStep: (value: string) => void;
}

const WelcomeScreen = ({ handleChangeStep }: WelcomeScreenProps) => {
    const handleRedirect = () => {
        if (window.localStorage.getItem("formbricks-js")) {
            handleChangeStep("login");
        } else {
            handleChangeStep("form");
        }
    };

   
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-2xl w-full text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="space-y-4"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                        Join Our Influencer Network
                    </h1>
                    <p className="text-xl text-gray-600">
                        Turn Your Influence Into Impact
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="space-y-6"
                >
                    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-12 h-12 p-2 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-2xl text-primary">
                                    💰
                                </span>
                            </div>
                            <p className="text-gray-700">Earn More Revenue</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-12 h-12 p-2 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-2xl text-primary">
                                    🤝
                                </span>
                            </div>
                            <p className="text-gray-700">Brand Partnerships</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-12 h-12 p-2 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-2xl text-primary">
                                    📈
                                </span>
                            </div>
                            <p className="text-gray-700">Grow Your Audience</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="space-y-4"
                >
                    <div className="w-full h-max flex justify-center items-center">
                        <PrimaryButton
                            onClick={handleRedirect}
                            label="Get Started"
                            className="px-8 py-3 text-lg bg-primary text-white rounded-lg 
                            hover:bg-primary-th2 transform transition-all duration-200 
                            hover:scale-105 focus:outline-none focus:ring-2 
                            focus:ring-offset-2 focus:ring-primary"
                        />
                    </div>

                    <p className="text-sm text-gray-500">
                        Join thousands of creators already working with us
                    </p>
                    <p className="text-sm text-gray-500">
                        Already have an account?{" "}
                        <strong
                            onClick={() => handleChangeStep("login")}
                            className="text-primary cursor-pointer hover:text-primary/80"
                        >
                            Login
                        </strong>
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default WelcomeScreen;
