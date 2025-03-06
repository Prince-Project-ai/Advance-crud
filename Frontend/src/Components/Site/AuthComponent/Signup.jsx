// src/components/Signup.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [preview, setPreview] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                profile: file
            }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your signup logic here
        console.log(formData);
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-8 bg-custom-bg rounded-2xl shadow-md border-color">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold lable-color">Sign Up</h1>
                    <p className="mt-2 text-sm font-secondary-color">
                        Create your account. Please enter your details.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium lable-color mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 placeholder:font-secondary-color border-color rounded-md shadow-sm focus:outline-none focus:ring focus:ring-border-focus-color"
                            placeholder="Enter your username sdsdsd"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium lable-color mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 placeholder:font-secondary-color border-color rounded-md shadow-sm focus:outline-none focus:ring focus:ring-border-focus-color"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium lable-color mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 placeholder:font-secondary-color border-color rounded-md shadow-sm focus:outline-none focus:ring focus:ring-border-focus-color"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="">
                        <label className="block text-sm font-medium lable-color mb-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 placeholder:font-secondary-color border-color rounded-md shadow-sm focus:outline-none focus:ring focus:ring-border-focus-color"
                                placeholder="Confirm your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 -translate-y-1/2 top-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showConfirmPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn py-2 rounded-lg"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Sign In Link */}
                <p className="mt-2 text-center text-sm font-secondary-color">
                    Already have an account?{" "}
                    <NavLink to="/sign-in" className="font-medium lable-color">
                        Sign In
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Signup;