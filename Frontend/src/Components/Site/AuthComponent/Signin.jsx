import React from "react";
import { NavLink } from "react-router-dom";
import { useFormSignin } from "./Hooks/useFormSignin";

const Signin = () => {

  const { formData,
    showPassword,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    formError,
    isLoading,
  } = useFormSignin();

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
                name="userNameEmail"
                type="text"
                autoComplete="email"
                value={formData.userNameEmail}
                onChange={handleChange}
                className={` ${formError.userNameEmail ? 'focus:ring focus:ring-red-500 border-red-500' : 'focus:ring focus:ring-border-focus-color'} w-full px-3 py-2 border border-[var(--custom-border)] rounded-md outline-none shadow-sm placeholder-[var(--custom-secondary-color)] text-[var(--custom-light)] `}
                placeholder="Enter your email or username"
              />
            </div>
            {
              formError.userNameEmail && <p className="text-sm text-red-500">{formError.userNameEmail}</p>
            }
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
                value={formData.password}
                onChange={handleChange}
                className={` ${formError.password ? 'focus:ring focus:ring-red-500 border-red-500' : 'focus:ring focus:ring-border-focus-color'} w-full px-3 py-2 border border-[var(--custom-border)] rounded-md outline-none shadow-sm placeholder-[var(--custom-secondary-color)] text-[var(--custom-light)] `}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 -translate-y-1/2 right-2 flex items-center px-2 py-1 text-sm text-[var(--custom-secondary-color)] hover:text-[var(--custom-light)] cursor-pointer bg-zinc-800 rounded"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {
              formError.password && <p className="text-sm text-red-500">{formError.password}</p>
            }
          </div>

          {/* Forgot Password Link */}
          {/* <div className="flex items-center justify-end">
            <NavLink
              to="/forgot-password"
              className="text-sm font-medium text-[var(--custom-light)] hover:opacity-80"
            >
              Forgot password?
            </NavLink>
          </div> */}

          {/* Sign In Button */}
          <div>
            <button
              type="submit"
              className="btn py-2 rounded-lg"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
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

export default React.memo(Signin);