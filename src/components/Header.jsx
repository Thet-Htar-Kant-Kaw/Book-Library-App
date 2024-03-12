import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import datafile from '../data/all_books_details.txt'
import { useSearch } from "../Context" 

const Header = () => {
  // const [displayedBooks, setDisplayedBooks] = useState([])
  const [bookDetails, setBookDetails] = useState([]);
  const [searchParams, setSearchParams] = useState();
  const { displayedBooks, setDisplayedBooks } = useSearch() || {};
  const { query, setQuery } = useSearch() || {};
  const { darkMode, setDarkMode } = useSearch() || {};

  // console.log(useSearch);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Implement logic to toggle dark mode
    // For example, you can change the class of the body or HTML element
  };

  useEffect(() => {
        setDisplayedBooks(searchParams
        ? bookDetails?.filter(book => book?.tags?.includes(searchParams))
        : bookDetails)
        console.log(bookDetails.filter(book => book?.tags?.includes(searchParams)))
        // console.log(displayedBooks);   
    },[bookDetails, searchParams])

    // console.log("displayedBooks:" , displayedBooks );
    
    useEffect(() => {
      async function fetchBookDetails() {
          try {
              const response = await fetch(datafile);
              const bookDetailsText = await response.text();
              const parsedBookDetails = JSON.parse(bookDetailsText);
              setBookDetails(parsedBookDetails);
          } catch (error) {
              console.error('Error fetching the book details:', error);
          }
      }

      fetchBookDetails();
  }, []); 

    const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);

    if (inputValue.trim() !== '') {
      const filteredResults = displayedBooks?.filter(book =>
        book.title.toLowerCase().includes(inputValue.toLowerCase())
      );
      console.log("filteredResults: ", filteredResults);
      // setResults(filteredResults);
      setDisplayedBooks(filteredResults);
      localStorage.setItem("filteredbooks", JSON.stringify(displayedBooks))
      // setShowBooks(!showBooks)
    } else {
      // setResults([]);
      setDisplayedBooks(searchParams
        ? bookDetails?.filter(book => book?.tags?.includes(searchParams))
        : bookDetails)
    }
  };

  return (
    
    <div>
      <header className={`py-4 border-b ${darkMode ? 'bg-gray-800 border-sky-800' : 'bg-gray-100 border-gray'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <a className={`text-2xl font-bold 
          ${darkMode ? 'text-sky-400' : 'text-gray-800'}`}
          >
            FreeLibrary
          </a>
          {/* <div> */}
            <input
              className={`px-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800'}`}
              type="search" 
              placeholder="Search..."
              aria-label="Search"
              value={query}
              onChange={handleInputChange}
            />
              {darkMode ? 
              <button
                onClick={toggleDarkMode}
                className='text-sky-400'
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              </button> 
              : 
              <button
                onClick={toggleDarkMode}
                className='text-sky-500'
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              </button>
              }
        </div>
      </header>

      <div className="container d-flex">
        <div className="sub-container flex flex-col">
          <div className="books grid gap-4 grid-cols-3">
            {/* {displayedBooks?.map(book => (
              <div key={book.dataId} className="col-4 card-container">
              <Link
                  to={`/book/${book.dataId}`}
                  // save book data at localstorage with onclick fun
                  onClick={() => {
                      localStorage.setItem("selectedAbook", JSON.stringify(book))
                      // setShowBookDetails(!showBookDetails)
                              }}
              >
                  <div className="card max-w-sm rounded border border-gray-300 overflow-hidden shadow-md bg-white hover:shadow-lg transition duration-300">
                      <div className="cardImg w-full">
                          <img src={book.coverImg} alt={book.title} />
                      </div>                                
                      <div className="card-content px-6 py-4">
                          <h2 className='book-title font-bold text-xl mb-2'>{book.title}</h2>
                          <div className="book-info text-slate-500 text-base">
                              <span>{book.pageCount}</span>
                              <span> | </span>
                              <span>{book.pub_year}</span>
                              <span> | </span>
                              <span>{book.fileSize}</span>
                          </div>
                      </div>
                  </div>
                  
              </Link>
          </div>          
                    ))} */}
          </div>

          <div className="pagination"></div>
        </div>
      </div>
    </div>   
    
  );
};

export default Header;
