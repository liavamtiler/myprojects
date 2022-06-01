window.onload = async ()=>{
    await loginRegistration()

}



async function loginRegistration () {
  
    const forms = document.querySelector("#admin_register")
    forms.addEventListener("submit",async (event)=>{
        event.preventDefault()
  
        const objectValue = {
            name:forms["admin_name"].value,
            password:forms["admin_password"].value
        }
  
        console.log(objectValue)
  
        const res = await fetch ("/register/admin",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(objectValue)
        })
        if (res.status === 200) {
            console.log("success");
            alert("成功了")
        }
  
    })
  
    
  }