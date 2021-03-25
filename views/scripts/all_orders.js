"use strict"

App.init();

let view = document.querySelector("input#view");
let viewStyle = "";
view.addEventListener("change", ()=>{
    if(view.checked){
        viewStyle = "grid";
    } else {
        viewStyle = "list";
    }
    App.viewStyle(viewStyle);
})

function deleteOrder(params){
    // console.log(params);
    App.action('delete',`/api/orders/${params}/delete`,'/orders/all');
}