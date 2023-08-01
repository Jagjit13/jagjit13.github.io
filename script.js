// nasa_apod.js

// Function to fetch data from the NASA APOD API
function fetchAPODData(apiKey) {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    
    return fetch(url)
        .then((response) => response.json())
        .then((data) => {
            // Update page content with fetched data
            document.getElementById('image').src = data.url;
            document.getElementById('explanation').textContent += data.explanation;
            document.getElementById('date').textContent += data.date;
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

// Replace 'YOUR_API_KEY' with your actual NASA API key
const apiKey = 'eBXa3u6E8R8smTnYAKK2h7neHjayRSSTWqZ81D9X';
fetchAPODData(apiKey);
