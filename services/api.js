// 

const helpers = require('../helpers/helpers');
const Products = require('../models/db/products');
const Orders = require('../models/db/orders');
const FileUpload = require('../middlewares/fileUploads');
const Firebase = require("../database/firebase");
const path = require("path");

const Api = {}

Api.test = async (req,res)=>{
    res.json({message: "Testing", status: 200});
}

Api.createProduct = (req,res)=>{
    // Get the data
    // let name = typeof(res.body.name) == 'string' && res.body.name.trim().length > 0 ? res.body.name.trim() : false;
    // let description = typeof(res.body.description) == 'string' && res.body.name.trim().length > 0 ? res.body.decription.trim() : '';
    // let tags = typeof(res.body);
    console.log(req.body);

    // let newProduct = helpers.getrandomId(8);
    // let productData = {name: "testing"}
    // Products.createProduct(newProduct, productData).then(data=>{
    //     res.json({message: data, status: 200});
    // }).catch(err=>{
    //     res.json({message: err, status: 404})
    // });
    res.json({message: "data", status: 200});

};

Api.getProductsAll = async(req, res) => {
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
    let productId = req.param.productId;
    Products.removeProduct(productId).then(data => {
        res.json({message: data, status: 200});
    }).catch(err=>{
        res.json({message: err, status: 500});
    })
}

Api.addImages = async(req,res)=>{
    // console.log();
    FileUpload.single(req,res, async()=>{
        let fileName = req.file.originalname;
        let success = await Products.addImages(req.file);
        if(success) res.json({message: success, status: 200});
    })
}

module.exports = Api;