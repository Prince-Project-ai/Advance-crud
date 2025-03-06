import React from "react";
import SiteLayout from "../Layout/SiteLayout";
import AdminLayout from "../Layout/AdminLayout";
import { Route, Routes } from "react-router-dom";
import DataTable from "../Components/Admin/DataTable";

const AdminRouter = () => {
    return (
        <AdminLayout>
            <Routes>
                <Route path="/" element={<DataTable />} />
            </Routes>
        </AdminLayout>
    );
};

export default AdminRouter;
