import { createContext,  useState } from "react";

//create context
const AuthContext = createContext();

// Provider component that wraps your app
export function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (userData) => {
        setUser(userData)
        setIsAuthenticated(true)

    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    }

     // Value object contains all data and functions to share
     const value = {
        user,
        isAuthenticated,
        login,
        logout
     };

     return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
     )
}

