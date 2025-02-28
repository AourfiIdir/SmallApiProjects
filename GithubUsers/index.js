// script.js
const space = document.querySelector('.space');

// Function to create a star
function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');

  // Randomize star position
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  star.style.left = `${x}px`;
  star.style.top = `${y}px`;

  // Randomize star size and animation duration
  const size = Math.random() * 3 + 1; // Size between 1px and 4px
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  const duration = Math.random() * 2 + 1; // Animation duration between 1s and 3s
  star.style.animationDuration = `${duration}s`;

  space.appendChild(star);
}

// Create multiple stars
for (let i = 0; i < 200; i++) {
  createStar();
}

// Function to animate stars moving
function moveStars() {
  const stars = document.querySelectorAll('.star');
  stars.forEach(star => {
    let x = parseFloat(star.style.left);
    let y = parseFloat(star.style.top);

    // Move stars diagonally
    x += 0.5; // Adjust speed by changing this value
    y += 0.5;

    // Reset star position if it goes off-screen
    if (x > window.innerWidth) x = 0;
    if (y > window.innerHeight) y = 0;

    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
  });

  requestAnimationFrame(moveStars);
}

// Start the animation
moveStars();


const api = "https://api.github.com/users/";

const email = document.querySelector(".email");
const login = document.querySelector(".login");
const id = document.querySelector(".id");
const public_repos = document.querySelector(".public_repos");
const followers = document.querySelector(".followers");
const following = document.querySelector(".following");
const created_at = document.querySelector(".created_at");
const updated_at = document.querySelector(".updated_at");
const bio = document.querySelector(".bio");
const loading = document.getElementById("loading");

async function getInfo() {
  const input = document.getElementById("input");
  const username = input.value.trim();

  if (!username) {
    alert("Please enter a valid username");
    return;
  }

  // Show loading state
  loading.style.display = "block";

  try {
    const response = await fetch(api + username);
    if (!response.ok) {
      throw new Error("User not found");
    }
    const data = await response.json();

    // Update the DOM with user data
    email.innerHTML = data.email || "N/A";
    login.innerHTML = data.login || "N/A";
    id.innerHTML = data.id || "N/A";
    public_repos.innerHTML = data.public_repos || "N/A";
    followers.innerHTML = data.followers || "N/A";
    following.innerHTML = data.following || "N/A";
    created_at.innerHTML = formatDate(data.created_at) || "N/A";
    updated_at.innerHTML = formatDate(data.updated_at) || "N/A";
    bio.innerHTML = data.bio || "N/A";
  } catch (err) {
    console.error(err);
    alert("Failed to fetch user data. Please check the username and try again.");
  } finally {
    // Hide loading state
    loading.style.display = "none";
  }
}

// Helper function to format dates
function formatDate(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

document.getElementById("submit").addEventListener("click", getInfo);
