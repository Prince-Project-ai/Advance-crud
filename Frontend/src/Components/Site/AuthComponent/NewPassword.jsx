import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const NewPassword = () => {
    // State management for password reset
    const [passwordData, setPasswordData] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    // Password visibility toggles
    const [showPassword, setShowPassword] = useState({
        newPassword: false,
        confirmPassword: false
    });

    // Form submission state
    const [submitStatus, setSubmitStatus] = useState({
        message: "",
        type: ""
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear any previous submit status
        setSubmitStatus({ message: "", type: "" });
    };

    // Toggle password visibility
    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-8 border-color rounded-2xl shadow-md border-color">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold lable-color">Reset Password</h1>
                    <p className="mt-2 text-sm font-secondary-color">
                        Create a strong, unique password
                    </p>
                </div>

                <form className="space-y-6">
                    {/* New Password Input */}
                    <div>
                        <label className="block text-sm font-medium lable-color">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword.newPassword ? "text" : "password"}
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                className="w-full px-3 py-2 mt-1 border-color rounded-md 
                           bg-[var(--custom-bg)] 
                           text-[var(--custom-light)] 
                           placeholder-[var(--custom-secondary-color)]"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('newPassword')}
                                className="absolute inset-y-0 right-0 px-3 flex items-center text-sm font-secondary-color"
                            >
                                {showPassword.newPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label className="block text-sm font-medium lable-color">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword.confirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm new password"
                                className="w-full px-3 py-2 mt-1 border-color rounded-md 
                           bg-[var(--custom-bg)] 
                           text-[var(--custom-light)] 
                           placeholder-[var(--custom-secondary-color)]"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('confirmPassword')}
                                className="absolute inset-y-0 right-0 px-3 flex items-center text-sm font-secondary-color"
                            >
                                {showPassword.confirmPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Status Message */}
                    {submitStatus.message && (
                        <div className={`p-3 rounded-md text-sm text-center ${submitStatus.type === 'success'
                            ? 'bg-green-600/20 text-green-400'
                            : 'bg-red-600/20 text-red-400'
                            }`}>
                            {submitStatus.message}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"

                        className="btn w-full py-2 rounded-lg"
                    >
                        Reset Password
                    </button>
                </form>

                {/* Navigation Link */}
                <div className="text-center mt-4">
                    <NavLink
                        to="/sign-in"
                        className="text-sm font-secondary-color hover:text-[var(--custom-light)]"
                    >
                        Back to Sign In
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default NewPassword;