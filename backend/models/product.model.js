const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the blueprint (schema)
const productSchema = new Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    image: { 
        type: String, 
        required: false // We'll make this optional for now
    },
}, {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
});

// Create the model from the schema
const Product = mongoose.model('Product', productSchema);

// Export the model
module.exports = Product;