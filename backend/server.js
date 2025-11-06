// 1. IMPORT REQUIRED PACKAGES
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Loads environment variables from .env file

// 2. INITIALIZE THE EXPRESS APP
const app = express();
const port = process.env.PORT || 5000; // Use port from .env or default to 5000

// 3. APPLY MIDDLEWARE
app.use(cors()); // Allows cross-origin requests (from your frontend)
app.use(express.json()); // Allows the server to accept and parse JSON data in request bodies

// 4. CONNECT TO MONGODB ATLAS
// --- THIS IS THE NEW/UPDATED SECTION ---
const uri = process.env.MONGO_URI; // Get the URI from .env
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// 5. DEFINE API ROUTES
// --- THIS IS THE NEW SECTION ---
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes'); // <-- ADD THIS LINE

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes); // <-- ADD THIS LINE

// 6. START THE SERVER
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});