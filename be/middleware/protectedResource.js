const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');
const mongoose = require("mongoose");
const UserModel = mongoose.model("UserModel");
// Import the Cross-Origin Resource Sharing (CORS) middleware
const cors = require('cors');
// Import the Express framework
const express = require('express');
// Define the port number for the server
const PORT = 4000;
// Create an instance of the Express application
const app = express();
module.exports = (req, res, next) => {
  console.log("from middleware protectedResource" + JSON.stringify(req.headers));
  const { authorization } = req.headers;
  //Bearer fsfsjfsfgjgj
  if (!authorization) {
    return res.status(401).json({ error: "User not logged in 1" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (error, payload) => {
    if (error) {
      return res.status(401).json({ error: "User not logged in 2" });
    }
    const { _id } = payload;
    UserModel.findById(_id)
      .then((dbUser) => {
        if (!dbUser) {
          return res.status(401).json({ error: "User not found" });
        }
        req.user = dbUser;
        next();
      })
      .catch((error) => {
        console.error("Database error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      });
  });
}
// const jwt = require('jsonwebtoken');
// const mongoose = require("mongoose");
// const UserModel = mongoose.model("UserModel");
// const { JWT_SECRET } =require('../config'); // Adjust the import path accordingly
// const cors = require('cors');

// module.exports = (req, res, next) => {
//   // Enable CORS with specific options
//   // const corsOptions = {
//   //   origin: 'http://localhost:3000', // Replace with the origin of your React app
//   //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,FETCH',
//   //   credentials: true,
//   //   optionsSuccessStatus: 204,
//   //   allowedHeaders: ['Content-Type', 'Authorization'], // Add 'Authorization' to the allowed headers
//   // };

//   // cors(corsOptions)(req, res, () => {});

//   console.log("from middleware protectedResource" + JSON.stringify(req.headers));
//   const { authorization } = req.headers;

//   if (!authorization) {
//     return res.status(401).json({ error: "User not logged in 1" });
//   }

//   const token = authorization.replace("Bearer ", "");
//   jwt.verify(token, JWT_SECRET, (error, payload) => {
//     if (error) {
//       return res.status(401).json({ error: "User not logged in 2" });
//     }

//     const { _id } = payload;
//     UserModel.findById(_id)
//       .then((dbUser) => {
//         if (!dbUser) {
//           return res.status(401).json({ error: "User not found" });
//         }
//         req.user = dbUser;
//         next();
//       })
//       .catch((error) => {
//         console.error("Database error:", error);
//         return res.status(500).json({ error: "Internal Server Error" });
//       });
//   });
// };
