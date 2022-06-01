export async function initPostCom() {

    const forms = document.querySelector("#commentForm")
        forms.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formObject = {
            content: forms["content"].value,
        } 
        console.log(formObject)

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

})}