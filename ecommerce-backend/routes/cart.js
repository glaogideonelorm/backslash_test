const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// GET the shopping cart
router.get('/', cartController.getCart);

// POST a new item to the cart
router.post('/', cartController.addToCart);

// PUT to update an existing cart item (e.g., change quantity)
router.put('/:id', cartController.updateCartItem);

// DELETE a cart item by id
router.delete('/:id', cartController.removeCartItem);

module.exports = router;
