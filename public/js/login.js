document.querySelector('#loginForm').addEventListener("submit" , event =>{
    event.preventDefault();
    const loginObj = {
        login:document.querySelector('#login').value,
        password:document.querySelector('#loginPassword').value
    }
    fetch("api/users/login", {
        method:"POST",
        body:JSON.stringify(loginObj),
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

document.querySelector('#signupBtn').addEventListener("click", event =>{
    location.href="/signup"
})