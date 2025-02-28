/*
let request = new XMLHttpRequest();
request.open('GET', 'https://jsonplaceholder.typicode.com/users');
request.responseType = 'json';
request.send();
request.onload = function () {
    let users = request.response;
    for(let user of users) {
        let btn = document.createElement('button');
        btn.id = user.id;
        btn.innerText = user.name+user.email;
        btn.addEventListener('click', HandleUserClick(user.id))
        document.getElementById('users').appendChild(btn);
    }
}

function HandleUserClick(id) {
    let request2 = new XMLHttpRequest();
    request2.open('GET', 'https://jsonplaceholder.typicode.com/posts/');
    request2.responseType = 'json';
    request2.send();
    request2.onload = function () {
        let posts = request2.response;
        for(let post of posts){
            if(post.id === id){
                document.getElementById('posts').innerText = post.body;
            }
        }
    }
}
*/
const api = "https://jsonplaceholder.typicode.com/";

async function fetchUsers() {
    let response = await fetch(api + "users");
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    try {
        let users = await response.json();
        let usersField = document.getElementsByClassName('users')[0];
        for (let user of users) {
            let btn = document.createElement('button');
            btn.id = user.id;
            btn.innerText = user.name + " - " + user.email;
            btn.addEventListener('click', () => HandleUserClick(user.id)); // Fixed event listener
            usersField.appendChild(btn);
        }
    } catch (error) {
        console.error(error);
    }
}

window.onload = fetchUsers;

async function HandleUserClick(userId) {
    let response2 = await fetch(api + "posts");
    if (!response2.ok) {
        throw new Error(`HTTP error! status: ${response2.status}`);
    }
    let posts = await response2.json();
    let postsField = document.getElementsByClassName('posts')[0];
    postsField.innerHTML = ''; // Clear previous posts

    for (let post of posts) {
        if (post.userId === userId) { // Filter by userId
            let card = document.createElement('p');
            card.innerText = post.body;
            card.id = "card";
            postsField.appendChild(card); // Append each post to the container
        }
    }
}

