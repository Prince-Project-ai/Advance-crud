import React from "react";
import SiteLayout from "../Layout/SiteLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import UserProvider, { useUserData } from "../Contexts/UserContext";
import Signin from "../Components/Site/AuthComponent/Signin";
import Signup from "../Components/Site/AuthComponent/SignUp";
import Profile from "../Components/Site/Profile";
import ForgotPassword from "../Components/Site/AuthComponent/ForgotPassword";
import NewPassword from "../Components/Site/AuthComponent/NewPassword";
import MessageProvider from "../Contexts/MessageContext";
import FullScreenLoader from "../Components/Loader/FullScreenLoader";

const SiteRouter = () => {
    return (
        <MessageProvider>
            <UserProvider>
                <SiteLayout>
                    <Routes>
                        {/* PUBLIC ROUTER */}
                        <Route path="/sign-in" element={<Signin />} />
                        <Route path="/sign-up" element={<Signup />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/new-password" element={<NewPassword />} />

                        {/* AUTHORIZED ROUTER */}
                        <Route path="/" element={
                            <PrivateRouter>
                                <Profile />
                            </PrivateRouter>
                        } />
                    </Routes>
                </SiteLayout>
            </UserProvider>
        </MessageProvider>
    );
};

export default SiteRouter;



// creating private router for preventing the access if not authorized
export const PrivateRouter = ({ children }) => {
    const { isAuthenticated, isLoading } = useUserData();

    if (isLoading) return <FullScreenLoader />

    if (!isAuthenticated) return <Navigate to="/sign-in" replace />
    return children;
} 