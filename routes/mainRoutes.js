const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const url = require('url');

// Api Routes
const statics = require("./static")
const products = require("./products");
const orders = require("./orders");


router.use("/",statics);
router.use("/api/products/",products)
router.use("/api/orders/",orders);


module.exports = router