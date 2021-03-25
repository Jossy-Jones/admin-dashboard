/*
* This handles logic for the product database as well as the product utility functions
*
*/

// Dependecies
require("dotenv").config();
const helpers = require('../../helpers/helpers');
const firebase = require('../../database/firebase');
const productRef = firebase.database.ref(process.env.PRODUCT_REF);
const Bucket = firebase.bucket;
const Storage = firebase.storage;

const Products = {}


Products.createProduct = (productId, productData)=>{
    return new Promise((resolve, reject) => {
        productRef.child(productId).set(productData,(err)=>{
            if(err){
                reject(`Error occurred when creating new product`);
            } else {
                resolve("Success")
            }
        })
    }).catch(e=>{
        return(e);
    })
}

Products.getProducts = ()=>{
    return new Promise((resolve, reject) => {
        let result = [];
        productRef.on("value", (snapshot)=>{
            if(snapshot.val()) {
                Object.values(snapshot.val()).map(product => {
                    result.push(product);
                    resolve(result)
                });
            } else {
                reject("No products found");
            };
        });
    }).catch(e=>{
        return(e)
    })
    
}

Products.getProduct = (productId)=>{
    return new Promise((resolve, reject) => {
        productRef.child(productId).on("value",(snapshot)=>{
            if(snapshot.val()){
                resolve(snapshot.val())
            } else {
                reject(`No info on this product ${productId}`);
            }
        },(err)=>{
            reject(`An Error occurred; ${err}`);
        })
    }).catch(e=>{
        return(e)
    });
}

Products.editProduct = (productId, productData)=>{
    return new Promise((resolve, reject) => {
        productRef.push(productId).set(productData,(err)=>{
            if(err){
                reject(`An Error occurred; ${err}`);
            } else {
                resolve("success");
            }
        })
    }).catch(e=>{
        return(e);
    })
}

Products.getPriceList = (productIds)=>{
    return new Promise((resolve, reject) => {
        productIds = typeof(productIds) == "object" && productIds instanceof Array && productIds.length > 0 ? productIds : typeof(productIds) == "string" && productIds.trim().length > 0 ? productIds.trim() : false;

        if(typeof(productIds) == 'object'){
            let priceList = [];
            productIds.forEach(async(productId)=>{
                let data = await Products.getProduct(productId);
                priceList.push(data.price);
                if(productIds[productIds.length - 1] == data.id){
                    resolve(priceList);
                }
            });
        } else if (typeof(productIds) == "string") {
            let data = Products.getProduct(productIds)
            resolve(data.price);
        } else {
            reject("false")
        }
    }).catch(e=>{
        return(e);
    });
}

Products.removeProduct = (productId)=>{
    return new Promise((resolve, reject) => {
        productRef.child(`${productId}`).remove(err=>{
            if(err){
                reject(`Error occurred when deleting product: ${productId}!`)
            } else {
                resolve(`Product has been deleted successfully!`);
            }
        });
        // if(productRef.child(productId).exists()){
        // } else {
        // }
    }).catch(e=>{
        return(e);
    })
}

Products.addImages = (arg)=>{
    if(typeof(arg)!='object') throw new Error("Argument must be of Object type");
    return new Promise( async (resolve, reject) => {
        let filename = helpers.getrandomId(4);
        let file = Bucket.file(`testing/hello-${filename}.jpeg`);
        console.log(file.name);
        let fileStream = file.createWriteStream();
        fileStream.on('error', function (err) {
            reject(err);
        });
    
        fileStream.on('finish', function () {
            let image = `${file.name}`;
            resolve(image);
        });
        fileStream.end(arg.buffer);
        console.log(arg);

        // Using File path
        // Storage.bucket().upload(filepath, {
        //     // By setting the option `destination`, you can change the name of the
        //     destination: destination,
        //     // uploadType: "media",
        //     // object you are uploading to a bucket.
        //     metadata: {
        //         contentType: arg.mimetype,
        //         // Enable long-lived HTTP caching headers
        //         // Use only if the contents of the file will never change
        //         // (If the contents will change, use cacheControl: 'no-cache')
        //         // cacheControl: 'public, max-age=31536000',
        //         cachControl: 'no-cache'
        //     },
        // },(err,data)=>{
        //     if(!err){
        //         console.log(data);
        //         resolve({message: "Image stored successfully!",data});
        //     } else {
        //         console.log(err);
        //         reject(err);
        //     }
        // })
    }).catch(e=>{
        return e
    })
    
}


module.exports = Products;