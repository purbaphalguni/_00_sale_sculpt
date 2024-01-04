// Import of Express framework and create a router instance
const express = require('express');
const router = express.Router();
const protectedRoute = require("../middleware/protectedResource");
// Import of mongoose for MongoDB interactions and the ProductModel schema
const mongoose = require("mongoose");
const ProductModel = mongoose.model("ProductModel");
// Route to add a new product to the database
router.post("/add_product",protectedRoute, (req, res) => {
    // Logging the request body to the console
    console.log(req.body);
    // Destructuring product details from the request body
    const { productName, productQuantity, productAmount } = req.body;
    // Check if mandatory fields are empty and return a 400 Bad Request status if true
    if (!productName || !productQuantity || !productAmount) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    // Check if a product with the same name already exists in the database
    ProductModel.findOne({ productName: productName })
        .then((userInDB) => {
            if (userInDB) {
                // Return a 500 Internal Server Error status if the product already exists
                return res.status(500).json({ error: "Product with this name already added" });
            } else{
                // Create a new product instance and save it to the database
                const product = new ProductModel({ productName: productName, productQuantity: productQuantity, productAmount: productAmount });
                product.save()
                    .then((newProduct) => {
                        // Respond with a 201 Created status if the product is added successfully
                        res.status(201).json({ result: "Product Added Successfully!" });
                    })
                    .catch((err) => {
                        // Log and handle any errors that occur during product saving
                        console.log(err);
                    });
            }
        })
        .catch((err) => {
            // Log and handle any errors that occur during database query
            console.log(err);
        });
});
// Route to retrieve all sales data
router.get("/allsales",protectedRoute, (req, res) => {
    // Retrieve all products from the database and populate relevant fields
    ProductModel.find()
        .populate("_id", "_id")
        .populate("productName", "productName")
        .populate("productQuantity", "productQuantity")
        .populate("productAmount", "productAmount")
        .then((dbSales) => {
            // Logging the retrieved sales data to the console
            console.log(dbSales);
            // Respond with a 200 OK status and the sales data
            res.status(200).json({ sales: dbSales });
        })
        .catch((error) => {
            // Logging and handling any errors that occur during the database query
            console.log(error);
        });
});
// Route to retrieve the top 5 sales based on sales amount
router.get("/topsales",protectedRoute, (req, res) => {
    // Aggregate pipeline to calculate sales amount, sort, limit, and project relevant fields
    ProductModel.aggregate([
        {
            $addFields: {
                salesAmount: { $multiply: ["$productQuantity", "$productAmount"] }
            }
        },
        {
            $sort: { salesAmount: -1 } // Sort in descending order based on salesAmount
        },
        {
            $limit: 5 // Limit the results to the top 5
        },
        {
            $project: {
                _id: 1,
                productName: 1,
                productQuantity: 1,
                productAmount: 1,
                salesAmount: 1
            }
        }
    ])
        .then((topSales) => {
            // Log the top sales data to the console
            console.log(topSales);
            // Respond with a 200 OK status and the top sales data
            res.status(200).json({ topSales });
        })
        .catch((error) => {
            // Log and handle any errors that occur during the database query
            console.log(error);
            // Respond with a 500 Internal Server Error status
            res.status(500).json({ error: "Internal Server Error" });
        });
});
// Route to retrieve the total revenue from all sales
router.get("/totalrevenue",protectedRoute, (req, res) => {
    // Aggregate pipeline to calculate sales amount, group by null, and project total revenue
    ProductModel.aggregate([
        {
            $addFields: {
                salesAmount: { $multiply: ["$productQuantity", "$productAmount"] }
            }
        },
        {
            $group: {
                _id: null, // Grouping by null means we're considering all documents as one group
                totalRevenue: { $sum: "$salesAmount" }
            }
        },
        {
            $project: {
                _id: 0, // Exclude the _id field from the result
                totalRevenue: 1
            }
        }
    ])
    .then((result) => {
        // Extraction of the total revenue from the result or set it to 0 if no result
        const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;
        // Logging the total revenue to the console
        console.log("Total Revenue:", totalRevenue);
        // Respond with a 200 OK status and the total revenue
        res.status(200).json({ totalRevenue });
    })
    .catch((error) => {
        // Log and handle any errors that occur during the database query
        console.log(error);
        // Respond with a 500 Internal Server Error status
        res.status(500).json({ error: "Internal Server Error" });
    });
});
// Export the router to make it available for use in other parts of the application
module.exports = router;
