const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    // This 'product' field will store the ID of a product
    product: {
        type: mongoose.Schema.Types.ObjectId, // A special type for storing MongoDB IDs
        ref: 'Product', // This tells Mongoose this ID refers to a document in the 'Product' collection
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1 // We should always have at least 1
    }
}, {
    timestamps: true,
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;