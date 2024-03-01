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
  const [darkMode, setDarkMode] = useState(false);

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
      <header className={`py-4 mb-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <a className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>FreeLibrary</a>
          <div className='flex items-center'>
            <input
              className={`px-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800'}`}
              type="search" 
              placeholder="Search..."
              aria-label="Search"
              value={query}
              onChange={handleInputChange}
            />
            <button
              onClick={toggleDarkMode}
              className={`px-4 py-2 mx-4 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800'}`}
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
          
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
