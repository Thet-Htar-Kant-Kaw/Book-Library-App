import React, { createContext, useContext, useState } from 'react';

const SocketContext = createContext();

export const ContextProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [displayedBooks, setDisplayedBooks] = useState([]);

  return (
    <SocketContext.Provider
      value={{
        query,
        setQuery,
        displayedBooks,
        setDisplayedBooks,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSearch = () => useContext(SocketContext);
