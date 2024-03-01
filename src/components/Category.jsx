import catName from '../data/categories.txt'
import datafile from '../data/all_books_details.txt'
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../index.css'
import { useSearch } from '../Context';

export default function Category() {
    const [searchParams, setSearchParams] = useState();
    const [categories, setCategories] = useState([]);
    const [bookDetails, setBookDetails] = useState([]);
    // const [displayedBooks, setDisplayedBooks] = useState()
    const { displayedBooks, setDisplayedBooks } = useSearch() || {};

    const [showBookDetails, setShowBookDetails] = useState(false);

    console.log(showBookDetails)
    console.log(displayedBooks?.length);

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage= 6;

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(displayedBooks?.slice(itemOffset, endOffset));
        // console.log(currentItems);
        setPageCount(Math.ceil(displayedBooks?.length / itemsPerPage));
        // console.log(pageCount);
      }, [itemOffset, itemsPerPage, displayedBooks]);

      console.log("currentitems", currentItems);
      console.log(pageCount);      
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % displayedBooks?.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    useEffect(() => {
        setShowBookDetails(false)
    }, [])

    useEffect(() => {
        axios.get(catName)
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

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

    useEffect(() => {
        setDisplayedBooks(searchParams
        ? bookDetails?.filter(book => book?.tags?.includes(searchParams))
        : bookDetails)
        console.log(bookDetails.filter(book => book?.tags?.includes(searchParams)))
        // console.log(displayedBooks);    
        
    },[bookDetails, searchParams])   

    return (
        <div className="container flex">
            <div className="sidebar bg-gray-200 h-full w-64 p-4 mx-4">                
                {categories.map(category => (
                <Link to={`${category.catLink}`}>
                    <button className="w-full py-2 px-4 text-left bg-white hover:bg-gray-100 rounded-md mb-2"
                            value={category.catName}   
                            onClick={() => setSearchParams(category.catName)}         
                    >
                        {category.catName}
                    </button>
                </Link>
                ))}
            </div>

            <div className="sub-container flex flex-col">
                <div className="books grid gap-4 grid-cols-3">
                    {/* <div className=""> */}
                    {currentItems?.map(book => (
                        <div key={book.dataId} className="card-container">
                            <Link
                                to={`/book/${book.dataId}`}
                                // save book data at localstorage with onclick fun
                                onClick={() => {
                                    localStorage.setItem("selectedAbook", JSON.stringify(book))
                                    setShowBookDetails(!showBookDetails)
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
                    ))} 
                    {/* </div>                               */}
                        
                </div>

                <div className="pagination flex justify-center">

                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                
                </div>
            </div>            
                
        </div>
    );
}
