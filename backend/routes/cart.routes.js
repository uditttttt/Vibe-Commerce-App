const router = require('express').Router();
let CartItem = require('../models/cartItem.model');
let Product = require('../models/product.model');

router.route('/').get(async (req, res) => {
    try {
        const cartItems = await CartItem.find().populate('product');

        if (!cartItems) {
            return res.json({ cartItems: [], total: 0 });
        }

        let total = 0;
        cartItems.forEach(item => {
            if (item.product) {
                total += item.product.price * item.quantity;
            }
        });

        res.json({ cartItems, total: total.toFixed(2) });

    } catch (err) {
        res.status(500).json('Error: ' + err);
    }
});

router.route('/').post(async (req, res) => {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 1) {
        return res.status(400).json('Error: Missing or invalid productId or quantity.');
    }

    try {
        let existingItem = await CartItem.findOne({ product: productId });

        if (existingItem) {
            existingItem.quantity += quantity;
            await existingItem.save();
            res.json(existingItem);
        } else {
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

router.route('/:id').delete(async (req, res) => {
    try {
        const deletedItem = await CartItem.findByIdAndDelete(req.params.id);
        
        if (!deletedItem) {
            return res.status(404).json('Error: Cart item not found.');
        }

        res.json('Cart item deleted successfully.');
    } catch (err) {
        res.status(500).json('Error: ' + err);
    }
});

router.route('/checkout').post(async (req, res) => {
    const cartItems = await CartItem.find().populate('product');
    let total = 0;
    cartItems.forEach(item => {
        if (item.product) {
            total += item.product.price * item.quantity;
        }
    });

    try {
        await CartItem.deleteMany({});

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
