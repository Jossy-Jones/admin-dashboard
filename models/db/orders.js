/*
* This handles logic for the orders database as well as the orders utility functions
*
*/

// Dependencies

const helpers = require('../../helpers/helpers');
const firebase = require('../../database/firebase');
const orderRef = firebase.database.ref('colbet/orders');