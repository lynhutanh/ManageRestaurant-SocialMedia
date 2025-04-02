import { useState } from "react";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface RegisterFormData {
    username: string;
    password: string;
}

const Register = ({
    handleChangeStep,
}: {
    handleChangeStep: (value: string) => void;
}) => {
    const [formData, setFormData] = useState<RegisterFormData>({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");

    const validateForm = () => {
        const newErrors: Partial<RegisterFormData> = {};

        if (!formData.username) {
            newErrors.username = "Username is required";
        } else if (formData.username.length < 3) {
            newErrors.username = "Username must be at least 3 characters";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                // Add your registration API call here
                console.log("Form submitted:", formData);
            } catch (error) {
                console.error("Registration failed:", error);
            }
        }
    };

    const togglePasswordVisibility = () =>
        setPasswordVisible(!isPasswordVisible);

    const evaluatePasswordStrength = (value: string) => {
        if (value.length < 6) {
            setPasswordStrength("Weak");
        } else if (value.length < 10) {
            setPasswordStrength("Medium");
        } else {
            setPasswordStrength("Strong");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "password") {
            evaluatePasswordStrength(value);
        }

        // Clear error when user starts typing
        if (errors[name as keyof RegisterFormData]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    return (
        <div className="h-full w-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Complete your registration to continue
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className={`appearance-none relative block w-full px-3 py-2 border 
                                    ${
                                        errors.username
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }
                                    placeholder-gray-500 text-gray-900 rounded-md
                                    focus:outline-none focus:ring-primary focus:border-primary
                                    focus:z-10 sm:text-sm`}
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            {errors.username && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={
                                        isPasswordVisible ? "text" : "password"
                                    }
                                    required
                                    className={`appearance-none relative block w-full px-3 py-2 border 
                                        ${
                                            errors.password
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }
                                        placeholder-gray-500 text-gray-900 rounded-md
                                        focus:outline-none focus:ring-primary focus:border-primary
                                        focus:z-10 sm:text-sm pr-10`}
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
                                >
                                    {isPasswordVisible ? (
                                        <AiOutlineEyeInvisible size={20} />
                                    ) : (
                                        <AiOutlineEye size={20} />
                                    )}
                                </button>
                            </div>
                            {formData.password && (
                                <p
                                    className={`text-xs mt-1
                                    ${
                                        passwordStrength === "Weak"
                                            ? "text-red-500"
                                            : passwordStrength === "Medium"
                                            ? "text-yellow-500"
                                            : "text-green-500"
                                    }`}
                                >
                                    Password Strength: {passwordStrength}
                                </p>
                            )}
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <PrimaryButton
                            label="Create Account"
                            className="group relative w-full flex justify-center py-2 px-4 
                                border border-transparent text-sm font-medium rounded-md 
                                text-white bg-primary hover:bg-primary-th2 
                                focus:outline-none focus:ring-2 focus:ring-offset-2 
                                focus:ring-primary transition-colors duration-200"
                        />
                    </div>
                </form>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                        onClick={()=>handleChangeStep("login")}
                        className="font-medium text-primary hover:text-primary-th2"
                    >
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;
