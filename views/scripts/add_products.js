"use strict"

App.init();
// DropZone Implementations
let fileUpload=[];
function uploadFiles(){
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
                    filesUpload.push(resp.message);
                    console.log(filesUpload);
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
}
let form = document.querySelector("form#addProducts");
form.addEventListener("submit", event=>{
    event.preventDefault();
    let id = form.getAttribute("id");
    let method = form.getAttribute("method");
    let action = form.getAttribute("action");

    // Add Products
    let payload = {};
    payload.images = filesUpload;
    let formData = App.processForms(id,payload);
    console.log(formData);
    App.form(formData,method,action,'/products/all');
        
})