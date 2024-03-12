import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import catName from '../data/categories.txt'
import { useSearch } from '../Context';

export default function BookDetails() {
    const [bookDetails, setBookDetails] = useState([]);
    const { searchParams, setSearchParams } = useSearch() || {};
    const { darkMode, setDarkMode } = useSearch() || {};

    const [categories, setCategories] = useState([]);
    useEffect(() => {
          axios.get(catName)
              .then(response => setCategories(response.data))
              .catch(error => console.error('Error fetching categories:', error));
      }, []);

    useEffect(() => {
    const bookItem = JSON.parse(localStorage.getItem('selectedAbook'));
    if (bookItem) {
    setBookDetails(bookItem);
    }
    console.log("BookItem", bookItem)
    }, []);

    return (
        <div className={`flex pt-4 pr-4 ${darkMode && 'bg-gray-900'}`}>
            <div className={`sidebar h-full w-1/5 p-4 mx-4 ${darkMode ? 'bg-gray-700 rounded-lg border border-sky-200' : 'bg-gray-100'}`}>                
                
                {categories.map(category => (
                <Link to={`${category.catLink}`}>
                    <button className={`w-full py-2 px-4 text-left border rounded-md mb-2 
                    ${darkMode ? 'bg-gray-800 rounded-lg border border-sky-400 text-sky-400 hover:shadow-inner hover:shadow-blue-500' 
                    : 'bg-slate-300 hover:border-indigo-400'}`}
                    value={category.catName}   
                    onClick={() => setSearchParams(category.catName)}         
                    >
                        {category.catName}
                    </button>
                </Link>
                ))}
            </div>
            { bookDetails ? (
            <div key={bookDetails.dataId} className="mx-8">
                    <Link
                        to={`/book/${bookDetails.dataId}`}
                        // onClick={() => localStorage.getItem("selectedAbook", JSON.stringify(book))}
                    >
                        <div className="bookdetail-card">
                            <img 
                                src={bookDetails.coverImg} 
                                alt={bookDetails.title} 
                                className='w-48 mt-2 rounded-lg'
                            />
                            <div className={`bookdetail-content my-4 text-xl ${darkMode ? 'text-sky-400' : 'text-[#0f172a]'}`}>
                                <h1 className='text-3xl font-bold'>{bookDetails.title}</h1>
                                <div className="bookdetail-info mt-4">
                                    <span>{bookDetails.pageCount}</span>
                                    <span> | </span>
                                    <span>{bookDetails.pub_year}</span>
                                    <span> | </span>
                                    <span>{bookDetails.fileSize}</span>
                                </div>
                                <div className='book-author my-4'>
                                    <span>by </span>
                                    <span className="font-bold">{bookDetails.author}</span>
                                </div>                                
                                <div className='book-tags'>
                                    {bookDetails.tags?.map(tag => (
                                        <span>+ {tag} </span>
                                    ))
                                    }                                    
                                </div>
                                <button
                                    type="submit"
                                    className="px-6 inline-block py-3 w-full sm:w-fit rounded-full my-6 bg-sky-600 hover:bg-sky-500 text-white"
                                >
                                    Download
                                </button>
                            </div>
                        </div>
                    </Link>
                </div>
        ) : <h2>Loading...</h2> }
        </div>        
        
    )
    }