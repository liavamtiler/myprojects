window.onload = async function () {
  await getProductNameAndID();
  await selectedProduct();
};

async function getProductNameAndID() {
  const forms = document.querySelector("#edit-Product-form");

  const response = await fetch("/product/sort/");
  const products = await response.json();

  let productName = "";
  for (let product of products) {
    productName =
      productName +
      `       
        <option value="${product.id}" >${product.id}: ${product.product_name}</option>                   
        `;
  }
  document.querySelector("#chooseProduct").innerHTML = productName;
}

async function selectedProduct() {
  const forms = document.querySelector("#edit-Product-form");
  forms.addEventListener("submit", async (event) => {
    event.preventDefault();

    const selectedProductID = forms["chooseProduct"].value;

    const fetchProduct = await fetch(`/productDetail.html/${selectedProductID}`);
    const getProduct = (await fetchProduct.json())[0];

    let htmlStr = "";

    htmlStr += `
    
    <p>${getProduct.product_name}</p>
    <p>${getProduct.original_price_g}</p>
    <p>${getProduct.weight_g}</p>
    <p>${getProduct.description}</p>
    <p>${getProduct.pet_name}</p>
    <img src="./img/product_img/${getProduct.image}">
    <p>${getProduct.pet_name}</p>
    <p>${getProduct.sold}</p>
    <p>${getProduct.brand_name}</p>
    <p>${getProduct.is_active}</p>
    
    `;

    document.querySelector(".pre-edit-product").innerHTML = htmlStr;
  });
}
