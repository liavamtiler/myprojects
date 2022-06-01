window.onload = async ()=>{

  await createNewUser()
}



async function createNewUser() {
  const forms = document.querySelector("#registrationForm");
  console.log(forms);
  forms.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newUserValue = {
      name: forms["name"].value,
      password: forms["password"].value,
      date_of_birth: forms["date_of_birth"].value,
      gender: forms["gender"].value,
    };

    console.log(newUserValue);
    const response = await fetch("/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserValue),
    });

    if (response.status === 200) {
      console.log("success");
      alert("成功了")
      window.location.replace("/")
      return;
    }
    if (response.status === 400) {
      alert("請填寫所有表格。");
      return;
    }

    if (response.status === 401) {
      alert("密碼或帳號不符合長度或規格");
      return;
    }
    if (response.status === 406) {
      alert("年紀太少，不能注冊");
      return;
    }
    if (response.status === 409) {
      alert("帳號已有人使用");
      return;
    }
  });
}




