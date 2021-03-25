const express = require('express');
const orders = express.Router();

// Services
const mainFunctions = require('../services/api');

// Product APIs functions
let ordersApi = {
    '/add': {
        method: "post",
        handler: mainFunctions.createOrder
    },
    '/all': {
        method: "get",
        handler: mainFunctions.getOrderAll
    },
    '/:orderId/': {
        method: "get",
        handler: mainFunctions.getOrder
    },
    '/:orderId/edit': {
        method: "post",
        handler: mainFunctions.updateOrder
    },
    '/:orderId/delete':{
        method: "delete",
        handler: mainFunctions.removeOrder
    }
}

Object.keys(ordersApi).forEach(api => {
    orders[ordersApi[api].method](api, ordersApi[api].handler);
})


module.exports = orders