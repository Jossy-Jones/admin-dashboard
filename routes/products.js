// This holds the logic for products api

// Dependecies
const express = require("express");
const products = express.Router();

// Services
const mainFunctions = require('../services/api');

// Product APIs functions
let productsApi = {
    '/add': {
        method: "post",
        handler: mainFunctions.createProduct
    },
    '/all': {
        method: "get",
        handler: mainFunctions.getProductAll
    },
    '/:productId/': {
        method: "get",
        handler: mainFunctions.getProduct
    },
    '/:productId/edit': {
        method: "post",
        handler: mainFunctions.updateProduct
    },
    '/:productId/delete':{
        method: "delete",
        handler: mainFunctions.removeProduct
    },
    '/images/add': {
        method: "post",
        handler: mainFunctions.addImages
    },
    '/images/:productId-:imagePath': {
        method: "get",
        handler: mainFunctions.getImages
    }
}

Object.keys(productsApi).forEach(api => {
    products[productsApi[api].method](api, productsApi[api].handler);
})

module.exports = products;