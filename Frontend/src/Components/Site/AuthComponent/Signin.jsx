import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Signin = () => {
    // State to manage form inputs and password visibility
    const [formData, setFormData] = useState({
        emailOrUsername: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle authentication logic
        console.log("Form submitted:", formData);
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center justify-center bg-[var(--custom-bg)]">
            <div className="w-full max-w-md p-8 space-y-8 border-color rounded-2xl shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-[var(--custom-light)]">Sign In</h1>
                    <p className="mt-2 text-sm font-secondary-color">
                        Welcome back! Please enter your details.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {/* Email/Username Field */}
                    <div>
                        <label
                            htmlFor="emailOrUsername"
                            className="block text-sm font-medium lable-color"
                        >
                            Email or Username
                        </label>
                        <div className="mt-1">
                            <input
                                id="emailOrUsername"
                                name="emailOrUsername"
                                type="text"
                                autoComplete="email"
                                required
                                value={formData.emailOrUsername}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-[var(--custom-border)] rounded-md shadow-sm 
                  placeholder-[var(--custom-secondary-color)] 
                  text-[var(--custom-light)] 
                  focus:outline-none 
                  focus:border-[var(--custom-light)]"
                                placeholder="Enter your email or username"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium lable-color"
                        >
                            Password
                        </label>
                        <div className="relative mt-1">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-[var(--custom-border)] rounded-md shadow-sm 
                  placeholder-[var(--custom-secondary-color)]
                  text-[var(--custom-light)] 
                  focus:outline-none 
                  focus:border-[var(--custom-light)]"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-[var(--custom-secondary-color)] hover:text-[var(--custom-light)]"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Forgot Password Link */}
                    <div className="flex items-center justify-end">
                        <NavLink
                            to="/forgot-password"
                            className="text-sm font-medium text-[var(--custom-light)] hover:opacity-80"
                        >
                            Forgot password?
                        </NavLink>
                    </div>

                    {/* Sign In Button */}
                    <div>
                        <button
                            type="submit"
                            className="btn py-2 rounded-lg"
                        >
                            Sign In
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center">
                        <p className="text-sm font-secondary-color">
                            Don't have an account?{" "}
                            <NavLink
                                to="/sign-up"
                                className="font-medium text-[var(--custom-light)] hover:opacity-80"
                            >
                                Sign up
                            </NavLink>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;