/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [logout, setLogout] = useState(null);

    useEffect(() => {
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        };

        const token = getCookie('token');
        setLogout(token);
    }, []); 

    const updateToken = (newToken) => {
        const expires = new Date(Date.now() + 8 * 60 * 60 * 1000).toUTCString();
        document.cookie = `token=${newToken}; expires=${expires}; path=/`;
        setLogout(newToken);
    };

    const clearToken = () => {
        document.cookie = 'token=; path=/;';
        setLogout(null);
    };

    const authInfo = {
        logout,
        updateToken,
        clearToken
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
