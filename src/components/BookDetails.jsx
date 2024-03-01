import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import catName from '../data/categories.txt'

export default function BookDetails() {
    const [bookDetails, setBookDetails] = useState([]);

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
        <div className='container flex'>
            <div className="sidebar">
                
                {categories.map(category => (
                <Link to={`${category.catLink}`}>
                    <p value={category.catName}   
                        onClick={() => setSearchParams(category.catName)} 
                        className="cat-title"
                    >
                        {category.catName}
                    </p>
                </Link>
                ))}
            </div>
            { bookDetails ? (
            <div key={bookDetails.dataId} className="bookdetail-container">
                    <Link
                        to={`/book/${bookDetails.dataId}`}
                        // onClick={() => localStorage.getItem("selectedAbook", JSON.stringify(book))}
                    >
                        <div className="bookdetail-card">
                            <img src={bookDetails.coverImg} alt={bookDetails.title} />
                            <div className="bookdetail-content">
                                <h1>{bookDetails.title}</h1>
                                <div className="bookdetail-info">
                                    <span>{bookDetails.pageCount}</span>
                                    <span> | </span>
                                    <span>{bookDetails.pub_year}</span>
                                    <span> | </span>
                                    <span>{bookDetails.fileSize}</span>
                                </div>
                                <p className="book-author">by {bookDetails.author}</p>
                                <div className='book-tags'>
                                    {bookDetails.tags?.map(tag => (
                                        <span>+ {tag} </span>
                                    ))
                                    }                                    
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
        ) : <h2>Loading...</h2> }
        </div>
        
        
    )
    }