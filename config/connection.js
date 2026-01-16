const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    // try {
    //     // We use the URI from our .env file
    //     const conn = await mongoose.connect(process.env.MONGO_URI);
        
    //     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    // } catch (error) {
    //     console.error(`❌ Database Connection Error: ${error.message}`);
    //     // Exit process with failure (1) if we can't connect
    //     process.exit(1);
    // }
       try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected via Mongoose...");
    } catch (err) {
        console.error("❌ Database connection error:", err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;