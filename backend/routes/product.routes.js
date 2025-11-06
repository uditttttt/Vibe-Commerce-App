const router = require('express').Router();
const axios = require('axios'); // 1. Import axios
let Product = require('../models/product.model');

// 2. This function will fetch data from the Fake Store API
const fetchAndSeedDatabase = async () => {
    try {
        console.log('Fetching products from Fake Store API...');
        const response = await axios.get('https://fakestoreapi.com/products');
        
        // 3. The API data has 'title', but our schema has 'name'.
        // We must "transform" the data to match our schema.
        const transformedProducts = response.data.map(product => ({
            name: product.title,
            price: product.price,
            image: product.image,
            // We can even add 'description' if we update our model,
            // but for now, we'll stick to the original schema.
        }));
        
        // 4. Insert the new products into our database
        await Product.insertMany(transformedProducts);
        console.log('Database seeded successfully with Fake Store API data!');
        
        // Return the newly seeded products
        return transformedProducts;

    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

// --- API ENDPOINT ---

// GET /api/products - Get all products
router.route('/').get(async (req, res) => {
    try {
        // 1. Find all products in the database
        let products = await Product.find();
        
        // 2. If database is empty, seed it with mock data
        if (products.length === 0) {
            console.log('No products found, seeding database from Fake Store API...');
            products = await fetchAndSeedDatabase();
        }
        
        // 3. Send the products back as JSON
        res.json(products);
    } catch (err) {
        // If an error occurs, send back a 400 (Bad Request)
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;