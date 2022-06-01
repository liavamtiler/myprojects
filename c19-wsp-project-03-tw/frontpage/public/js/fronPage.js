
window.onload =async()=>{
 
    await orderBy() 
    await loadDogSnackProducts()
    await loadHitProduct()
    await loadCatSmackProduct()
    await userOnline()
  

}

async function userOnline (){
    const response = await fetch("/user")
    const currenetUser = await response.json()
    console.log(currenetUser)
    if (currenetUser){
        document.querySelector(".account").innerHTML = `歡迎會員${currenetUser.name}`
        document.querySelector(".cart").style.display = "block"
        document.querySelector(".logout").style.display = "block"
        document.querySelector(".register").style.display = "none"
    }

}

const logout = document.querySelector(".logout")
logout.addEventListener("click",async function( ){
 const res = await fetch("/logout")
  document.querySelector(".account").innerHTML = `會員登入`
  document.querySelector(".register").style.display = "block"
  document.querySelector(".cart").style.display = "none"
  document.querySelector(".logout").style.display = "none"
  alert("已成功登出")
  document.location.href = "/"

})

async function loadProductsDetail(id){
    url = `/productDetail.html?id=${id}`
   document.location.href = url

}


async function loadDogSnackProducts() {
    const response = await fetch("/products/dog")
    const dogProducts = await response.json()

    let htmlSTR=""

    console.log(dogProducts)

    for (let dogProduct of dogProducts) {
        htmlSTR =  htmlSTR + `
        
  
        <div class="card dog outCard"  >
        <img id ="${dogProduct.id}"src="./img/product_img/${dogProduct.image}" class="card-img-top" onclick="loadProductsDetail(${dogProduct.id})" />
        <div class="card-body">
            <div class="titleAndBrandContainer">
            
                  <h5 class="card-title">${dogProduct.product_name}</h5>
                  <p class="brandname">${dogProduct.brand_name}</p>
            
            </div>
                        
            <div class="weightAndPriceContainer">
             
            <p class="weight">${dogProduct.weight_g}G</p>
            <p class="card-text price">  $${dogProduct.original_price_g}  </p>

            </div>

        </div>
        </div>

        `
        document.querySelector(".dogProductContainer").innerHTML = htmlSTR

    }
}

async function loadCatSmackProduct() {
    const response = await fetch("/products/cat")
    const catProducts = await response.json()

    let htmlSTR=""
    
    for (let catProduct of catProducts) {
        htmlSTR =  htmlSTR + `
     
          <div class="card dog outCard"  >
        <img id ="${catProduct.id}"src="./img/product_img/${catProduct.image}" class="card-img-top" onclick="loadProductsDetail(${catProduct.id})" />
        <div class="card-body">
            <div class="titleAndBrandContainer">
            
                  <h5 class="card-title">${catProduct.product_name}</h5>
                  <p class="brandname">${catProduct.brand_name}</p>
            
            </div>
                        
            <div class="weightAndPriceContainer">
             
            <p class="weight">${catProduct.weight_g}G</p>
            <p class="card-text price">  $${catProduct.original_price_g}  </p>

            </div>

        </div>
        </div>
      
        `
        document.querySelector(".catProductContainer").innerHTML = htmlSTR

    }
}

 async function loadHitProduct() {
    const response = await fetch("/hit")
    const products = await response.json()
    
  
  let carHtml=``; 
  for (const product of products){
  carHtml+=/*html*/`
  
  
  <div class="card dog outCard"  >
  <img id ="${product.id}"src="./img/product_img/${product.image}" class="card-img-top" onclick="loadProductsDetail(${product.id})" />
  <div class="card-body">
      <div class="titleAndBrandContainer">
      
            <h5 class="card-title">${product.product_name}</h5>
            <p class="brandname">${product.brand_name}</p>
      
      </div>
                  
      <div class="weightAndPriceContainer">
       
      <p class="weight">${product.weight_g}G</p>
      <p class="card-text price">  $${product.original_price_g}  </p>

      </div>

  </div>
  </div>
  `
  }
  document.querySelector(".hitProductContainer").innerHTML = carHtml;
  }

async function loadProductsDetail(id){
    url = `/productDetail.html?id=${id}`
   document.location.href = url

}


let result='';
async function orderBy() {
const SortForm= document.querySelector("#orderby")  //select the whole form and get the values in it
SortForm.addEventListener('change', async (event)=>{ 
  result= event.target.value
  console.log(result)
  switch (result){ 
    case 'priceToHigh' : 
    productBySort("cat", 'priceToHigh')
     productBySort("dog",'priceToHigh' )
    break; 
    case 'priceToLow': 
     productBySort("cat",'priceToLow' )
     productBySort("dog",'priceToLow' )
    break; 
    case 'popularity': 
     productBySort("cat",'popularity' )
    productBySort( "dog",'popularity' )
    productBySort( "hit",'popularity' )
    default: 
    loadDogSnackProducts()
    loadCatSmackProduct()
    loadHitProduct()
  }

}) }



async function productBySort(target, order) {
  const response = await fetch("/product/sort");
  const results = await response.json();
  const productsOfArray= results.filter(elem=>elem.pet_name== target)


if (order=== 'priceToHigh' ){
  productsOfArray.sort((a,b)=>{return a.original_price_g-b.original_price_g}); 

}else if (order=== 'priceToLow' ){
  productsOfArray.sort((a,b)=>{return b.original_price_g-a.original_price_g}); 
 
}
else if (order=== 'popularity'){ 
  productsOfArray.sort((a,b)=>{return b.sold-a.sold}); 
}
let products= productsOfArray.slice(0,5)
  let htmlSTR = "";
  for (let product of products) {
    htmlSTR =
    htmlSTR +
      `
      <div class="card dog outCard"  >
      <img id ="${product.id}"src="./img/product_img/${product.image}" class="card-img-top" onclick="loadProductsDetail(${product.id})" />
      <div class="card-body">
          <div class="titleAndBrandContainer">
          
                <h5 class="card-title">${product.product_name}</h5>
                <p class="brandname">${product.brand_name}</p>
          
          </div>
                      
          <div class="weightAndPriceContainer">
           
          <p class="weight">${product.weight_g}G</p>
          <p class="card-text price">  $${product.original_price_g}  </p>
    
          </div>
    
      </div>
      </div>
        `;
    document.querySelector(`.${target}ProductContainer`).innerHTML = htmlSTR;
  }
  }

