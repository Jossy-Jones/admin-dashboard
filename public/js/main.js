'use strict'

const App = (function app(){

    const filesUpload = [];

    // DropZone Implementations
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

    // Actions Handling
    function actionHandling(method,url,dest){
        method = typeof(method) == "string" && ["post","get","put","delete"].indexOf(method) > -1 ? method.toUpperCase() : "get";
        url = typeof(url) == "string" && url.trim().length > 0 ? url.trim() : false;
        dest = typeof(dest) == "string" && dest.trim().length > 0 ? dest.trim() : window.location.href;

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
                    if(response.status === 200){
                        toasts('success', response.message);
                        // setInterval(()=>{
                        //     window.location.href = dest;
                        // }, 1500)
                    } else {
                        toasts('danger', response.message);
                    }
                } else {
                    console.log(xhr.status)
                    toasts('danger', response.message);
                }
            } else {
                // @TODO create a loader and display it
            }
        }
    }

    // Form Handling
    function formHandling(data,method,action,dest=null){
        data = typeof(data) == "object" ? data : false;
        method = typeof(method) == "string" && ["post","get","put","delete"].indexOf(method) > -1 ? method.toUpperCase() : "get";
        action = typeof(action) == "string" && action.trim().length > 0 ? action.trim() : false;
        // dest = typeof(dest) == "string" && dest.trim().length > 0 ? dest.trim() : false;

        if(!data) throw new Error("Data must be of OBJECT type!");
        if(!action) throw new Error("Action must be provided!");

        // Create the AJAX call
        let xhr = new XMLHttpRequest();
        xhr.open(method,action,true);
        xhr.setRequestHeader("Content-type","application/json");
        let payload = JSON.stringify(data);
        xhr.send(payload);

        // Handle Response
        xhr.onreadystatechange = () => {
            if(xhr.readyState == XMLHttpRequest.DONE){
                if(xhr.status === 200){
                    let response = JSON.parse(xhr.responseText)
                    toasts('success', response.message);
                    setInterval(()=>{
                        window.location.href = dest;
                    }, 1500)
                } else {
                    toasts('danger', response.message);
                }
            } else {
                // @TODO create a loader and display it
            }
        }

    }

    // Process Forms
    function processForms(form,payload={}){
        if(form){
            let inputs = [].slice.call(document.forms[form].getElementsByTagName("input"));
            let textareas = [].slice.call(document.forms[form].getElementsByTagName("textarea"));
            let options = [].slice.call(document.forms[form].getElementsByTagName("select"));

            // Inputs types
            inputs.forEach(input=>{
                let name = input.getAttribute("name");
                let value = input.value;
                if(name != "submit"){
                    payload[name] = value;
                }
            })

            // Textareas
            textareas.forEach(textarea=>{
                let name = textarea.getAttribute("name");
                let value = textarea.value;
                if(name != "submit"){
                    payload[name] = value;
                }
            })

            // Select Options
            options.forEach(option=>{
                let name = option.getAttribute("name");
                let value = option.value;
                if(name != "submit"){
                    payload[name] = value;
                }
            })
            console.log(payload);
            return payload;
        } else {
            return false
        }
    }

    // Toast Handling
    function toasts(type, message) {
        type = typeof (type) == "string" && ["success", "danger", "secondary", "primary", "neutral"].indexOf(type) > -1 ? type : "neutral";
        message = typeof (message) == "string" && message.trim().length > 0 ? message.trim() : 'No message';

        // Toast Template
        let toast = document.createElement("div");
        toast.classList.add("toast");
        let toastContainer = document.createElement("div");
        toastContainer.classList.add("toast-container");
        let toastMessage = document.createElement("div");
        toastMessage.classList.add(`${type}-toast`);
        toastMessage.innerHTML = `<p>${message}</p>`;

        if (type && message) {
            // Check if toast container exists
            let toastcontainer = document.querySelector(".toast-container");
            let toasts = document.querySelector(".toast");
            if(document.body.contains(toasts)){
                toastcontainer.append(toastMessage);
                window.navigator.vibrate(500);
                notify(message);
            }else{
                document.querySelector("body").append(toast);
                toast.append(toastContainer);
                toastContainer.append(toastMessage);
                window.navigator.vibrate(500);
                notify(message);
            }
        }
        setTimeout(() => {
            let toast = document.querySelector(".toast")
            let toastContainer = document.querySelector(".toast-container");
            let toastMessages = document.querySelectorAll(".toast-container > [class*='-toast']");
            
            if(toastMessages.length > 1){
                toastContainer.removeChild(toastMessages[0]);
            } else {
                document.querySelector("body").removeChild(toast);
            }
        }, 10000);
    };

    function notify(notice){
        notice = typeof(notice) == "string" && notice.trim().length > 0 ? notice.trim() : false;

        if(notice){
            // Let's check if the browser supports notifications
            if (!(window.Notification)) {
                alert("This browser does not support desktop notification");
            }
    
            // Let's check whether notification permissions have already been granted
            else if (Notification.permission === "granted") {
                // If it's okay let's create a notification
                var notification = new Notification(notice);
            }
    
            // Otherwise, we need to ask the user for permission
            else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(function (permission) {
                // If the user accepts, let's create a notification
                    if (permission === "granted") {
                        var notification = new Notification(notice);
                    }
                });
            }
        } else {
            return false;
        }
    }

    function viewStyle(view){
        view = typeof(view) == "string" && ["list","grid"].indexOf(view) > -1 ? view : "list";
        // Get container
        let container = document.querySelector("div._container[data-style]");
        if(container){
            container.setAttribute("data-style",view)
        }
    }

    function init() {
        // Initialize the upload system
        uploadFiles();
        viewStyle("list");
    };

    let publicFunc = {
        init: init,
        toast: toasts,
        viewStyle: viewStyle,
        action: actionHandling,
        form: formHandling,
        processForms,
        filesUpload
    };

    return publicFunc;
})()
