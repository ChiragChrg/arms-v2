import { useState, createContext } from 'react';

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isUserFaculty, setIsUserFaculty] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [onLogout, setOnLogout] = useState(false);

    return (
        <Context.Provider value={{
            isUserLoggedIn,
            setIsUserLoggedIn,
            isUserFaculty,
            setIsUserFaculty,
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