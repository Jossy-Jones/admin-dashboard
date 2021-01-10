const express = require('express');
const router = express.Router();
const path = require('path');
const url = require('url');


const mainHandler =  require('../services/handler');

// Get static pages
router.get("/",mainHandler.Home);
router.get("/orders", mainHandler.Orders);
router.get("/products", mainHandler.Products);


module.exports = router