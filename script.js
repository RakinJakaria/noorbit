// Select the search button and input field
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const resultsDiv = document.getElementById('results');

// Initialize a counter for Arabic serial numbers
let arabicSerialNumber = 1;

// Event listener for search button
searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim().toLowerCase();

    // Default to searching all Surahs and using English translation
    const surah = 'all';  // Use 'all' to search all Surahs
    const edition = 'en'; // Use 'en' for English translation

    if (query) {
        // Show loading animation while fetching data
        resultsDiv.innerHTML = '<p>Loading...</p>';

        try {
            // Construct the API URL dynamically based on the input
            const apiUrl = `http://api.alquran.cloud/v1/search/${encodeURIComponent(query)}/${surah}/${edition}`;
            console.log("Requesting API URL: ", apiUrl); // Log URL for debugging
            
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            console.log("API Response Data: ", data.data); // Log response data for debugging

            if (data && data.data && data.data.matches && Array.isArray(data.data.matches)) {
                // Clear previous results
                resultsDiv.innerHTML = '';
                
                // Loop through the matching results and display them
                if (data.data.matches.length > 0) {
                    data.data.matches.forEach(result => {
                        const verseText = result.text;
                        const surahNameEnglish = result.surah.englishName; // Use the English name of the Surah
                        const verseNumber = result.numberInSurah;

                        // Create a div to wrap each verse for styling
                        const verseContainer = document.createElement('div');
                        verseContainer.style.marginBottom = '10px'; // 10px gap between verses

                        // Create a div to hold the Arabic number (in parentheses) and verse text
                        const verseContentContainer = document.createElement('div');
                        verseContentContainer.style.display = 'flex';
                        verseContentContainer.style.alignItems = 'flex-start'; // Align items at the top

                        // Convert the serial number to Arabic numerals
                        const arabicNumeral = convertToArabicNumerals(arabicSerialNumber);

                        // Create a p element for the Arabic numeral inside parentheses (bold)
                        const arabicNumberElement = document.createElement('p');
                        arabicNumberElement.innerHTML = `(<strong>${arabicNumeral}</strong>)`; // Arabic number inside parentheses
                        arabicNumberElement.style.fontSize = '24px'; // Adjust font size
                        arabicNumberElement.style.marginRight = '8px'; // Space between the number and verse text
                        arabicNumberElement.style.marginTop = '0'; // Align number with the top of the verse text

                        // Create a p element for the verse text
                        const verseTextElement = document.createElement('p');
                        verseTextElement.innerHTML = `"${verseText}"`;
                        verseTextElement.style.marginTop = '0'; // Remove top margin
                        verseTextElement.style.marginBottom = '0'; // Remove bottom margin

                        // Append the Arabic number and verse text together
                        verseContentContainer.appendChild(arabicNumberElement);
                        verseContentContainer.appendChild(verseTextElement);

                        // Create a p element for the Surah name and Ayah number (bold and aligned right)
                        const verseDetailsElement = document.createElement('p');
                        verseDetailsElement.innerHTML = `Surah ${surahNameEnglish}, Ayah ${verseNumber}`;
                        verseDetailsElement.style.fontWeight = 'bold'; // Make the verse name and Ayah number bold
                        verseDetailsElement.style.marginTop = '5px'; // 5px gap from the verse text
                        verseDetailsElement.style.marginBottom = '30px'; // 10px gap from the next verse
                        verseDetailsElement.style.textAlign = 'right'; // Align text to the right

                        // Append the verse content and verse details to the verse container
                        verseContainer.appendChild(verseContentContainer);
                        verseContainer.appendChild(verseDetailsElement);

                        // Append the verse container to the results section
                        resultsDiv.appendChild(verseContainer);

                        // Increment the Arabic serial number for the next verse
                        arabicSerialNumber++;
                    });
                } else {
                    resultsDiv.innerHTML = `<p>No results found for "${query}".</p>`;
                }
            } else {
                resultsDiv.innerHTML = `<p>No results found for "${query}".</p>`;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            resultsDiv.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
        }
    } else {
        resultsDiv.innerHTML = `<p>Please enter a keyword.</p>`;
    }
});

// Scroll control with arrow keys
document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowDown") {
        window.scrollBy(0, 100); // Scroll down 100px
    } else if (event.key === "ArrowUp") {
        window.scrollBy(0, -100); // Scroll up 100px
    }
});

// Event listener for Enter key press to trigger search
searchInput.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        searchButton.click(); // Simulate the click of the search button
    }
});

// Function to convert regular numbers to Arabic numerals
function convertToArabicNumerals(num) {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().split('').map(digit => arabicNumerals[parseInt(digit)]).join('');
}



// Select the container
const container = document.querySelector('.container');

// Add event listener for search button
searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim().toLowerCase();

    // Expand the container width
    container.classList.add('expanded');

}); 
