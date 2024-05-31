document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    // Function to load JSON data
    async function loadJSON(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    // Initialize search functionality
    async function initSearch() {
        const articles = await loadJSON('../../JavaScript/mapdata.json');

        // Initialize Fuse.js
        const fuse = new Fuse(articles, {
            keys: ['text'],
            threshold: 0.3
        });

        // Event listener for search input
        searchInput.addEventListener('input', function () {
            const query = searchInput.value;
            const results = fuse.search(query);

            // Clear previous results
            searchResults.innerHTML = '';

            // Display new results
            if (results.length > 0) {
                results.forEach(result => {
                    const item = document.createElement('div');
                    item.className = 'search-result-item';
                    item.innerHTML = `
                        <h3>${result.item.text}</h3>
                        <a href="${result.item.url}">Read more</a>
                    `;
                    searchResults.appendChild(item);
                });
            } else {
                searchResults.innerHTML = '<p>No results found.</p>';
            }
        });
    }

    // Initialize the search function
    initSearch();

    // Other existing code
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const totalItems = carouselItems.length;
    let currentIndex = 0;

    function toggleSearch() {
        console.log("test");
        const searchContainer = document.querySelector('.search-container');
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            searchInput.focus();
        }
    }

    document.addEventListener('click', function (event) {
        const searchContainer = document.querySelector('.search-container');
        if (!searchContainer.contains(event.target) && !event.target.classList.contains('search-icon')) {
            searchContainer.classList.remove('active');
            searchInput.blur();
        }
    });

    document.querySelector('.search-icon').addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the click event from propagating to the document
        toggleSearch();
    });

    function showSlide(index) {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        showSlide(currentIndex);
    }

    document.querySelector('.carousel-button.next').addEventListener('click', nextSlide);
    document.querySelector('.carousel-button.prev').addEventListener('click', prevSlide);

});
