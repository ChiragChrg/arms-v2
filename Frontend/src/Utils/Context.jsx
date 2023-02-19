import { useState, useEffect, createContext } from 'react';

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isUserFaculty, setIsUserFaculty] = useState(false);
    const [onLogout, setOnLogout] = useState(false);
    const [isReturningUser, setIsReturningUser] = useState(false);

    // isDarkTheme reverts back to false on refresh
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    // So skip useEffect theme block for the first render
    const [initialRenderDone, setInitialRenderDone] = useState(false);


    useEffect(() => {
        if (initialRenderDone) {
            document.body.setAttribute("data-theme", isDarkTheme ? "dark" : "light");
            localStorage.setItem("arms-theme", isDarkTheme ? "dark" : "light");
        } else {
            setInitialRenderDone(true);
        }

        if (userData?.uid === import.meta.env.VITE_ARMS_ADMIN_UID) setIsAdmin(true);

    }, [isDarkTheme, userData])

    return (
        <Context.Provider value={{
            userData,
            setUserData,
            isAdmin,
            setIsAdmin,
            isUserLoggedIn,
            setIsUserLoggedIn,
            isUserFaculty,
            setIsUserFaculty,
            isReturningUser,
            setIsReturningUser,
            isDarkTheme,
            setIsDarkTheme,
            onLogout,
            setOnLogout
        }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;