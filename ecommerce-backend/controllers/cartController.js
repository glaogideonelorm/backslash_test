const fs = require('node:fs');
const path = require('node:path');
const { v4: uuidv4 } = require('uuid');

const cartFilePath = path.join(__dirname, '../data/cart.json');

function readCart() {
  try {
    if (!fs.existsSync(cartFilePath)) {
      fs.writeFileSync(cartFilePath, '[]');
    }
    const data = fs.readFileSync(cartFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading cart:', error);
    return [];
  }
}

function writeCart(cart) {
  try {
    fs.writeFileSync(cartFilePath, JSON.stringify(cart, null, 2));
  } catch (error) {
    console.error('Error writing cart:', error);
  }
}

exports.getCart = (req, res) => {
  try {
    const cart = readCart();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read cart data' });
  }
};

exports.addToCart = (req, res) => {
  try {
    const { productId, name, price, quantity } = req.body;
    if (!productId || !name || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const cart = readCart();
    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      const newItem = {
        id: uuidv4(),
        productId,
        name,
        price,
        quantity: quantity || 1
      };
      cart.push(newItem);
    }
    writeCart(cart);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

exports.updateCartItem = (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    if (quantity == null) {
      return res.status(400).json({ error: 'Quantity is required' });
    }
    const cart = readCart();
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    cart[itemIndex].quantity = quantity;
    writeCart(cart);
    res.json(cart[itemIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart item' });
  }
};

exports.removeCartItem = (req, res) => {
  try {
    const { id } = req.params;
    const cart = readCart();
    const newCart = cart.filter(item => item.id !== id);
    if (newCart.length === cart.length) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    writeCart(newCart);
    res.json({ message: 'Item removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove cart item' });
  }
};
