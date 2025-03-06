import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const ForgotPassword = () => {
    // State management for form inputs and submission process
    const [email, setEmail] = useState("");
    const [resetStatus, setResetStatus] = useState({
        message: "",
        type: "" // Could be 'success' or 'error'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle email input changes
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        // Clear previous status messages when user starts typing
        setResetStatus({ message: "", type: "" });
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setResetStatus({
                message: "Please enter a valid email address",
                type: "error"
            });
            return;
        }

        // Simulate password reset process
        setIsSubmitting(true);
        try {
            // Simulated API call - replace with actual password reset logic
            await new Promise(resolve => setTimeout(resolve, 2000));

            setResetStatus({
                message: "Password reset link sent to your email. Check your inbox.",
                type: "success"
            });
        } catch (error) {
            setResetStatus({
                message: "Failed to send reset link. Please try again.",
                type: "error"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-8 rounded-2xl shadow-md border-color">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold lable-color">Forgot Password</h1>
                    <p className="mt-2 text-sm font-secondary-color">
                        Enter your email to receive a password reset link
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium lable-color"
                        >
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Enter your registered email"
                            className="w-full px-3 py-2 mt-1 border-color rounded-md 
                         bg-[var(--custom-bg)] 
                         text-[var(--custom-light)] 
                         placeholder-[var(--custom-secondary-color)]
                         focus:border-[var(--custom-light)]"
                            required
                        />
                    </div>

                    {/* Status Message */}
                    {resetStatus.message && (
                        <div className={`p-3 rounded-md text-sm text-center ${resetStatus.type === 'success'
                            ? 'bg-green-600/20 text-green-400'
                            : 'bg-red-600/20 text-red-400'
                            }`}>
                            {resetStatus.message}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`btn w-full py-2 rounded-lg flex items-center justify-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {isSubmitting ? (
                            // Simple loading spinner
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                            "Send Reset Link"
                        )}
                    </button>
                </form>

                {/* Navigation Links */}
                <div className="text-center mt-4">
                    <div className="text-sm font-secondary-color">
                        Remember your password?{" "}
                        <NavLink
                            href="/sign-in"
                            className="text-[var(--custom-light)] hover:opacity-80"
                        >
                            Back to Sign In
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;