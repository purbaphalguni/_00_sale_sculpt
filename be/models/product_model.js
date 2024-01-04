// Import of mongoose library for MongoDB schema and model creation
const mongoose = require('mongoose');
// Definition of a mongoose schema for the "Product" collection
const productSchema = new mongoose.Schema({
    // Definition of a field for the product name with a data type of String, and it is required
    productName: {
        type: String,
        required: true
    },
    // Definition of a field for the product quantity with a data type of Number, and it is required
    productQuantity: {
        type: Number,
        required: true
    },
    // Definition of a field for the product amount with a data type of Number, and it is required
    productAmount: {
        type: Number,
        required: true
    }
});
// mongoose model for the "Product" collection using the defined schema
// And a custom collection name ("product") for the model
const ProductModel = mongoose.model("ProductModel", productSchema, "product");
// Export the ProductModel to make it available for use in other parts of the application
module.exports = ProductModel;
