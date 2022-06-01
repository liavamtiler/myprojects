window.onload = async () => {
  await loadPurchasingProduct();
};

async function removeItem(id) {
  const resp = await fetch(`/delete/${id}`, {
    method: "DELETE",
  });

  if (resp.status === 200) {
    await loadPurchasingProduct();
  }
}

async function loadPurchasingProduct() {
  const response = await fetch("/getpurchasing-item");
  const purchasingProducts = await response.json();

  let purchaseSTR = "";
  let totalPrice = 0;

  for (let purchasingProduct of purchasingProducts) {
    purchaseSTR =
      purchaseSTR +
      `
  
          <div class="card" >
              <img src="./img/product_img/${purchasingProduct.image}" class="card-img-top"  />
              <div class="card-body">
                  <h5 class="card-title">${purchasingProduct.product_name}</h5>
                  <p class="card-text">$${purchasingProduct.original_price_g}</p>
              </div>

              <i class="fa-solid fa-xmark" id='idName' class='hello' onclick="removeItem(${purchasingProduct.id})"></i>
              
          </div>
          
  
          `;
    totalPrice += purchasingProduct.original_price_g;
  }
  document.querySelector(".purchaseContainer").innerHTML = purchaseSTR;
  document.querySelector(".totalPrice").innerHTML = `總計：${totalPrice}元`;
}

async function getCart() {
  const resp = await fetch("/numberOFProductsInCart");
  const cartProduct = await resp.json();
  for (let productInCart of cartProduct) {
    let productName = productInCart.product_name;
    const response = await fetch(`/updateProductSold/${productName}
      `);
  }
}

async function clickPaymentButton() {
  await getCart();
  const resp = await fetch("/purchaseHistory");
  const history = await resp.json();
  alert(history.Message);
  window.location.replace("../index.html");
}
