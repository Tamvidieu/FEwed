import React, { createContext, useState } from 'react';

export const MyContext = createContext();

const MyContextProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);
  
    return (
      <MyContext.Provider value={{ user, setUser }}>
        {children}
      </MyContext.Provider>
    );
  };

export default MyContextProvider