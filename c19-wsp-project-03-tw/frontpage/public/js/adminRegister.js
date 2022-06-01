window.onload = async () => {
  await loginRegistration();
};

async function loginRegistration() {
  const forms = document.querySelector("#admin_register");
  forms.addEventListener("submit", async (event) => {
    event.preventDefault();

    const objectValue = {
      name: forms["admin_name"].value,
      password: forms["admin_password"].value,
    };

    const res = await fetch("/register/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectValue),
    });
    if (res.status === 200) {
      alert("成功了");
    }
  });
}
