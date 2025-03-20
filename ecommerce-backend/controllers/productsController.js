const fs = require('node:fs');
const path = require('node:path');

const productsFilePath = path.join(__dirname, '../data/products.json');

function readProducts() {
    const data = fs.readFileSync(productsFilePath, 'utf8');
    return JSON.parse(data);
}

exports.getAllProducts = (req, res) => {
    try {
        const products = readProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read products data' });
    }
};

exports.getProductById = (req, res) => {
    try {
        const products = readProducts();
        const product = products.find(p => p.id === req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to read products data' });
    }
};
