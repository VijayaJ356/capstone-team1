/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useMemo, useContext } from "react";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1976d2",
        },
        background: {
            default: "#f5f5f5",
            paper: "#ffffff",
        },
        text: {
            primary: "#000000",
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#90caf9",
        },
        background: {
            default: "#121212",
            paper: "#1d1d1d",
        },
        text: {
            primary: "#ffffff",
        },
    },
});

// eslint-disable-next-line react/prop-types
export const ThemeProviderWrapper = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

// eslint-disable-next-line react/prop-types
export const ThemeProviderAuto = ({ children }) => {
    // Detect system theme preference
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

    // Dynamically create theme
    const theme = useMemo(() =>
        createTheme({
            palette: {
                mode: prefersDarkMode ? "dark" : "light",
                primary: {
                    main: "#1976d2",
                },
                success: {
                    main: "#2e7d32",
                },
                error: {
                    main: "#d32f2f",
                },
            },
        }),
        [prefersDarkMode]
    );

    return (
        <ThemeContext.Provider value={{ prefersDarkMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
