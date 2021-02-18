const express = require('express');
const router = express.Router();
const path = require('path');
const url = require('url');

// Middlewares
const FileUpload = require('../middlewares/fileUploads')


const mainHandler = require('../services/handler');
const mainFunctions = require('../services/api');

// Get static pages
let staticRouter = {
    '/': mainHandler.Home,
    '/orders/all': mainHandler.Orders,
    'orders/:orderId': mainHandler.Orders,
    '/products/all': mainHandler.Products,
    '/products/add': mainHandler.AddProducts,
    '/products/:productId': mainHandler.EditProduct,
}

Object.keys(staticRouter).forEach(routes => {
    router.get(routes, staticRouter[routes]);
})


// Product APIs functions
let functionsRouters = {
    '/api/products/create': {
        method: "post",
        handler: mainFunctions.createProduct
    },
    '/api/products/all': {
        method: "get",
        handler: mainFunctions.getProductsAll
    },
    '/api/products/:productId/': {
        method: "get",
        handler: mainFunctions.getProduct
    },
    '/api/products/:productId/edit': {
        method: "post",
        handler: mainFunctions.updateProduct
    },
    '/api/products/:productId/delete':{
        method: "delete",
        handler: mainFunctions.removeProduct
    },
    '/api/products/images/add': {
        method: "post",
        handler: mainFunctions.addImages
    }
}

Object.keys(functionsRouters).forEach(routes => {
    router[functionsRouters[routes].method](routes, functionsRouters[routes].handler);
})


module.exports = router