// Import the Cross-Origin Resource Sharing (CORS) middleware
const cors = require('cors');
// Import the Express framework
const express = require('express');
// Define the port number for the server
const PORT = 4000;
// Create an instance of the Express application
const app = express();
// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true, // Allow sending cookies with the request
  }));
// app.use(cors());
// Enable CORS with specific options
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the origin of your React app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization'], // Add 'Authorization' to the allowed headers
  };
  
  app.use(cors(corsOptions));
  
// Import the Mongoose library for MongoDB interactions and the MongoDB connection URL from the configuration
const mongoose = require('mongoose');
const { MONGOBD_URL } = require('./config')
// Set a global variable to store the base directory path
global.__basedir = __dirname;
// Connect to the MongoDB database using the provided URL
mongoose.connect(MONGOBD_URL);
// Event listener for successful database connection
mongoose.connection.on('connected', () => {
    console.log("DB connected");
});
// Event listener for database connection errors
mongoose.connection.on('error', (error) => {
    console.log("Some error while connecting to DB")
});
// Import user and product models
require('./models/user_model');
require('./models/product_model');
// Use the CORS middleware to handle cross-origin resource sharing
app.use(cors());
// Parse incoming JSON data
app.use(express.json());
// Use the user and product routes in the application
app.use(require('./routes/user_route'));
app.use(require('./routes/product_route'));
// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log("Server started");
});
