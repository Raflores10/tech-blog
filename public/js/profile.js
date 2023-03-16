document.querySelector("#postForm").addEventListener("submit", event => {
    event.preventDefault();
    const postObj = {
        title: document.querySelector("#postTitle").value,
        post: document.querySelector("#postInput").value
    }
    fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(postObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.href = "/profile"
        } else {
            alert("something went wrong")
        }
    })
})

document.querySelectorAll(".delBtn").forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.getAttribute("post-id")
        fetch(`/api/posts/${id}`, {
            method: "DELETE"
        }).then(res => {
            if (res.ok) {
                location.href = "/profile"
            } else {
                alert("something went wrong")
            }
        })
    })
})

document.querySelectorAll(".commentBtn").forEach(btn => {
    btn.addEventListener("click", () => {

        btn.style.display = "none";

        let commentForm = document.createElement("form");
        commentForm.setAttribute("class", "commentForm")
        let commentInput = document.createElement("textarea");
        let submitBtn = document.createElement("button");
        submitBtn.textContent = "Submit";
        let exitBtn = document.createElement("button");
        exitBtn.textContent = "Exit";

        exitBtn.addEventListener("click", event => {
            event.preventDefault()
            commentForm.remove()
            btn.style.display = "inline";
        })

        submitBtn.addEventListener("click", event => {
            event.preventDefault()
            commentForm.remove()
            btn.style.display = "inline";
            const commentObj = {
                PostId: btn.getAttribute("data-id"),
                comment: commentInput.value
            }
            fetch("/api/comments", {
                method: "POST",
                body: JSON.stringify(commentObj),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                if (res.ok) {
                    location.href = "/profile"
                } else {
                    alert("something went wrong")
                }
            })
        })

        commentForm.appendChild(commentInput);
        commentForm.appendChild(submitBtn);
        commentForm.appendChild(exitBtn);
        btn.parentElement.append(commentForm)

    })
})

document.querySelectorAll(".seeBtn").forEach(btn => {
    btn.addEventListener("click", () => {

        btn.style.display = "none";

        let closeBtn = document.createElement("button");
        closeBtn.textContent = "Close";

        closeBtn.addEventListener("click", event => {
            event.preventDefault();
            closeBtn.remove();
            allCommentDiv.remove();
            btn.style.display = "inline";
        })

        const allCommentDiv = document.createElement("div");

        const postId = btn.getAttribute("data-id")
        fetch(`/api/comments/bypost/${postId}`, {
            method: "get"
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data);
            data.Comments.forEach(comment => {
                const dateData = dayjs(comment.createdAt).format("MMM DD YYYY")
                const username = document.createElement("h4");
                username.textContent = comment.User.username + " posted on " + dateData;

                const commentText = document.createElement("p");
                commentText.textContent = comment.comment;

                const commentDiv = document.createElement("div");

                commentDiv.appendChild(username);
                commentDiv.appendChild(commentText);

                allCommentDiv.append(commentDiv)
            })
        }).catch(err => {
            console.log(err);
        })

        btn.parentElement.append(closeBtn)
        btn.parentElement.append(allCommentDiv)

    })
})

document.querySelectorAll(".editBtn").forEach(btn => {
    btn.addEventListener("click", () => {
        const original = btn.nextElementSibling.innerHTML
        console.log(original);
        if (btn.textContent === "Edit") {
            btn.textContent = "X"
            const textarea = document.createElement("textarea")
            textarea.innerHTML = original
            textarea.setAttribute("id", "text")
            btn.nextElementSibling.replaceWith(textarea)

            const submitBtn = document.createElement("button")
            submitBtn.innerHTML = "Update"
            submitBtn.setAttribute("class", "updateBtn")
            btn.parentElement.append(submitBtn)

            submitBtn.addEventListener("click", () => {
                const postId = btn.getAttribute("data-id")
                fetch(`/api/posts/${postId}`, {
                    method: "PUT",
                    body: JSON.stringify({ post: document.getElementById("text").value }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(res => {
                    if (res.ok) {
                        location.href = "/profile"
                    } else {
                        alert("something went wrong")
                    }
                })
            })
        } else {
            location.reload()
        }
    })
})