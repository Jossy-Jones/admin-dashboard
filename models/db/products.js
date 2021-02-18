/*
* This handles logic for the product database as well as the product utility functions
*
*/

// Dependecies
require("dotenv").config();
const helpers = require('../../helpers/helpers');
const firebase = require('../../database/firebase');
const productRef = firebase.database.ref(process.env.PRODUCT_REF);
const ImagesRef = firebase.storage.bucket();

const Products = {}


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

Products.removeProduct = (productId)=>{
    return new Promise((resolve, reject) => {
        productRef.child(`${productId}`).remove(err=>{
            if(err){
                reject(`Error occurred when deleting product: ${productId}`)
            } else {
                resolve(`Success`);
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
    return new Promise((resolve, reject) => {
        let file = ImagesRef.file("testing/testing.jpeg");
        let fileStream = file.createWriteStream();
        fileStream.on('error', function (err) {
            reject(err);
        });
    
        fileStream.on('finish', function () {
            let imageUrl = `https://storage.googleapis.com/${file.name}`
            resolve(imageUrl);
        });
        fileStream.end(arg.buffer);
    }).catch(e=>{
        return e
    })
    
}


module.exports = Products;