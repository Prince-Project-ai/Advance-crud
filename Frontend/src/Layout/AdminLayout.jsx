import React from "react";

const AdminLayout = ({ children }) => {

    return (
        <div>
            {children}
        </div>
    );
};

export default React.memo(AdminLayout);
