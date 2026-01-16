const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


// 1. HEALTH CHECK (To test if the route is even reachable)
router.get('/ping', (req, res) => {
    res.send("Pong! The router is connected.");
});

// 2. GET /api/products (Read All Products)
// for testing purposes only
// router.get('/', async (req, res) => {
//     console.log("1. Route hit!"); 
//     try {
//         console.log("2. Starting DB Query...");
//         const products = await Product.find();
//         console.log("3. Query finished, sending JSON...");
//         res.json(products);
//     } catch (error) {
//         console.log("4. Error caught!");
//         res.status(500).json({ message: error.message });
//     }
// });

// 1. POST /api/products (Create a Product)
router.post('/', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 2. GET /api/products/:id (Read a Single Product)
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. PUT /api/products/:id (Update a Product)
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } // {new: true} returns the doc AFTER update
        );
        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 4. DELETE /api/products/:id (Delete a Product)
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 5. GET /api/products (Read All with Advanced Querying)
router.get('/', async (req, res) => {
    try {
        let queryObj = { ...req.query };
        
        // A. Filtering
        const excludeFields = ['sortBy', 'page', 'limit'];
        excludeFields.forEach(el => delete queryObj[el]);

        // Support for minPrice and maxPrice
        let query = {};
        if (req.query.category) query.category = req.query.category;
        if (req.query.minPrice || req.query.maxPrice) {
            query.price = {};
            if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
            if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
        }

        let mongooseQuery = Product.find(query);

        // B. Sorting
        if (req.query.sortBy) {
            const sortOrder = req.query.sortBy === 'price_desc' ? -1 : 1;
            mongooseQuery = mongooseQuery.sort({ price: sortOrder });
        }

        // C. Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        mongooseQuery = mongooseQuery.skip(skip).limit(limit);

        const products = await mongooseQuery;
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;