// Function to fetch data from the REST Countries API
async function fetchCountriesData() {
    try {
        const response = await fetch('https://restcountries.com/v3/all');
        if (!response.ok) {
            throw new Error('Failed to fetch data from the API');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Function to create and populate the country select dropdown
async function populateCountrySelect() {
    const countries = await fetchCountriesData();
    const countrySelect = document.getElementById('country-select');

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.name.common;
        option.textContent = country.name.common;
        countrySelect.appendChild(option);
    });

    // Add event listener to fetch country information when a country is selected
    countrySelect.addEventListener('change', () => {
        const selectedCountry = countrySelect.value;
        fetchCountryInfo(selectedCountry);
    });
}

// Function to fetch and display country information
async function fetchCountryInfo(countryName) {
    const countries = await fetchCountriesData();
    const countryInfo = countries.find(country => country.name.common === countryName);

    if (countryInfo) {
        const countryDetails = `
            <h2>${countryInfo.name.common}</h2>
            <p><strong>Capital:</strong> ${countryInfo.capital}</p>
            <p><strong>Population:</strong> ${countryInfo.population}</p>
            <p><strong>Languages:</strong> ${Object.values(countryInfo.languages).join(', ')}</p>
            <p><strong>Currencies:</strong> ${Object.values(countryInfo.currencies).join(', ')}</p>
            <p><strong>Timezones:</strong> ${countryInfo.timezones.join(', ')}</p>
            <!-- Add more country details here -->
        `;

        document.getElementById('country-info').innerHTML = countryDetails;
    } else {
        document.getElementById('country-info').innerHTML = '<p>Country not found</p>';
    }
}

// Call the function to populate the country select dropdown when the page loads
populateCountrySelect();
