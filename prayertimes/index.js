const api = "https://api.aladhan.com/v1/timingsByCity";

const fajr_text = document.getElementById("fajr");
const dhuhr_text = document.getElementById("dhuhr");
const asr_text = document.getElementById("asr");
const maghrib_text = document.getElementById("maghrib");
const isha_text = document.getElementById("isha"); // Corrected variable name
const date_container = document.getElementById("date_container");

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Format MM
const day = String(currentDate.getDate()).padStart(2, "0");        // Format DD

async function getPrayerTimes() {
    const city = document.getElementById("city").value.trim();
    const country = document.getElementById("country").value.trim();

    // Check if fields are not empty
    if (!city || !country) {
        alert("Please enter a city and country.");
        return;
    }

    // Construct the API URL
    const url = `${api}/${day}-${month}-${year}?city=${city}&country=${country}`;
    console.log("API URL:", url);

    try {
        // Call the API
        const result = await fetch(url);
        if (!result.ok) {
            throw new Error(`HTTP error: ${result.status}`);
        }
        const data = await result.json();

        console.log("API Data:", data);

        // Check if the result is valid
        if (data.code === 200) {
            // Update the display
            const timings = data.data.timings;
            fajr_text.innerText = timings.Fajr;
            dhuhr_text.innerText = timings.Dhuhr;
            asr_text.innerText = timings.Asr;
            maghrib_text.innerText = timings.Maghrib;
            isha_text.innerText = timings.Isha; // Corrected variable name
            date_container.innerText = `${day}-${month}-${year}`;
        } else {
            console.error("API Error:", data.status);
            alert("Failed to fetch prayer times. Please check your inputs.");
        }
    } catch (err) {
        console.error("API Call Error:", err);
        alert("An error occurred while fetching prayer times. Please try again.");
    }
}

// Add event listener for the Submit button
const submit = document.querySelector(".submit");
submit.addEventListener("click", getPrayerTimes);
