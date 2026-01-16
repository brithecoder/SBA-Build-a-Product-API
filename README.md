# 🛒 Product Management API
A lightweight Node.js and Express API for managing a product catalog. This project features a full CRUD system (Create, Read, Update, Delete) and advanced querying capabilities like filtering, sorting, and pagination.

## 🚀 Features
**Full CRUD:** Manage products stored in MongoDB Atlas.

**Advanced Filtering:** Filter products by category and price range.

**Smart Sorting:** Sort products by price (ascending or descending).

**Pagination:** Limit results and skip through pages of data.

**Health Checks:** Built-in /ping and /hello routes for troubleshooting.

## 🛠️ Setup Instructions
**1. Prerequisites**
Node.js installed.

A MongoDB Atlas account and a connection string.

**2. Installation**
```Bash

# Clone this repository (or navigate to your folder)
cd product-api

# Install dependencies
npm install
3. Environment Variables
Create a .env file in the root directory and add your MongoDB connection string:
```
```Code snippet

MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/your_db_name
PORT=3000
```
**4. Running the Server**
```Bash

# Start with nodemon (auto-restarts on changes)
npm run dev

# Or start with standard node
node server.js
```
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/hello` | Server health check |
| **GET** | `/api/products` | Get all products (supports queries) |
| **GET** | `/api/products/:id` | Get a single product by ID |
| **POST** | `/api/products` | Create a new product |
| **PUT** | `/api/products/:id` | Update an existing product |
| **DELETE** | `/api/products/:id` | Remove a product |


## 🔍 Advanced Querying Examples
You can combine these parameters in the URL using ? and &.

**Filter by Price and Category:** GET `/api/products?category=Electronics&minPrice=100&maxPrice=500`

**Sort by Price (Descending):** GET `/api/products?sortBy=price_desc`

**Pagination (Page 2, 5 items per page):** GET `/api/products?page=2&limit=5`

![Example of get all products](./assets/getAll.png)
![Example of query](./assets/query.png)

## 💡 Troubleshooting
If the server appears live but requests are spinning:

Ensure your IP address is whitelisted in MongoDB Atlas.

Run the "Kill Port" command if a ghost process is stuck: `npx kill-port 3000`