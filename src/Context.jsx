import React, { createContext, useContext, useState } from 'react';

const SocketContext = createContext();

export const ContextProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [searchParams, setSearchParams] = useState();

  return (
    <SocketContext.Provider
      value={{
        query,
        setQuery,
        displayedBooks,
        setDisplayedBooks,
        searchParams, 
        setSearchParams,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSearch = () => useContext(SocketContext);
