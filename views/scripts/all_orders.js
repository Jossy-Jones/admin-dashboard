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

let sort = document.querySelector("select#sort");
sort.addEventListener("change",(e)=>{
    let val = e.target.value;
    console.log(val);
    window.location = `/orders/all?sort=${val}`;
})

function deleteOrder(params){
    // console.log(params);
    App.action('delete',`/api/orders/${params}/delete`,'/orders/all');
}