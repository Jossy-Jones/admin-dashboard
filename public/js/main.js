'use strict'

const App = (function app(){

    // DropZone Implementations
    let uploadFile = document.querySelector("#uploadFile");
    if (uploadFile) {
        Dropzone.autoDiscover = false;
        let defaultMessage = `<div class="uploadMessage"><img src="/images/image.svg" ><p>Add Product Images<br>(You can add up to 5)</p></div>`;

        let dropzone = new Dropzone(uploadFile, {
            paramName: "image",
            maxFilesize: 2, //MB
            maxFiles: 5, //Number of file allowed
            acceptedFiles: "image/*",
            url: '/api/products/images/add',
            dictDefaultMessage: defaultMessage,
            enctype: "multipart/form-data",


            addRemoveLinks: true,
            // dictRemoveFileConfirmation: "",

            init: function(){
                this.on("sending", (file, xhr, formData) => {

                    // formData.append("images", file);
                    // console.log(formData);
                });
                
                this.on("success", (file, resp) => {
                    console.log(resp);
                });
                this.on('thumbnail', function (file) {
                    if (file.accepted !== false) {
                        if (file.width < 640 || file.height < 480) {
                            file.rejectDimensions();
                        }
                        else {
                            file.acceptDimensions();
                        }
                    }
                });
                this.on("removedfile", (file)=>{
                    this.url = "/api/product/images/remove"
                    console.log(file);
                })
            },
            accept: function (file, done) {
                file.acceptDimensions = done;
                file.rejectDimensions = function () {
                    done('The image must be at least 640 x 480px')
                };
            }
        });
    }

    // Actions Handling
    function actionHandling(data,method,url){
        data = typeof(data) == "object" && data.length > 0 ? data : false;
        method = typeof(method) == "string" && ["post","get","put","delete"].indexOf(method) > -1 ? method.toUpperCase() : "get";
        url = typeof(url) == "string" && url.trim().length > 0 ? url.trim() : false;

        // if(!data) throw new Error("Data must be of OBJECT type!");
        // if(!url) throw new Error("Url must be provided!");

        // Create the AJAX call
        let xhr = new XMLHttpRequest();
        xhr.open(method,url,true);
        xhr.setRequestHeader("Content-type","application/json");
        xhr.send();

        // Handle Response
        xhr.onreadystatechange = () => {
            if(xhr.readyState == XMLHttpRequest.DONE){
                if(xhr.status === 200){
                    let response = JSON.parse(xhr.responseText)
                    toasts('success', response.message);
                } else {
                    toasts('danger', response.message);
                }
            } else {
                // @TODO create a loader and display it
            }
        }
    }

    // Toast Handling
    function toasts(type, message) {
        type = typeof (type) == "string" && ["success", "danger", "neutral"].indexOf(type) > -1 ? type : "neutral";
        message = typeof (message) == "string" && message.trim().length > 0 ? message.trim() : 'No message';

        // Alert Template
        let alertTemplate = document.createElement("div");
        alertTemplate.classList.add(`${type}-toast`);
        alertTemplate.innerHTML = `<p>${message}</p>`;

        if (type && message) {
            // Check alert type
            document.querySelector("body").append(alertTemplate);
        }
        setTimeout(() => {
            document.querySelector("body").removeChild(alertTemplate);
        }, 10000);
    };

    function init() {
        // 
    };

    let publicFunc = {
        init: init,
        toast: toasts,
        action: actionHandling
    };

    return publicFunc;
})()


function deleteProduct(params){
    let formData = new FormData();
    formData.append("productId",params);
    App.action(formData,'delete',`/api/products/${params}/delete`);
    // setInterval(()=>{
    //     window.location.href = "/products/all"
    // }, 1200)
}