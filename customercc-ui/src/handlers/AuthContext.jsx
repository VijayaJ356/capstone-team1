import { createContext, useContext, useState, useEffect } from 'react';
import { users } from '../data/users'

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setLoggedInUser(user);
        }
    }, []);

    const login = (username, password) => {
        const user = users.find((u) => u.email === username);
        const pass = users.find((u) => u.password === password);
        if (user) {
            if (pass) {
                setLoggedInUser(user);
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
        // setAuthentication(false)
        localStorage.removeItem('loggedInUser');
        return true
    };

    // Helper to check if user is authenticated
    const isAuthenticated = loggedInUser !== null;

    return (
        <AuthContext.Provider value={{ loggedInUser, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);


