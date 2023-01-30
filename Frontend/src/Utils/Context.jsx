import { useState, useEffect, createContext } from 'react';

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isUserFaculty, setIsUserFaculty] = useState(false);
    const [onLogout, setOnLogout] = useState(false);
    const [isReturningUser, setIsReturningUser] = useState(false);

    // isDarkTheme reverts back to false on refresh
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    // So skip useEffect theme block for the first render
    const [initialRender, setInitialRender] = useState(false);


    useEffect(() => {
        if (initialRender) {
            document.body.setAttribute("data-theme", isDarkTheme ? "dark" : "light");
            localStorage.setItem("arms-theme", isDarkTheme ? "dark" : "light");
        } else {
            setInitialRender(true);
        }
    }, [isDarkTheme])

    return (
        <Context.Provider value={{
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