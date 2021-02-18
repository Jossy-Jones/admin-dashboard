// This handles all the page routes in the dashboard

// Dependecies
const firebase = require('../database/firebase');

const Products = require('../models/db/products');

let firebaseRef = firebase.database.ref("colbet/meals");

const Handler = {}

Handler.Home = async(req, res)=>{
    return res.render('index',{
        pageTitle: 'Home'
    })
}

Handler.Orders = async(req, res)=>{
    return res.render('orders',{
        pageTitle: 'Orders',
        nav: 'orders',
        orders: ['dajkds',"adjkdsad","dlakasdj"]
    })
}

Handler.Products = async(req, res)=>{
    let products = await Products.getProducts();
    return res.render('products',{
        pageTitle: 'Products',
        nav: 'products',
        products: products
    })
}

Handler.AddProducts = (req,res)=>{
    return res.render('add_products',{
        pageTitle: 'Add Products',
        nav: 'products'
    })
}

Handler.EditProduct = async(req, res)=>{
    let productId = req.params.productId;
    let product = await Products.getProduct(productId);
    console.log(product)
    return res.render('index',{
        pageTitle: `Product - ${productId}`,
        nav: 'products'
    })
}

Handler.NotFound = (req,res)=>{
    return res.render('error', {
        message: 'Not Found'
    });
}

module.exports = Handler;