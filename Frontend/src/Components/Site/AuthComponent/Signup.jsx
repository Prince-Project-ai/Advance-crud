// src/components/Signup.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { useFormSignup } from "./Hooks/useFormSIgnup";

const Signup = () => {

  const { formData,
    setFormData,
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    errorMessage,
    handleInputChange,
    handleSubmit } = useFormSignup();

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
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              className={`${errorMessage.userName ? 'focus:ring focus:ring-red-500 border-red-500' : 'focus:ring focus:ring-border-focus-color'} w-full px-3 py-2 placeholder:font-secondary-color border-color rounded-md shadow-sm focus:outline-none `}
              placeholder="Enter your username sdsdsd"
            />
            {
              errorMessage.userName && <p className="text-xs text-red-500">{errorMessage.userName}</p>
            }
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
              className={`${errorMessage.email ? 'focus:ring focus:ring-red-500 border-red-500' : 'focus:ring focus:ring-border-focus-color'} w-full px-3 py-2 placeholder:font-secondary-color border-color rounded-md outline-none shadow-sm`}
              placeholder="Enter your email"
            />
            {
              errorMessage.email && <p className="text-xs text-red-500">{errorMessage.email}</p>
            }
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
                className={` ${errorMessage.password ? 'focus:ring focus:ring-red-500 border-red-500' : 'focus:ring focus:ring-border-focus-color'} w-full px-3 py-2 placeholder:font-secondary-color border-color rounded-md outline-none shadow-sm pr-16`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 -translate-y-1/2 top-1/2 cursor-pointer bg-zinc-800 px-2 rounded font-secondary-color "
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {
              errorMessage.password && <p className="text-xs text-red-500">{errorMessage.password}</p>
            }
          </div>

          {/* Confirm Password */}
          <div className="">
            <label className="block text-sm font-medium lable-color mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="crmPassword"
                value={formData.crmPassword}
                onChange={handleInputChange}
                className={`${errorMessage.crmPassword ? 'focus:ring focus:ring-red-500 border-red-500' : 'focus:ring focus:ring-border-focus-color'}  w-full px-3 py-2 placeholder:font-secondary-color border-color rounded-md shadow-sm focus:outline-none pr-16 `}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 -translate-y-1/2 top-1/2 cursor-pointer bg-zinc-800 px-2 rounded font-secondary-color"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            {
              errorMessage.crmPassword && <p className="text-xs text-red-500">{errorMessage.crmPassword}</p>
            }
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

export default React.memo(Signup);