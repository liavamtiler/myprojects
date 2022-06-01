window.onload =async()=>{
    addnewProduct()
}

async function addnewProduct(){
    const forms = document.querySelector("#add-product-form") 
    console.log(forms)

    forms.addEventListener("submit",async (event)=>{
        event.preventDefault()
    
        const formData = new FormData()

        formData.append("newProductName",forms["newProductName"].value);
        formData.append("brandName",forms["brandName"].value);
        formData.append("originalPrice",forms["originalPrice"].value)
        formData.append("weight",forms["weight"].value)        
        formData.append("description",forms["description"].value)
        formData.append("product_image",forms["product_image"].files[0])
        formData.append("animalType",forms["animalType"].value)
        formData.append("soldNumber",forms["soldNumber"].value)

        console.log(formData)

        const response = await fetch("/add-product",{
            method:"POST",
            body:formData
        })
        
        if (response.status===200) {
            alert("成功")
            console.log(result)
    
        }
    

    })
}