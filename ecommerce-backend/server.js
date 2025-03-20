const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const productsRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());


app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
