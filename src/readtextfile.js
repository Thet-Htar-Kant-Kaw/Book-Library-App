import React, { useState, useEffect } from 'react';
import axios from 'axios'; // If you prefer using Axios

function TxtFileReader() {
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    async function fetchTxtFile() {
      try {
        // Using Fetch API
        const response = await fetch('./all_book_details.txt');
        const text = await response.text();
        console.log(text)

        // Using Axios
        // const response = await axios.get('./all_book_details.txt');
        // setFileContent(response.data);
        // console.log(response)
      } catch (error) {
        console.error('Error fetching the .txt file:', error);
      }
    }
    
    fetchTxtFile();
  }, []);

  // return (
  //   <div>
  //     <h1>Content of the .txt file:</h1>
  //     <pre>{fileContent}</pre>
  //   </div>
  // );
}

export default TxtFileReader;
