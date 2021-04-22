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
    window.location = `/products/all?sort=${val}`;
})

function deleteProduct(params){
    // console.log(params);
    App.action('delete',`/api/products/${params}/delete`,'/products/all');
}

// Add button scroll effects
let add = document.querySelector("#add-btn");
let container = document.querySelector("main");
if(add){
    let current = container.offsetHeight;
    container.addEventListener("scroll", (e)=>{
        let scroll =  container.scrollTop;
        let height = container.scrollHeight;
        if(scroll != 0 && height != (scroll+current)){
            add.style.opacity="1";
            add.style.visibility="visible";
        } else if(scroll == 0 || height == (scroll+current)) {
            add.style.opacity="0";
            add.style.visibility="hidden";
        }
    })
}