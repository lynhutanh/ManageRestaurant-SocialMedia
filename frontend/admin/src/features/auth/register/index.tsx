import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import path from "@constants/path";
import swal from "sweetalert2";
import { images } from "@assets/assets";
import LoginButton from "@components/buttons/LoginButton";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { registerAPI } from "../api/auth";

const permissionPath = {
    cashier: [
        "Manage Orders",
        "Manage Profile",
        "Manage History",
        "Manage Notification",
    ],
    chef: ["Manage Profile", "Manage Kitchen"],
    shipper: [],
    affiliate: [
        "Manage AI Content",
        "Manage Affiliate",
        "Manage Social Media",
        "Setting Content",
        "Content Management",
        "Manage Profile",
    ],
};

export default function Register() {
    const navigate = useNavigate();
    const [sideHeight, setSideHeight] = useState(0);

    const [user, setUser] = useState({
        fullName: "",
        role: "cashier",
        phoneNumber: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
        useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");

    const validateAll = () => {
        const error = {
            fullName: user.fullName ? "" : "Full name is required",
            phoneNumber: user.phoneNumber ? "" : "Phone number is required",
            email: user.email ? "" : "Email is required",
            password: user.password ? "" : "Password is required",
            confirmPassword: user.confirmPassword
                ? ""
                : "Confirm password is required",
        };

        setError(error);

        return Object.values(error).every((e) => e === "");
    };
    const handleSubmit = async () => {
        validateAll();
        if (
            error.fullName ||
            error.phoneNumber ||
            error.email ||
            error.password ||
            error.confirmPassword
        ) {
            return;
        }
        if (user.password !== user.confirmPassword) {
            setError({ ...error, confirmPassword: "Password does not match" });
            return;
        }
        const rs = await registerAPI({
            name: user.fullName.trim(),
            role: user.role,
            permissions:
                permissionPath[
                    user.role as "cashier" | "chef" | "shipper" | "affiliate"
                ],
            phone: user.phoneNumber.trim(),
            email: user.email.trim(),
            password: user.password.trim(),
        });
        const { status } = rs;
        if (status === 200) {
            swal.fire({
                icon: "success",
                title: "Register successfully",
            }).then(() => {
                navigate(path.login);
            });
        } else if (status === 410) {
            setError({ ...error, email: "Email already exist" });
        } else if (status === 411) {
            setError({ ...error, phoneNumber: "Phone number already exist" });
        } else {
            swal.fire({
                icon: "error",
                title: "Register failed",
                text: rs?.data?.message || "Some thing went wrong",
            });
        }
    };

    const togglePasswordVisibility = () =>
        setPasswordVisible(!isPasswordVisible);

    const toggleConfirmPasswordVisibility = () =>
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setError({
            ...error,
            email: emailRegex.test(value) ? "" : "Invalid email format",
        });
    };

    const evaluatePasswordStrength = (value: string) => {
        if (value.length < 6) {
            setPasswordStrength("Weak");
        } else if (value.length < 10) {
            setPasswordStrength("Medium");
        } else {
            setPasswordStrength("Strong");
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUser({ ...user, email: value });
        validateEmail(value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUser({ ...user, password: value });
        evaluatePasswordStrength(value);
    };

    const handleConfirmPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        setUser({ ...user, confirmPassword: value });
        setError({
            ...error,
            confirmPassword:
                value === user.password ? "" : "Password does not match",
        });
    };

    useEffect(() => {
        setSideHeight(document.getElementById("side")?.clientHeight || 0);
    }, []);
    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between h-auto bg-white gap-5 p-5">
            {/* Left Section */}
            <div
                className="hidden lg:flex w-full lg:w-1/2 bg-white text-white justify-center items-center relative rounded-md overflow-hidden"
                style={{
                    height: sideHeight,
                }}
            >
                <img
                    src={images.loginBackground}
                    className={`w-full h-full  object-cover `}
                    alt="Login Background"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute text-start p-5 top-5 left-5 ">
                    <h2 className="text-[50px] font-bold mb-4">
                        Join Us Today!
                    </h2>
                    <p className="text-lg ">
                        Unlock the tools to transform your business. Start your
                        journey now and take charge of your growth with insights
                        and strategies that matter. Your success begins here!
                    </p>
                </div>
            </div>

            {/* Right Section */}
            <div
                id="side"
                className="w-full lg:w-1/2 h-full flex flex-col justify-center items-start py-8 lg:py-16 px-8 lg:px-24 rounded-md bg-gray-50"
            >
                <div className="text-4xl font-extrabold mb-4 flex flex-col">
                    <span>Welcome to</span>
                    <span>Hephaestus Restaurant</span>
                </div>
                <div className="w-full max-w-md space-y-3">
                    <div>
                        <label
                            htmlFor="fullName"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Full Name
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="fullName"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Enter your full name"
                                value={user.fullName}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        fullName: e.target.value,
                                    })
                                }
                            />
                        </div>
                        {error.fullName && (
                            <p className="text-sm text-red-500 mt-2">
                                {error.fullName}
                            </p>
                        )}
                    </div>
                    {/* Email Input */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Enter your email"
                                value={user.email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        {error.email && (
                            <p className="text-sm text-red-500 mt-2">
                                {error.email}
                            </p>
                        )}
                    </div>
                    {/* Role Input */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Role
                        </label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="cashier"
                                    checked={user.role === "cashier"}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            role: e.target.value,
                                        })
                                    }
                                    className="form-radio h-4 w-4 text-blue-600"
                                />
                                <span className="ml-2 text-gray-700">
                                    Cashier
                                </span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="chef"
                                    checked={user.role === "chef"}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            role: e.target.value,
                                        })
                                    }
                                    className="form-radio h-4 w-4 text-blue-600"
                                />
                                <span className="ml-2 text-gray-700">Chef</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="shipper"
                                    checked={user.role === "shipper"}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            role: e.target.value,
                                        })
                                    }
                                    className="form-radio h-4 w-4 text-blue-600"
                                />
                                <span className="ml-2 text-gray-700">
                                    Shipper
                                </span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="affiliate"
                                    checked={user.role === "affiliate"}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            role: e.target.value,
                                        })
                                    }
                                    className="form-radio h-4 w-4 text-blue-600"
                                />
                                <span className="ml-2 text-gray-700">
                                    Affiliate
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Phone Number Input */}
                    <div>
                        <label
                            htmlFor="phoneNumber"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Phone Number
                        </label>
                        <div className="relative">
                            <input
                                type="tel"
                                id="phoneNumber"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Enter your phone number"
                                value={user.phoneNumber}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        phoneNumber: e.target.value,
                                    })
                                }
                            />
                        </div>
                        {error.phoneNumber && (
                            <p className="text-sm text-red-500 mt-2">
                                {error.phoneNumber}
                            </p>
                        )}
                    </div>
                    {/* Password Input */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                id="password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Enter your password"
                                value={user.password}
                                onChange={handlePasswordChange}
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
                        {user.password && (
                            <p
                                className={`text-sm mt-2 ${
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
                    </div>
                    {/* Confirm Password Input */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={
                                    isConfirmPasswordVisible
                                        ? "text"
                                        : "password"
                                }
                                id="confirmPassword"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Confirm your password"
                                value={user.confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
                            >
                                {isConfirmPasswordVisible ? (
                                    <AiOutlineEyeInvisible size={20} />
                                ) : (
                                    <AiOutlineEye size={20} />
                                )}
                            </button>
                        </div>
                        {error.confirmPassword && (
                            <p className="text-sm text-red-500 mt-2">
                                *{error.confirmPassword}
                            </p>
                        )}
                    </div>

                    <div className="w-full flex justify-center items-center pt-2">
                        <LoginButton
                            text="Register"
                            onclick={() => handleSubmit()}
                        />
                    </div>
                </div>
                <p className="text-gray-600 text-sm mt-6">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate(path.login)}
                        className="text-blue-500 hover:underline cursor-pointer"
                    >
                        Login here
                    </span>
                </p>
            </div>
        </div>
    );
}
