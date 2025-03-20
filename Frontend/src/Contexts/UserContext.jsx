import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { currentAuthData } from "../../Apis/HandleUserApi";

export const UserContext = createContext();

export const useUserData = () => {
    const context = useContext(UserContext);
    if (!context) throw Error("User Context use must be inside of User Context Provider.");
    return context;
}

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    // const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, seIsLoading] = useState(true);



    const fetchCurrentAuthData = useCallback(async () => {
        try {
            const res = await currentAuthData();
            if (res?.success) {
                setUser(res.data);
                setIsAuthenticated(res?.success);
            }
        } catch (error) {
            console.error(error?.response?.data?.message || error?.message);
        } finally {
            seIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCurrentAuthData();
        return () => {
            fetchCurrentAuthData();
        };
    }, []);



    const contextValue = {
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
    }


    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
};

export default UserProvider;