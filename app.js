//body styling starts here
document.body.style.backgroundColor = "#eeeeee";
document.body.style.marginTop = "100px";
document.body.style.marginBottom = "100px";
document.body.style.padding = "0px";
document.body.style.overflowX = "hidden";
//body styling ends here

//container section starts here
let container = document.createElement("div");
container.classList.add("container");
document.body.appendChild(container);
container.style.width = "80%";
container.style.height = "auto";
container.style.backgroundColor = "white";
container.style.margin = "0 auto";
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.justifyContent = "center";
container.style.alignItems = "center";
//container section ends here

//title sction starts here
let title = document.createElement("h1");
title.classList.add("title");
container.appendChild(title);
title.innerHTML = "products Near You";
title.style.color = "#9c1154";
//title sction ends here

//products section starts here
let productsSection = document.createElement("div");
productsSection.classList.add("productsSection");
container.appendChild(productsSection);
productsSection.style.width = "80%";
productsSection.style.height = "auto";
productsSection.style.margin = "30px";
productsSection.style.padding = "30px";
productsSection.style.border = ".5px solid #eeeeee";
productsSection.style.display = "flex";
productsSection.style.flexDirection = "row";
productsSection.style.justifyContent = "start";
productsSection.style.alignItems = "center";
productsSection.style.flexWrap = "wrap";
productsSection.innerHTML = "products section";
//products section ends here

//fetching processes starts here - URL link: https://61bf323ab25c3a00173f4cff.mockapi.io/products
//GET - starts here
function getProductsFunc() {
    fetch('https://61bf323ab25c3a00173f4cff.mockapi.io/products', {
        method: "GET",
    })
        .then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            let productCard = data.map(products => {
                return `
                <div class="card" onmouseover="changeColor(this)" onmouseout="normal(this)""> 
                        <img style="width:140px; height:140px;" src="${products.image}"/>
                        <p>${products.id}</p>
                        <p>${products.name}</p>
                        <p style="color:green;"> ${products.price} </p>
                        <button style="background-color:#eeeeee; width: 190px; height:30px; color:#444444; box-shadow:3px 3px 3px 0px rgba(227,222,222,0.75); cursor:pointer; border:none;" onclick="deleteOneProductsFunc(${products.id})" class="someText"> DELETE </button>
                        <button style="margin-top:5px;background-color:#eeeeee; width: 190px; height:30px; color:#444444; box-shadow:3px 3px 3px 0px rgba(227,222,222,0.75); cursor:pointer; border:none;" onclick="updateOneProductsFunc(${products.id})" class="someText"> UPDATE </button>
                </div>`
            })
            document.querySelector(".productsSection").innerHTML = productCard;  //use query selector instead of getelement by class name all the time to prevent any problem
            //Why I had an error when I I used getElementByClassName
            Object.values(document.getElementsByClassName("card")).map(el => {
                el.style.minWidth = "20%"
                el.style.height = "auto"
                el.style.border = ".5px solid #eeeeee"
                el.style.margin = "10px"
                el.style.padding = "10px"
                el.style.display = "flex"
                el.style.flexDirection = "column"
                el.style.justifyContent = "center"
                el.style.alignItems = "center"
                el.style.boxShadow = "3px 3px 3px 0px rgba(227,222,222,0.75)"
                el.style.boxShadow = "3px 3px 3px 0px rgba(227,222,222,0.75)"
                el.style.backgroundColor = "#ffffff";
            })

        }).catch(error => Error("Error!!"))
}

function normal(x) {
  x.style.backgroundColor = "white";
  x.style.boxShadow = "3px 3px 3px 0px rgba(227,222,222,0.75)";
  }
  
  function changeColor(x) {
    x.style.backgroundColor = "#fffffe";
    x.style.cursor = "pointer";
    x.style.boxShadow = "6px 6px 6px 6px rgba(227,222,222,0.75)";
  }


getProductsFunc();
//GET - ends here

//POST - starts here
function postProductsFunc() {
    fetch('https://61bf323ab25c3a00173f4cff.mockapi.io/products', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                "name": "morpheus",
                "price": "55"
            }),
    }).then(response => { return response.json() })
        .then(data => {
            getProductsFunc();
            return postProducts = `
                     <div class="card"> 
                       <p>${data.name}</p>
                       <p style="color:green;">${data.price}</p>
                     </div>`
                     
        }
        ).catch(error => Error("this is unknown error"))
}
//POST - ends here


