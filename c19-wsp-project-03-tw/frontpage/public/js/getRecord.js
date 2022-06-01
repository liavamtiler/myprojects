window.onload = async () => {
  await userOnline();
  await getRecord();
};

async function userOnline() {
  const response = await fetch("/user");
  const currentUser = await response.json();
  if (currentUser) {
    document.querySelector(".account").innerHTML = `歡迎會員${currentUser.name}`;
    document.querySelector(".cart").style.display = "block";
    document.querySelector(".logout").style.display = "block";
    document.querySelector(".register").style.display = "none";
    return;
  }
}

async function getRecord() {
  const resp = await fetch("/shoppingHistory");
  const records = await resp.json();
  console.log(records);

  let htmlSTR = "";
  for (let record of records) {
    htmlSTR =
      htmlSTR +
      `
      
      <div class="card dog outCard" >
      <img id ="${record.id}"src="./img/product_img/${record.image}" class="card-img-top" onclick="loadProductsDetail(${record.id})"  />
      <div class="card-body">
          <h5 class="card-title">${record.product_name}</h5>
          <p class="card-text">$${record.original_price_g}</p>

      </div>
      </div>
      `;
    document.querySelector(".record").innerHTML = htmlSTR;
  }
}

async function loadProductsDetail(id) {
  url = `/productDetail.html?id=${id}`;
  document.location.href = url;
}
