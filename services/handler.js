// This handles all the routes in the dashboard

// Dependecies
const db = '';

const Handler = {}

Handler.Home = (req, res)=>{
    return res.render('index',{
        pageTitle: 'Home'
    })
}

Handler.Orders = (req, res)=>{
    return res.render('orders',{
        pageTitle: 'Orders',
        nav: 'orders',
        orders: ['dajkds',"adjkdsad","dlakasdj"]
    })
}

Handler.Products = (req, res)=>{
    return res.render('products',{
        pageTitle: 'Products',
        nav: 'products'
    })
}

Handler.EditProduct = (req, res)=>{}

Handler.NotFound = (req,res)=>{
    return "Not found"
}

module.exports = Handler;