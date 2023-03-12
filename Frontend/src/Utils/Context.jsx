import { useState, useEffect, createContext } from 'react';

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isUserFaculty, setIsUserFaculty] = useState(false);
    const [authorizedUser, setAuthorizedUser] = useState(false);
    const [onLogout, setOnLogout] = useState(false);
    const [isReturningUser, setIsReturningUser] = useState(false);
    const [instituteStateData, setInstituteStateData] = useState([])
    const [courseStateData, setCourseStateData] = useState([])

    // isDarkTheme reverts back to false on refresh
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    // So skip useEffect theme block for the first render
    const [initialRenderDone, setInitialRenderDone] = useState(false);

    useEffect(() => {
        if (initialRenderDone) {
            document.body.setAttribute("data-theme", isDarkTheme ? "dark" : "light");
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDarkTheme ? "#0F0F0F" : "#FAFAFA");
            localStorage.setItem("arms-theme", isDarkTheme ? "dark" : "light");
        } else {
            setInitialRenderDone(true);
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDarkTheme ? "#0F0F0F" : "#FAFAFA");
        }

        if (userData?.uid === import.meta.env.VITE_ARMS_ADMIN_UID) setIsAdmin(true);

        if (isAdmin || isUserFaculty) {
            setAuthorizedUser(true);
        } else {
            setAuthorizedUser(false);
        }
    }, [isDarkTheme, userData, isAdmin, isUserFaculty])

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
            authorizedUser,
            setAuthorizedUser,
            isReturningUser,
            setIsReturningUser,
            isDarkTheme,
            setIsDarkTheme,
            onLogout,
            setOnLogout,
            instituteStateData,
            setInstituteStateData,
            courseStateData,
            setCourseStateData,
        }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;