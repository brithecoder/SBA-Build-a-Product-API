const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Product description is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0.01, 'Price must be greater than 0'] // Ensures price is positive
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    inStock: {
        type: Boolean,
        default: true
    },
    tags: {
        type: [String], // This defines an Array of Strings
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now // Sets the current date/time automatically
    }
});

// Compile the schema into a model and export it
const Product = mongoose.model('Product', productSchema);
module.exports = Product;