// Import of mongoose library for MongoDB schema and model creation
const mongoose = require('mongoose');
// Definition of a mongoose schema for the "User" collection
const userSchema = new mongoose.Schema({
    // Define a field for the user's first name with a data type of String, and it is required
    firstName: {
        type: String,
        required: true
    },
    // Definition of a field for the user's last name with a data type of String, and it is required
    lastName: {
        type: String,
        required: true
    },
    // Definition of a field for the user's email with a data type of String, and it is required
    email: {
        type: String,
        required: true
    },
    // Definition of a field for the user's password with a data type of String, and it is required
    password: {
        type: String,
        required: true
    }
});
// Mongoose model for the "User" collection using the defined schema
// And a custom collection name ("users") for the model
const UserModel = mongoose.model("UserModel", userSchema, "users");
// Export the UserModel to make it available for use in other parts of the application
module.exports = UserModel;
