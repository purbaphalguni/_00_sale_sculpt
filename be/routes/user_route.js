// Create an Express router
const express = require('express');
const router = express.Router();
// Import necessary modules for user registration and login
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const UserModel = mongoose.model("UserModel");
const { JWT_SECRET } = require('../config');
// Route for user registration
router.post("/register", (req, res) => {
    // Extract user details from the request body
    const { firstName, lastName, email, password } = req.body;
    // Check if mandatory fields are empty and return a 400 Bad Request status if true
    if (!firstName || !lastName || !password || !email) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    // Check if a user with the same email already exists in the database
    UserModel.findOne({ email: email })
        .then((userInDB) => {
            if (userInDB) {
                // Return a 500 Internal Server Error status if the user already exists
                return res.status(500).json({ error: "User with this email already registered" });
            }
            // Hash the user's password before saving it to the database
            bcryptjs.hash(password, 16)
                .then((hashedPassword) => {
                    // Create a new user instance with the hashed password
                    const user = new UserModel({ firstName, lastName, email, password: hashedPassword });
                    // Save the user to the database
                    user.save()
                        .then((newUser) => {
                            // Respond with a 201 Created status if the user is signed up successfully
                            res.status(201).json({ result: "User Signed up Successfully!" });
                        })
                        .catch((err) => {
                            // Log and handle any errors that occur during user saving
                            console.log(err);
                        });
                }).catch((err) => {
                    // Log and handle any errors that occur during password hashing
                    console.log(err);
                });
        })
        .catch((err) => {
            // Log and handle any errors that occur during database query
            console.log(err);
        });
});
// Route for user login
router.post("/login", (req, res) => {
    // Extract login credentials from the request body
    const { email, password } = req.body;
    // Check if mandatory fields are empty and return a 400 Bad Request status if true
    if (!password || !email) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    // Find the user with the provided email in the database
    UserModel.findOne({ email: email })
        .then((userInDB) => {
            // Return a 401 Unauthorized status if the user does not exist
            if (!userInDB) {
                return res.status(401).json({ error: "Invalid Credentials" });
            }
            // Compare the provided password with the hashed password in the database
            bcryptjs.compare(password, userInDB.password)
                .then((didMatch) => {
                    // If passwords match, create a JWT token and respond with user information
                    if (didMatch) {
                        const jwtToken = jwt.sign({ _id: userInDB._id }, JWT_SECRET);
                        const userInfo = { "_id": userInDB._id, "email": userInDB.email, "firstName": userInDB.firstName, "lastName": userInDB.lastName };
                        res.status(200).json({ result: { token: jwtToken, user: userInfo } });
                    } else {
                        // Return a 401 Unauthorized status if passwords do not match
                        return res.status(401).json({ error: "Invalid Credentials" });
                    }
                }).catch((err) => {
                    // Log and handle any errors that occur during password comparison
                    console.log(err);
                });
        })
        .catch((err) => {
            // Log and handle any errors that occur during database query
            console.log(err);
        });
});
// Export the router for use in other parts of the application
module.exports = router;
