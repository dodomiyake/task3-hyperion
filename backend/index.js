// Import the Express framework
const express = require('express');
// Import the CORS middleware to enable Cross-Origin Resource Sharing
const cors = require('cors');

// Create an instance of an Express application
const app = express();

// Define the port number from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Load environment variables from a .env file into process.env
require('dotenv').config();

// Apply the CORS middleware to allow cross-origin requests
app.use(cors());

// Define a GET route for '/api/data'
app.get('/api/data', (req, res) => {
    // Create an object with a message
    const data = { message: 'Hello from the backend!' };
    // Send the data as a JSON response to the client
    res.json(data);
});

// Define a GET route for '/api/message'
app.get('/api/message', (req, res) => {
    // Create an object with a different message
    const data = { message: 'Welcome to the other side!' };
    // Send the data as a JSON response to the client
    res.json(data);
});

// Custom middleware to log every incoming request URL
app.use((req, res, next) => {
    // Log the request URL to the console
    console.log(`Request URL: ${req.url}`);
    // Pass control to the next middleware in the chain
    next();
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    // Log a message to the console when the server is running
    console.log(`Server listening on port ${PORT}`);
});
