window.onload = () => {
  initLoginForm();
};

 async function initLoginForm() {
  const loginForm = document.querySelector("#form-login");
  console.log(loginForm);
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formObject = {
      username: loginForm["username"].value,
      password: loginForm["password"].value,
    };
    console.log(formObject);

    const resp = await fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    });

    if (resp.status === 200) {
      alert("success");
      isLogin =true
       window.location.href = "/";
    }

    if (resp.status === 401) {
      alert("invalid password or username");
    }
  });
}
