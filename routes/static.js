const express = require('express');
const static = express.Router();

// Services
const mainHandler = require('../services/handler');

// Get static pages
let staticApi = {
    '/': mainHandler.Home,
    '/orders/all': mainHandler.Orders,
    'orders/:orderId': mainHandler.EditOrder,
    '/products/all': mainHandler.Products,
    '/products/add': mainHandler.AddProducts,
    '/products/:productId': mainHandler.EditProduct,
    // '/products/all?sort':mainHandler.sortProducts
}

Object.keys(staticApi).forEach(routes => {
    static.get(routes, staticApi[routes]);
})


module.exports = static