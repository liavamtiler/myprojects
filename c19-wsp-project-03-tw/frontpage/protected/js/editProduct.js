window.onload=async function (){
    await getproductNameAndID() 
    await selectedProduct()
   
}

async function getproductNameAndID() {
    const forms = document.querySelector("#edit-Product-form")
    
    const response = await fetch ("/product/sort/")
    const products  =await response.json()

    let productName=""
    for(let product of products){
        productName = productName+ `       
        <option value="${product.id}" >${product.id}: ${product. product_name}</option>                   
        `    
       
    }
    document.querySelector("#chooseProduct").innerHTML=productName

    

}

async function selectedProduct(){
  
    const forms = document.querySelector("#edit-Product-form")
    forms.addEventListener("submit", async (event) => {
      event.preventDefault();

    const selectedProductID =forms["chooseProduct"].value
    console.log(selectedProductID)

    const fetchProduct = await fetch (`/productDetail.html/${selectedProductID}`)
    const getproduct = (await fetchProduct.json())[0]
    
    console.log(getproduct)

    let htmlstr = ""

    

    htmlstr += `
    
    <p>${getproduct.product_name}</p>
    <p>${getproduct.original_price_g}</p>
    <p>${getproduct.weight_g}</p>
    <p>${getproduct.description}</p>
    <p>${getproduct.pet_name}</p>
    <img src="./img/product_img/${getproduct.image}">
    <p>${getproduct.pet_name}</p>
    <p>${getproduct.sold}</p>
    <p>${getproduct.brand_name}</p>
    <p>${getproduct.is_active}</p>
    
    `

    document.querySelector(".pre-edit-product").innerHTML = htmlstr

})}