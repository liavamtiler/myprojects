window.onload = async () => {
  await adminLogin();
};

async function adminLogin() {
  const forms = document.querySelector("#admin_login");

  forms.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formValue = {
      name: forms["admin_name"].value,
      password: forms["admin_password"].value,
    };

    const res = await fetch("/login/admin", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formValue),
    });
    if (res.status === 200) {
      alert("已成功登入");
      window.location.href = "/teckypet_manage_board.html";
    }
  });
}
