const router = require('express').Router();
const axios = require('axios');
let Product = require('../models/product.model');

const fetchAndSeedDatabase = async () => {
    try {
        console.log('Fetching products from Fake Store API...');
        const response = await axios.get('https://fakestoreapi.com/products');
        
        const transformedProducts = response.data.map(product => ({
            name: product.title,
            price: product.price,
            image: product.image,
        }));
        
        await Product.insertMany(transformedProducts);
        console.log('Database seeded successfully with Fake Store API data!');
        
        return transformedProducts;

    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

router.route('/').get(async (req, res) => {
    try {
        let products = await Product.find();
        
        if (products.length === 0) {
            console.log('No products found, seeding database from Fake Store API...');
            products = await fetchAndSeedDatabase();
        }
        
        res.json(products);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;
