import React, { createContext, useContext, useState, useEffect } from "react";
import { API_ENDPOINTS } from "../config/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        return localStorage.getItem("auth_token") || null;
    });

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [loading, setLoading] = useState(false);

    // Load the profile if a token exists but user data is missing
    useEffect(() => {
        if (token && !user) {
            fetchProfile();
        }
    }, []);

    const fetchProfile = async () => {
        if (!token) return;

        setLoading(true);
        try {
            const res = await fetch(API_ENDPOINTS.profile, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json",
                },
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data);
                localStorage.setItem("user", JSON.stringify(data));
            } else {
                // Invalid token, log the user out
                logout();
            }
        } catch (err) {
            console.error("Failed to fetch profile:", err);
        } finally {
            setLoading(false);
        }
    };

    const login = (newToken, userData) => {
        setToken(newToken);
        setUser(userData);
        localStorage.setItem("auth_token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{
            token,
            user,
            loading,
            login,
            logout,
            updateUser,
            fetchProfile,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
