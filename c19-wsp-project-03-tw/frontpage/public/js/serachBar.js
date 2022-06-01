window.onload =async ()=>{
    await getSearchResult()
    await userOnline ()

}

async function userOnline (){
    const response = await fetch("/user")
    const currenetUser = await response.json()
    if (currenetUser){
        document.querySelector(".account").innerHTML = `歡迎會員${currenetUser.name}`
        document.querySelector(".cart").style.display = "block"
        document.querySelector(".logout").style.display = "block"
        document.querySelector(".register").style.display = "none"
        return 
    }

}


async function getSearchResult(){

    const getSearchKey = new URLSearchParams(location.search)
    // console.log(searchParams)
    const key = getSearchKey.get("title")
    console.log("the key is " +key)

    const response = await fetch(`/searchResult/${key}`)
    const selectedResults = await response.json()
    const totalResultNumber = selectedResults.length

    let resultHtml = ""
    for (let selectedResult of selectedResults) {
        resultHtml += `
        
        <div class="card dog outCard"  >
        <img id ="${selectedResult.id}"src="./img/product_img/${selectedResult.image}" class="card-img-top" onclick="loadProductsDetail(${selectedResult.id})" />
        <div class="card-body">
            <div class="titleAndBrandContainer">
            
                  <h5 class="card-title">${selectedResult.product_name}</h5>
                  <p class="brandname">${selectedResult.brand_name}</p>
            
            </div>
                        
            <div class="weightAndPriceContainer">
             
            <p class="weight">${selectedResult.weight_g}G</p>
            <p class="card-text price">  $${selectedResult.original_price_g}  </p>

            </div>

        </div>
        </div>
        `
    }

    document.querySelector(".resultContainer").innerHTML = resultHtml
    document.querySelector(".productNumber").innerHTML = totalResultNumber
}


    
async function loadProductsDetail(id){
    url = `/productDetail.html?id=${id}`
   document.location.href = url

}
