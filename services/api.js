// 

const helpers = require('../helpers/helpers');
const Products = require('../models/db/products');
const Orders = require('../models/db/orders');
const FileUpload = require('../middlewares/fileUploads');
const Firebase = require("../database/firebase");
const path = require("path");
const { type } = require('os');

const Api = {}

Api.test = async (req,res)=>{
    res.json({message: "Testing", status: 200});
}


// Products Api Logics
Api.createProduct = async (req,res)=>{
    // Get the data
    let name = typeof(req.body.name) == 'string' && req.body.name.trim().length > 0 ? req.body.name.trim() : false;
    let price = typeof(req.body.price) == 'string' && req.body.price.trim().length > 0 ? req.body.price.trim() : false;
    let description = typeof(req.body.description) == 'string' && req.body.name.trim().length > 0 ? req.body.description.trim() : '';
    let tags = typeof(req.body.tags) == 'object' && req.body.tags instanceof Array && req.body.tags.length > 0 ? req.body.tags : [];
    let images = typeof(req.body.images) == 'object' && req.body.images instanceof Array && req.body.images.length > 0 ? req.body.images : [];
    let type = typeof(req.body.product_type) == 'string' && ['main','drinks','starter'].indexOf(req.body.product_type) > -1 ? req.body.product_type : 'main';
    console.log(req.body);

    if(name && price){
        let productId = `${name}-${helpers.getrandomId(4)}`;
        let productData = {
            "id": productId,
            "name": name,
            "images": images,
            "description": description,
            "price": price,
            "type": type,
            "tags": tags
        }
        Products.createProduct(productId, productData).then(data=>{
            res.json({message: data, status: 200});
        }).catch(err=>{
            res.json({message: err, status: 400})
        });
        // res.json({message: "data", status: 200});
    } else {
        res.json({message: "Missing Parameters", status: 400})
    }

};

Api.getProductAll = async(req, res) => {
    Products.getProducts().then(data=>{
        res.json({message: data, status: 200});
    }).catch(err=>{
        res.json({message: err, status: 404})
    })
};

Api.getProduct = async(req,res)=>{
    let productId = req.params.productId;
    Products.getProduct(productId).then(data=>{
        res.json({message: data, status: 200})
    }).catch(err=>{
        res.json({message: err, status: 404})
    })
}

Api.updateProduct = async(req,res)=>{
    let productId = req.params.productId;
    let productData = {name : "This is a funny testing"}
    Products.editProduct(productId, productData).then(data=>{
        res.json({message: data, status: 200});
    }).catch(err=>{
        res.json({message: err, status: 500});
    })
}

Api.removeProduct = async(req,res)=>{
    let productId = typeof(req.params.productId) == "string" && req.params.productId.trim().length > 0 ? req.params.productId.trim() : false;
    if(productId && productId !== ("undefined" || "null")){
        Products.removeProduct(productId).then(data => {
            res.json({message: data, status: 200});
        }).catch(err=>{
            res.json({message: err, status: 400});
        })
    } else {
        res.json({message: "An error occured. Contact your Engineer!", status: 500})
    }
}

Api.addImages = async(req,res)=>{
    // console.log();
    FileUpload.single(req,res, async()=>{
        console.log(req.file);
        let fileName = req.file.originalname;
        Products.addImages(req.file).then(data => {
            res.json({message: data, status: 200});
        }).catch(err=>{
            res.json({message: err, status: 400});
        })
    })
}

Api.getImages = async(req,res)=>{
    let imagePath = req.params.imagePath;
    console.log(imagePath);
    res.json({message: "images", status: 200})
}


// Orders Api Logics
Api.createOrder = async(req,res)=>{
    let name =  typeof(req.body.name) == 'string' && req.body.name.trim().length > 0 ? req.body.name.trim() : false;
    let email = typeof(req.body.email) == 'string' && req.body.email.trim().length > 0 ? req.body.email.trim() : false;
    let phone = typeof(req.body.phone) == 'string' && req.body.phone.trim().length > 0 ? req.body.phone.trim() : false;
    let products = typeof(req.body.products) == 'object' && req.body.products instanceof Array && req.body.products.length > 0 ? req.body.products : false;
    let totalPrice = typeof(req.body.totalPrice) == 'string' && req.body.totalPrice.trim().length > 0 ? req.body.totalPrice.trim() : false;
    let location = typeof(req.body.location) == 'string' && req.body.location.trim().length > 0 ? req.body.location.trim() : false;

    let error = {};
    
    // Get total price
    let total = helpers.sumOfList(await Products.getPriceList(products));
    

    
    

    if(!name) error.name = "Please enter your name!";
    if(!email || !phone) error.contacts = "Please add a contact to continue!"
    if(!products) error.products = "Please add a product to continue!";
    if(!totalPrice) error.totalPrice = "Could not get the total price!";
    if(!location) error.location =  "Please enter a valid location!";
    
    if(name && products && totalPrice && location){
        let orderId = helpers.getrandomId(8);
        let orderData = {
            id: orderId,
            name,
            email,
            phone,
            products,
            totalPrice: total, //Cross check totalprice
            location
        }
        Orders.createOrder(orderId, orderData).then(msg=>{
            res.json({message: msg, data: orderId, status: 200});
        }).catch(err=>{
            res.json({message: err, data: null, status: 400});
        });
    } else {
        res.json({message: error, data: null, status: 400})
    }
}

Api.getOrderAll = async(req,res)=>{
    res.json({message: "orders found", status: 200})
}

Api.getOrder = async(req,res)=>{
    let orderId = req.params.orderId;
    Orders.getOrder(orderId).then(payload=>{
        res.json({message: payload.msg, data: payload.data, status: 200})
    }).catch(err=>{
        res.json({message: err, data: null, status: 400});
    })
}

Api.updateOrder = async(req,res)=>{
    res.json({message: "order updated", status: 200});
}

Api.removeOrder = async(req,res)=>{
    res.json({message: "order removed", status: 200});
}


module.exports = Api;