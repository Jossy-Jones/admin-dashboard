/*
* This handles logic for the orders database as well as the orders utility functions
*
*/

// Dependencies

require("dotenv");
const helpers = require('../../helpers/helpers');
const firebase = require('../../database/firebase');
const orderRef = firebase.database.ref(process.env.ORDER_REF);

const Orders = {}

Orders.createOrder = (orderId, orderData) => {
    return new Promise((resolve, reject) => {
        orderRef.child(orderId).set(orderData,(err)=>{
            if(!err){
                resolve("Order created successfully");
            } else {
                reject("Could not create order!");
            }
        })
    }).catch(e=>{
        return(e);
    })
}

Orders.getOrders = ()=>{
    return new Promise((resolve, reject) => {
        let result = [];
        orderRef.on("value", snapshot=>{
            if(snapshot.val()) {
                Object.values(snapshot.val()).map(order => {
                    result.push(order);
                    resolve(result)
                });
            } else {
                reject("No orders found");
            };
        })
    }).catch(e=>{
        return(e)
    })
    
}

Orders.getOrder = (orderId)=>{
    return new Promise((resolve, reject) => {
        orderRef.child(orderId).on("value", (snapshot)=>{
            if(snapshot.val()) {
                resolve(snapshot.val());
            } else {
                reject(`No info found on this orderId: ${orderId}`);
            };
        },(err)=>{
            reject(`An Error occurred; ${err}`);
        })
    }).catch(e=>{
        return(e);
    })
    
}

module.exports = Orders;