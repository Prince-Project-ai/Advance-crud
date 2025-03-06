import { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const useUserData = () => {
    const context = useContext(UserContext);
    if (!context) throw Error("User Context use must be inside of User Context Provider.");
    return context;
}

const UserProvider = ({ children }) => {

    const [user, setUser] = useState({ name: "Pricne" });
    // const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, seIsLoading] = useState(true);

    useEffect(() => {
        setIsAuthenticated(!!user);
        seIsLoading(false);
    }, [user]);

    const contextValue = {
        user,
        setUser,
        isAuthenticated,
        isLoading,
    }


    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
};

export default UserProvider;