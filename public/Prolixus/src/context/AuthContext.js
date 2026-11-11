"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getProfile } from "@/lib/ProfileService";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// Helper to decode JWT payload safely
const decodeJWT = (token) => {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [profileLoading, setProfileLoading] = useState(false);
    const profileFetchedRef = useRef(false);
    const router = useRouter();
    const pathname = usePathname();

    const logout = useCallback((redirect = true) => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        setProfile(null);
        profileFetchedRef.current = false;

        // Define protected routes that require redirect on logout
        const protectedRoutes = ["/dashboard", "/orders", "/profile"];
        const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

        if (redirect && isProtected) {
            router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
        }
    }, [pathname, router]);

    const checkTokenExpiry = useCallback((authToken) => {
        if (!authToken) return false;

        const decoded = decodeJWT(authToken);
        if (!decoded || !decoded.exp) return true; // Treat invalid/missing exp as expired for safety

        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            return true;
        }

        // Set up automatic logout timer
        const remainingTime = (decoded.exp - currentTime) * 1000;
        const timer = setTimeout(() => {
            logout();
        }, remainingTime);

        return () => clearTimeout(timer);
    }, [logout]);

    // Fetch profile from API when authenticated
    const fetchProfile = useCallback(async () => {
        if (profileFetchedRef.current) return;
        profileFetchedRef.current = true;
        setProfileLoading(true);
        try {
            const response = await getProfile();
            if (response?.success && response.data) {
                setProfile(response.data);
            }
        } catch (error) {
            console.error("Failed to preload profile:", error);
        } finally {
            setProfileLoading(false);
        }
    }, []);

    const login = (authToken, userData) => {
        localStorage.setItem("authToken", authToken);
        if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
        }
        setToken(authToken);
        profileFetchedRef.current = false; // Allow re-fetch on new login
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("user");
        let cleanupTimer;

        if (storedToken) {
            const isExpired = checkTokenExpiry(storedToken);
            if (isExpired === true) {
                console.warn("Stored token is expired, cleaning up...");
                logout(false); // Don't redirect on initial load cleanup
            } else {
                setToken(storedToken);
                if (storedUser) {
                    try {
                        setUser(JSON.parse(storedUser));
                    } catch (e) {
                        console.error("Failed to parse stored user", e);
                    }
                }

                // If isExpired returned a cleanup function (timer)
                if (typeof isExpired === 'function') {
                    cleanupTimer = isExpired;
                }
            }
        }

        setLoading(false);

        return () => {
            if (cleanupTimer) cleanupTimer();
        };
    }, [checkTokenExpiry, logout]);

    // Preload profile when token becomes available
    useEffect(() => {
        if (token && !profile && !profileFetchedRef.current) {
            fetchProfile();
        }
    }, [token, profile, fetchProfile]);

    const value = {
        user,
        token,
        isLoggedIn: !!token,
        login,
        logout,
        loading,
        profile,
        profileLoading,
        fetchProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
