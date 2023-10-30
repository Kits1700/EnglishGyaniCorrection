import React, { useState } from "react";
  
export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
    const [name, setName] = useState('');
  
    return (
        <Context.Provider value={{ name, setName }}>
            {children}
        </Context.Provider>
    );
};