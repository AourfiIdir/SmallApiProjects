const api = "https://tarmeezacademy.com/api/v1";
const api_posts = "/posts?limit=2";
const api_login = "/login";
setNavBarUi();

async function getPosts() {
    try {
        const response = await fetch(api + api_posts);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const data_posts = data.data;
        console.log(data_posts);

        let postsHTML = ""; // Initialize an empty string to hold all the HTML content

        for (const post of data_posts) {
            postTitle = "";
            if (post.title) {
                postTitle = post.title;
            }
            let tags = "";
            for (let tag of post.tags) {
                document.createElement("span");
                tags += `<span class="badge bg-primary">${tag}</span>`;
            }
            let content = `
        <div class="card shadow my-2">
            <div class="card-header">
            <img src="/socialMediaClone/assets/60111.jpg" alt="" srcset="" style="width: 40px; height: 40px;" class="rounded-5 border-2">
            <b>${post.author.email}</b>
            </div>
            <div class="card-body">
            <img src="/socialMediaClone/assets/postImg.jpg" alt="" srcset="" style="width:100%;height: 300px;">
            <h6 class="" style="color: gray; margin-left: 5px;">${post.created_at}</h6>
            <h5>${postTitle}</h5> <!-- Use post.title or any other property you want to display -->
            <p>${post.body}</p>
            <hr>
            <div class="comment">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-dots-fill" viewBox="0 0 16 16">
                <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                </svg>
                <span>${post.comments_count}</span>
                ${tags}
            </div>
            </div>
        </div>
    `;
            postsHTML += content; // Concatenate the HTML content
        }

        const postsElement = document.getElementById("posts");
        if (!postsElement) {
            console.error("Element with id 'posts' not found!");
            return;
        }
        postsElement.innerHTML = postsHTML; // Append the HTML content to the DOM once

    } catch (e) {
        console.error("There was a problem with the fetch operation:", e); // Log the error
    }
}

// Ensure the function runs only after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    getPosts();
});







async function loginBtnClicked() {
    // Get input values
    let username = document.getElementById("loginUserName").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    // Validate inputs
    if (!username || !password) {
        alert("Please fill all fields");
        return;
    }

    // Prepare data for the request
    let userData = {
        username: username,
        password: password,
    };

    try {


        // Send the login request
        const response = await fetch(api + api_login, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        // Handle the response
        if (!response.ok) {
            // Parse the error response
            showLoginFailMessage();
            const errorData = await response.json();
            alert(errorData.message || "Invalid credentials");
            
            throw new Error("Network response was not ok");
        }
        
        // Parse the success response
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        
        const loginModal = document.getElementById("login");
        const modalInstance = bootstrap.Modal.getInstance(loginModal);
        modalInstance.hide();
        showLoginSuccsseMessage();
        setNavBarUi();
        
        // Redirect or update the UI after successful login
        // Example: window.location.href = "/dashboard";
    } catch (e) {
        console.error("There was a problem with the fetch operation:", e);
        alert("Invalid credentials");

    }
}

function showLoginSuccsseMessage() {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
    }
    appendAlert('login successefully', 'success')
    /*
    const alertTrigger = document.getElementById('liveAlertBtn')
    if (alertTrigger) {
        alertTrigger.addEventListener('click', () => {
            appendAlert('Nice, you triggered this alert message!', 'success')
        })
    }
    */
}
function showLoginFailMessage() {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder2')
    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
    }
    appendAlert('login fail', 'danger')
    /*
    const alertTrigger = document.getElementById('liveAlertBtn')
    if (alertTrigger) {
        alertTrigger.addEventListener('click', () => {
            appendAlert('Nice, you triggered this alert message!', 'success')
        })
    }
    */
}

function logoutBtnClicked(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    setNavBarUi();
}

function setNavBarUi(){
    const result = localStorage.getItem("token");

    const logoutDiv = document.getElementById("logoutDiv");
    const loginDiv = document.getElementById("loginDiv");
    if(result==null){
        loginDiv.style.display = "block";
        logoutDiv.style.setProperty("display", "none","important");
    }else{
        logoutDiv.style.display = "block";
        loginDiv.style.setProperty("display", "none","important");
    }
}


async function registerBtnClicked(){
    let username = document.getElementById("registerUserName").value.trim();
    let email = document.getElementById("registerEmail").value.trim();
    let password = document.getElementById("registerPassword").value.trim();
    let name = document.getElementById("registerName").value.trim();
    if(!username||!email||!password||!name){
        alert("Please fill all fields");
        return;
    }
    let userData = {
        username: username,
        password: password,
        name: name,
        email: email
    }
    try{
        const response  = await fetch(api+"/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        })
        if(!response.ok){
            const errorData = await response.json();
            alert(errorData.message || "Invalid credentials");
            throw new Error("Network response was not ok");
        }
        alert("User registered successfully");
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        document.getElementById("closeRegisterModal").click();

    }catch(e){
        console.error("There was a problem with the fetch operation:", e);
        alert("Invalid credentials");
    }

}