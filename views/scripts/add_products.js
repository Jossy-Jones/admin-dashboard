"use strict"

App.init();
let form = document.querySelector("form#addProducts");
form.addEventListener("submit", event=>{
    event.preventDefault();
    let id = form.getAttribute("id");
    let method = form.getAttribute("method");
    let action = form.getAttribute("action");

    // Add Products
    let payload = {};
    payload.images = App.filesUpload;
    let formData = App.processForms(id,payload);
    console.log(formData);
    App.form(formData,method,action,'/products/all');
        
})