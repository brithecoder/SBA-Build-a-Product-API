require('dotenv').config(); // Load this first
const express = require('express');
const connectDB = require('./config/connection');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middlewares (Must come before routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Health Check Route
app.get('/hello', (req, res) => {
    console.log("Health check hit!");
    res.send("The server works!");
});

// 3. Mount API Routes
app.use('/api/products', productRoutes);

// 4. Root Route
app.get('/', (req, res) => {
    res.send("Welcome to the Product API");
});

// 5. 404 Catch-all (Must be the VERY LAST middleware)
app.use((req, res) => {
    console.log(`404 hit for: ${req.originalUrl}`);
    res.status(404).send("The URL you requested was not found on this server.");
});

// 6. Start the Server
const start = async () => {
    try {
        console.log("Step 1: Attempting to connect to DB...");
        // This ensures we don't start the server if the DB is down
        await connectDB(); 
        
        console.log("Step 2: DB Connected! Now starting Express...");
        app.listen(PORT, () => {
            console.log(`Step 3: 🚀 Server is live on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Step 4: Connection Failed!", error);
        process.exit(1); // Stop the process if DB connection fails
    }
};

start();