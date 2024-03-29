import { useState, useEffect, createContext } from 'react';

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isUserFaculty, setIsUserFaculty] = useState(false);
    const [authorizedUser, setAuthorizedUser] = useState(false);
    const [isReturningUser, setIsReturningUser] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [disableAnimation, setDisableAnimation] = useState(false);

    const [onLogout, setOnLogout] = useState(false);
    const [manageDelete, setManageDelete] = useState(null)
    const [deleteUser, setDeleteUser] = useState(null)

    const [instituteStateData, setInstituteStateData] = useState([])
    const [courseStateData, setCourseStateData] = useState([])
    const [docsStateData, setDocsStateData] = useState([])

    // isDarkTheme reverts back to false on refresh
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    // So skip useEffect theme block for the first render
    const [initialRenderDone, setInitialRenderDone] = useState(false);

    useEffect(() => {
        if (initialRenderDone) {
            document.documentElement.setAttribute("data-theme", isDarkTheme ? "dark" : "light");
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDarkTheme ? "#0F0F0F" : "#FAFAFA");
            localStorage.setItem("arms-theme", isDarkTheme ? "dark" : "light");
        } else {
            setInitialRenderDone(true);
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDarkTheme ? "#0F0F0F" : "#FAFAFA");
        }

        if (userData?.uid === import.meta.env.VITE_ARMS_ADMIN_UID) setIsAdmin(true);

        if ((isAdmin || isUserFaculty) && userData.isApproved) {
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
            manageDelete,
            setManageDelete,
            deleteUser,
            setDeleteUser,
            instituteStateData,
            setInstituteStateData,
            courseStateData,
            setCourseStateData,
            docsStateData,
            setDocsStateData,
            showSidebar,
            setShowSidebar,
            disableAnimation,
            setDisableAnimation,
        }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;