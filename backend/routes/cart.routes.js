const router = require('express').Router();
let CartItem = require('../models/cartItem.model');
let Product = require('../models/product.model'); // We need Product to calculate total

// --- API ENDPOINTS FOR CART ---

/**
 * GET /api/cart
 * Get all cart items, populate product details, and calculate total.
 */
router.route('/').get(async (req, res) => {
    try {
        // Find all items in the cart
        // .populate('product') is the magic! It replaces the 'product' ID
        // with the actual product document (name, price, image).
        const cartItems = await CartItem.find().populate('product');

        if (!cartItems) {
            return res.json({ cartItems: [], total: 0 });
        }

        // Calculate the total price
        let total = 0;
        cartItems.forEach(item => {
            // Check if product data exists (it might be deleted)
            if (item.product) {
                total += item.product.price * item.quantity;
            }
        });

        // Send back the list of items and the calculated total
        res.json({ cartItems, total: total.toFixed(2) });

    } catch (err) {
        res.status(500).json('Error: ' + err);
    }
});

/**
 * POST /api/cart
 * Add an item to the cart.
 * If the item already exists, update its quantity.
 */
router.route('/').post(async (req, res) => {
    const { productId, quantity } = req.body;

    // Simple validation
    if (!productId || !quantity || quantity < 1) {
        return res.status(400).json('Error: Missing or invalid productId or quantity.');
    }

    try {
        // Check if the item is already in the cart
        let existingItem = await CartItem.findOne({ product: productId });

        if (existingItem) {
            // If item exists, update its quantity
            existingItem.quantity += quantity;
            await existingItem.save();
            res.json(existingItem);
        } else {
            // If item does not exist, create a new cart item
            const newItem = new CartItem({
                product: productId,
                quantity: quantity
            });
            await newItem.save();
            res.json(newItem);
        }
    } catch (err) {
        res.status(500).json('Error: ' + err);
    }
});

/**
 * DELETE /api/cart/:id
 * Remove an item from the cart by its CartItem ID.
 */
router.route('/:id').delete(async (req, res) => {
    try {
        // req.params.id will be the CartItem's _id
        const deletedItem = await CartItem.findByIdAndDelete(req.params.id);
        
        if (!deletedItem) {
            return res.status(404).json('Error: Cart item not found.');
        }

        res.json('Cart item deleted successfully.');
    } catch (err) {
        res.status(500).json('Error: ' + err);
    }
});

/**
 * POST /api/checkout
 * Mock checkout: Clears the cart and returns a receipt.
 */
router.route('/checkout').post(async (req, res) => {
    // Note: In a real app, you'd get the cart items, calculate total,
    // process payment, and *then* clear the cart.
    // For this mock, we just clear the cart.
    
    // We'll calculate the total one last time before clearing.
    const cartItems = await CartItem.find().populate('product');
    let total = 0;
    cartItems.forEach(item => {
        if (item.product) {
            total += item.product.price * item.quantity;
        }
    });

    try {
        // Clear the entire cart
        await CartItem.deleteMany({}); // Deletes all documents in the CartItem collection

        // Return a mock receipt
        res.json({
            success: true,
            message: 'Checkout successful! (Mock)',
            totalAmount: total.toFixed(2),
            timestamp: new Date()
        });

    } catch (err) {
        res.status(500).json('Error: ' + err);
    }
});


module.exports = router;