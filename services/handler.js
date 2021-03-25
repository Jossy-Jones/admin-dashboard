// This handles all the page routes in the dashboard

// Dependecies
const firebase = require('../database/firebase');
const Orders = require('../models/db/orders');

const Products = require('../models/db/products');

let firebaseRef = firebase.database.ref("colbet/meals");
const helpers = require("../helpers/helpers")

const Handler = {}

Handler.Home = async(req, res, next)=>{
    // let products = await Products.getProducts();
    // let orders = await Orders.getOrders();
    return res.render('index',{
        pageTitle: 'Home',
        nav: 'home',
        // products: products,
        // orders: orders
    });
}

Handler.Orders = async(req, res)=>{
    let orders = await Orders.getOrders();
    return res.render('all_orders',{
        pageTitle: 'Orders',
        nav: 'orders',
        orders: orders
    })
}

Handler.EditOrder = async(req,res)=>{
    let orderId = req.params.orderId;
    let orderData = await Orders.getOrder(orderId);
    return res.render('id_order',{
        pageTitle: `Order - ${orderId}`,
        nav: 'orders',
        order: orderData
    })
}

Handler.Products = async(req, res)=>{
    let sort = typeof(req.query.sort) == "string" && ["name","price","date"].indexOf(req.query.sort) > -1 ? req.query.sort : false;
    
    if(sort){
        let products = await Products.getProducts();
        let sorted = helpers.orderObjectBy(products, sort);
        console.log(sort);
        return res.render('all_products',{
            pageTitle: 'Products',
            nav: 'products',
            sort: sort,
            products: sorted
        })
    } else {
        let products = await Products.getProducts();
        return res.render('all_products',{
            pageTitle: 'Products',
            nav: 'products',
            products: products
        })
    }
}

Handler.sortProducts = async(req,res)=>{
    console.log("sorted");
    return res.render('all_products',{
        pageTitle: 'Products',
        nav: 'products',
        products: sorted
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