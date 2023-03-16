document.querySelector('#signupForm').addEventListener("submit" , event =>{
    event.preventDefault();
    const signUpObj = {
        username:document.querySelector('#signupUsername').value,
        email:document.querySelector('#signupEmail').value,
        password:document.querySelector('#signupPassword').value
    }
    fetch("api/users", {
        method:"POST",
        body:JSON.stringify(signUpObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href="/homepage"
        } else {
            alert("something went wrong")
        }
    })
})