//PUT - starts here
function updateProductsFunc() {
    fetch('https://61bf323ab25c3a00173f4cff.mockapi.io/products/10', {  //how to update more than one element at once???????????
        method: "PUT",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(
            {
                "id": "4",
                "name": "tshirt",
                "price": "99",
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkFS7HZXhRstpR6GiUr5RANfYgN2luGtag0g&usqp=CAU"
            }
        )

    })
        .then(response => response.json())
        .then(data => {
            getProductsFunc();
            console.log(data);
        })
}

function updateOneProductsFunc() {
    fetch(`https://61bf323ab25c3a00173f4cff.mockapi.io/products/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(
            {
                "id": "3",
                "name": "bv",
                "price": "99",
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkFS7HZXhRstpR6GiUr5RANfYgN2luGtag0g&usqp=CAU"
            }
        )

    })
        .then(response => response.json())
        .then(() => getProductsFunc())
    
    }
//PUT - ends here

//DELETE - starts here
function deleteProductsFunc() {
    fetch("https://61bf323ab25c3a00173f4cff.mockapi.io/products/10", {
        method: "DELETE",
    }).then(response => response.json())
        .then(() => getProductsFunc())
        .catch(error => Error(error))
}

function deleteOneProductsFunc(id) {
    fetch(`https://61bf323ab25c3a00173f4cff.mockapi.io/products/${id}`, {
        method: "DELETE"
    }).then(response => {
        return response.json();
    }).then(() => getProductsFunc())
}
//DELETE - ends here
//fetching processes ends here - URL link: https://61bf323ab25c3a00173f4cff.mockapi.io/products

//buttons section starts here
let buttonsSection = document.createElement("div");
buttonsSection.classList.add("buttonsSection");
container.appendChild(buttonsSection);
buttonsSection.style.width = "100%";
buttonsSection.style.height = "100px";
buttonsSection.style.display = "flex";
buttonsSection.style.flexDirection = "row";
buttonsSection.style.justifyContent = "center";
buttonsSection.style.boxShadow = "5px 5px 5px 0px rgba(222,222,222,0.75)";
buttonsSection.style.alignItems = "center";
//buttons section ends here

//buttons creation starts here
//Get products starts here
let getProducts = document.createElement("button");
getProducts.classList.add("getProducts");
buttonsSection.appendChild(getProducts);
getProducts.style.width = "120px";
getProducts.style.height = "45px";
getProducts.style.backgroundColor = "#9c1154";
getProducts.innerHTML = "get Products";
getProducts.style.color = "#fff";
getProducts.style.margin = "20px";
getProducts.style.border = "none";
getProducts.style.cursor = "pointer";
getProducts.style.boxShadow = "5px 5px 5px 0px rgba(222,222,222,0.75)";
//Get products ends here

//Post products starts here
let postProducts = document.createElement("button");
postProducts.classList.add("postProducts");
buttonsSection.appendChild(postProducts);
postProducts.style.width = "120px";
postProducts.style.height = "45px";
postProducts.style.backgroundColor = "#9c1154";
postProducts.innerHTML = "post Products";
postProducts.style.color = "#fff";
postProducts.style.margin = "20px";
postProducts.style.border = "none";
postProducts.style.cursor = "pointer";
postProducts.style.boxShadow = "5px 5px 5px 0px rgba(222,222,222,0.75)";
postProducts.addEventListener('click', postProductsFunc);
//Post products ends here

//Update products starts here
let updateProducts = document.createElement("button");
updateProducts.classList.add("updateProducts");
buttonsSection.appendChild(updateProducts);
updateProducts.style.width = "120px";
updateProducts.style.height = "45px";
updateProducts.style.backgroundColor = "#9c1154";
updateProducts.innerHTML = "update Products";
updateProducts.style.color = "#fff";
updateProducts.style.margin = "20px";
updateProducts.style.border = "none";
updateProducts.style.boxShadow = "10px 10px 5px 0px rgba(222,222,222,0.75)";
updateProducts.style.cursor = "pointer";
updateProducts.addEventListener('click', updateProductsFunc);
//Post products ends here

//Delete products starts here
let deleteProducts = document.createElement("button");
updateProducts.classList.add("deleteProducts");
buttonsSection.appendChild(deleteProducts);
deleteProducts.style.width = "120px";
deleteProducts.style.height = "45px";
deleteProducts.style.backgroundColor = "#9c1154";
deleteProducts.innerHTML = "delete Products";
deleteProducts.style.color = "#fff";
deleteProducts.style.margin = "20px";
deleteProducts.style.border = "none";
deleteProducts.style.boxShadow = "10px 10px 5px 0px rgba(222,222,222,0.75)";
deleteProducts.style.cursor = "pointer";
deleteProducts.addEventListener('click', deleteProductsFunc);
//Delete products ends here
//buttons creation ends here