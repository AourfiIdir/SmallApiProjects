const email_input = document.querySelector('.email');
const password_input = document.querySelector('.password');
const submit_button = document.querySelector('.submit');

async function login() {
    const email = email_input.value.trim();
    const password = password_input.value.trim();

    // Validate input fields
    // 
    // if (email === '' || password === '') {
        // alert('Please fill in all fields');
        // return; // Exit the function early if fields are empty
    // }

    try {
        const response = await fetch('https://reqres.in/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            // Parse the error message from the response
            const errorData = await response.json();
            alert(errorData.error);
        } else {
            // Clear the container and display a welcome message
            const container = document.querySelector('.container');
            container.innerHTML = '';

            const welcome = document.createElement('h1');
            welcome.textContent = 'Welcome to the site!';
            container.appendChild(welcome);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again.');
    }
}

submit_button.addEventListener('click', login);