window.onload = async () => {
  await loadDogDetailSnackProducts();
  await userOnline();
  await initPostCom();
  await insertProductToCart();
  await loadComments();
  await getAllLikes();
};

async function userOnline() {
  const response = await fetch("/user");
  const currenetUser = await response.json();
  if (currenetUser) {
    document.querySelector(".account").innerHTML = `歡迎會員${currenetUser.name}`;
    document.querySelector(".cart").style.display = "block";
    document.querySelector(".logout").style.display = "block";
    document.querySelector(".register").style.display = "none";
    document.querySelector("#commentForm").style.display = "block";
    document.querySelector(".commentconTainer * ").style.display = "block";

    return;
  }
}

const logout = document.querySelector(".logout");
logout.addEventListener("click", async function () {
  const res = await fetch("/logout");
  document.querySelector(".account").innerHTML = `會員登入`;
  document.querySelector(".register").style.display = "block";
  document.querySelector(".cart").style.display = "none";
  document.querySelector(".logout").style.display = "none";
  alert("已成功登出");
});

async function loadDogDetailSnackProducts() {
  const searchParams = new URLSearchParams(location.search);
  console.log(searchParams);
  const id = searchParams.get("id");
  console.log(id);

  const response = await fetch(`/productDetail.html/${id}`);
  const selectedDogFoods = await response.json();

  let htmlSTR = "";

  for (let selectedDogFood of selectedDogFoods) {
    htmlSTR =
      htmlSTR +
      `
        <form id ="${selectedDogFood.id}">
        <div class="card dog outCard" >
        <div class="cardPhotoContainer">

            <img id ="${selectedDogFood.id}"src="./img/product_img/${selectedDogFood.image}" class="card-img-top"  />
        </div>   
        <div class="card-body">

            <h5 class="card-title" name="productName">${selectedDogFood.brand_name},${selectedDogFood.product_name}</h5>       
            <p class="card-text price">$${selectedDogFood.original_price_g}</p>
            <p class="card-text">產品說明：<br><br>${selectedDogFood.description}</p>

            <div class="wightAndSoldContainer">   
            <p class="card-text">重量：${selectedDogFood.weight_g}G</p>
            <p class="card-text sold">售出: ${selectedDogFood.sold}件</p>

            </div>
            <div class="likeContainer">
            <div class="likeInnerContainer">
            <i class="fa-regular fa-heart notActive " onclick='likeFun()' ></i>
        </div>
            <p>讚好人數：<span class="numberOfLike"></span></p>
        </div class="btnCon">
            <button type="button" class="btn btn-primary insert">加入購物車</button>
        </div>
        </div>
        </form>
        `;
    document.querySelector(".productDetailContainer").innerHTML = htmlSTR;
  }
}

let isLike = `<i class="fa-solid fa-heart active"></i>`;
let deleteLike = `<i class="fa-regular fa-heart notActive"></i>`;
let block = "false"; // false is 0 ,

async function likeFun() {
  document.querySelector(".likeInnerContainer").addEventListener("click", async () => {
    const getProductId = new URLSearchParams(location.search);
    const id = getProductId.get("id");

    // 一click 就insert

    if (block == false) {
      const resp = await fetch(`/likeproduct/${id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const likebtn = document.querySelector(".likeInnerContainer");
      likebtn.innerHTML = isLike;

      block = true;
      console.log("insert");
      getAllLikes();
      return;
    }

    const resp2 = await fetch(`/likeproduct/cancel/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
    });
    document.querySelector(".likeInnerContainer").innerHTML = deleteLike;
    block = false;
    getAllLikes()
  });
}


async function getAllLikes() {
  const resp = await fetch(`/alllikeproduct/${id}`);
  const totalLikes = await resp.json();

  document.querySelector(".numberOfLike").innerHTML = totalLikes.like_number;
}

async function insertProductToCart() {
  const addToCartBtn = document.querySelector(".insert");
  addToCartBtn.addEventListener("click", async function () {
    console.log("click");

    const response = await fetch(`/addtocart/${id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("thanks a lot ");
    }

    showCartNumber();
  });
}

async function showCartNumber() {
  const resp = await fetch("/numberOFProductsInCart");
  const showCartNumber = await resp.json();
  console.log(showCartNumber.length);
  let htmlSTR = "";
  htmlSTR =
    htmlSTR +
    `<div class="cartNumber">${showCartNumber.length}</div>
        `;
  document.querySelector(".NumberContainer").innerHTML = htmlSTR;
}

async function initPostCom() {
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const forms = document.querySelector("#commentForm");
  forms.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formObject = {
      content: forms["content"].value,
    };
    console.log(formObject);

    const resp = await fetch(`/comments/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    });

    if (resp.status === 200) {
      await loadComments();
    }
  });
}

const searchParams = new URLSearchParams(location.search);
const id = searchParams.get("id");
console.log(id);

async function loadComments() {
  const resp = await fetch(`/comments/${id}`);
  const comments = await resp.json();
  console.log(comments);

  let html = ``;
  for (const comment of comments) {
    html += `
        <ul class="list-group">
                <li class="list-group-item list-group-item-warning commentPlace">
                <p>${comment.user_name}:</p>
                <p>${comment.content}</p>
    
    
                <i class="fa-solid fa-pen-to-square edit" onclick="editComments(${comment.id},${comment.user_id})"></i>
                <i class="fa-solid fa-delete-left delete" onclick="deleteComments(${comment.id},${comment.user_id})"></i>
                </li>
                </ul>
            `;
  }
  document.querySelector(".commentArea").innerHTML = html;
}

async function editComments(commentID, userID) {
  const editedforms = document.querySelector("#editedForm");
  const edit = await fetch(`/check/`);
  const checker = await edit.json();
  console.log(checker);

  console.log("commentID :" + commentID, "user:" + userID);

  if (userID == checker.user_id) {
    const newEdit = prompt("想修改成甚麼內容？");

    let editComment = {
      content: newEdit,
      id: commentID,
    };
    console.log(editComment);

    const response = await fetch(`/comments`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editComment),
    });
    if (response.status === 200) {
      await loadComments();
    }
  } else {
    alert("人地既野唔好改啦！");
  }
}

async function deleteComments(commentID, userID) {
  const deleteForm = document.querySelector("#commentForm");

  const del = await fetch(`/check/`);
  const checker = await del.json();

  console.log(userID);

  if (userID == checker.user_id) {
    const deleteObject = { id: commentID };

    const resp = await fetch(`/comments/${commentID}`, {
      method: "DELETE",
    });
    if (resp.status === 200) {
      console.log("success");
      await loadComments();
    }
  } else {
    alert("想刪人地留言咁霸道！？我唔比！");
  }
}
