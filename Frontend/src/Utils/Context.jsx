import { useState, createContext } from 'react';

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [isFacultyLoggedIn, setIsFacultyLoggedIn] = useState(false);

    return (
        <Context.Provider value={{
            isFacultyLoggedIn,
            setIsFacultyLoggedIn
        }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;