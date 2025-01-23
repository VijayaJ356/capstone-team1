/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { users } from '../data/users'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    // const [isAuthenticated, setAuthentication] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setLoggedInUser(user);
            // setAuthentication(true)
            console.log("User", user.username, "is logged in")
        }
    }, []);

    const login = (username, password) => {
        // API Call for User Login
        const user = users.find((u) => u.email === username);
        const pass = users.find((u) => u.password === password);
        if (user) {
            if (pass) {
                setLoggedInUser(user);
                // setAuthentication(true)
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                return (user)
            }
            else {
                alert("User found, but Invalid Password!");
            }
        } else {
            alert("User not found!");
        }
    };

    const logout = () => {
        setLoggedInUser(null);
        // setAuthentication(null)
        localStorage.removeItem('loggedInUser');
        return true
    };

    // Helper to check if user is authenticated
    return (
        <AuthContext.Provider value={{ loggedInUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


