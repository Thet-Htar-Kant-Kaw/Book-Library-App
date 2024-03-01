import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Category from './components/Category';
import BookDetails from './components/BookDetails';
import { ContextProvider } from './Context';
import './index.css'

const App = () => {
    return (
    //   <div className="flex justify-center items-center h-screen">
    //   <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    //   Click me
    // </button>
    // <h1 className="text-3xl font-bold underline">
    //   Hello world!
    // </h1>
    // </div>
      <ContextProvider>
        <React.StrictMode>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path='/' element={<Category />}>
                <Route path="category/:categoryId" element={<Category />} />
              </Route>
                <Route path="book/:bookId" element={<BookDetails />} />
            </Routes>
          </BrowserRouter>
        </React.StrictMode>
      </ContextProvider>
      
    );
  };
  
  export default App;

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
