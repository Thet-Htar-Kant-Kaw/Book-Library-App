import React, { createContext, useContext, useState } from 'react';

const SocketContext = createContext();

export const ContextProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [searchParams, setSearchParams] = useState();
  const [bookDetails, setBookDetails] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SocketContext.Provider
      value={{
        query,
        setQuery,
        displayedBooks,
        setDisplayedBooks,
        searchParams, 
        setSearchParams,
        bookDetails, 
        setBookDetails,
        darkMode, 
        setDarkMode,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSearch = () => useContext(SocketContext);
