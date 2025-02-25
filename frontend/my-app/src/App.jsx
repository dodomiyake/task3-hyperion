// Import React hooks for managing state and side effects
import { useState, useEffect } from 'react';
// Import Axios for making HTTP requests
import axios from 'axios';
// Import CSS styles for the component
import './App.css'

function App() {
  // State to store data from the '/api/data' endpoint, initialized as an empty object
  const [data, setData] = useState({});

  // State to store the custom message from the '/api/message' endpoint, initialized as an empty string
  const [customMessage, setCustomMessage] = useState('');

  // useEffect hook to run fetchData once when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once

  // Another useEffect hook to run fetchDataMessage once when the component mounts
  useEffect(() => {
    fetchDataMessage();
  }, []); // Empty dependency array ensures this effect runs only once

  // Asynchronous function to fetch data from '/api/data'
  const fetchData = async () => {
    try {
      // Send a GET request to '/api/data'
      const response = await axios.get('/api/data');
      // Update the state with the received data
      setData(response.data);
    }
    catch (error) {
      // Log any errors that occur during the fetch
      console.error('Error fetching data: ', error);
    }
  }

  // Asynchronous function to fetch custom message from '/api/message'
  const fetchDataMessage = async () => {
    try {
      // Send a GET request to '/api/message'
      const response = await axios.get('/api/message');
      // Update the state with the received message
      setCustomMessage(response.data);
    }
    catch (error) {
      // Log any errors that occur during the fetch
      console.error('Error fetching message: ', error);
    }
  }

  // Render the UI
  return (
    <>
      <div className="App">
        <header className="App-header">
          {/* Display the message from 'data' or show 'Loading...' if data is not yet available */}
          <h1>{data.message || 'Loading...'}</h1>
          {/* Display the custom message or show 'Loading...' if the message is not yet available */}
          <h2>{customMessage.message || 'Loading...'}</h2>
        </header>
      </div>
    </>
  )
}

// Export the App component as the default export
export default App