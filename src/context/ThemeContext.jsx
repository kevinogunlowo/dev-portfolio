// ThemeContext.jsx
// Provides dark/light mode state to the entire app via React Context.
// Persists the user's theme preference in localStorage so it
// survives page refreshes.

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    // Initialize theme from localStorage if available, otherwise default to "light"
    // Stored as "dark" or "light" string
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") || "light"
    );

    // Toggles between "dark" and "light" mode
    // ✅ renamed from toggleDarkMode (was confusingly named as the setter)
    const toggleDarkMode = () => {
        setIsDarkMode((prev) => (prev === "dark" ? "light" : "dark"));
    };

    // Syncs theme state with the DOM and localStorage
    // Adds/removes "dark" class on <html> element for Tailwind dark mode
    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        // Persist preference so theme survives page refresh
        localStorage.setItem("theme", isDarkMode);
    }, [isDarkMode]);

    return (
        // isDarkMode exposed as boolean (true/false) for easier conditionals
        // toggleDarkMode is the function to switch between modes
        <ThemeContext.Provider
            value={{
                isDarkMode: isDarkMode === "dark",
                toggleDarkMode,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook — shortcut for useContext(ThemeContext)
// Usage: const { isDarkMode, toggleDarkMode } = useTheme();
export const useTheme = () => useContext(ThemeContext);