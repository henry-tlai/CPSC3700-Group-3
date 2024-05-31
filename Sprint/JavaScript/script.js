document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const totalItems = carouselItems.length;
    let currentIndex = 0;

    // Function to toggle the search container
    function toggleSearch() {
        const searchContainer = document.querySelector('.search-container');
        searchContainer.classList.toggle('active');
        const searchInput = document.getElementById('search-input');
        if (searchContainer.classList.contains('active')) {
            searchInput.focus();
        }
    }

    // Event listener for the search icon
    document.querySelector('.search-icon').addEventListener('click', toggleSearch);

    // Event listener to close the search input when clicking outside of it
    document.addEventListener('click', function(event) {
        const searchContainer = document.querySelector('.search-container');
        const searchInput = document.getElementById('search-input');
        if (!searchContainer.contains(event.target)) {
            searchContainer.classList.remove('active');
            searchInput.blur();
        }
    });

    // Function to show the slide
    function showSlide(index) {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    // Function to show the next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        showSlide(currentIndex);
    }

    // Function to show the previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        showSlide(currentIndex);
    }

    // Event listeners for the carousel buttons
    document.querySelector('.carousel-button.next').addEventListener('click', nextSlide);
    document.querySelector('.carousel-button.prev').addEventListener('click', prevSlide);

    // Load JSON data dynamically
    fetch('../../JavaScript/mapdata.json')
        .then(response => response.json())
        .then(data => {
            // Initialize Fuse.js with the loaded JSON data
            const fuse = new Fuse(data, {
                keys: ['text'],
                includeScore: true
            });

            // Function to perform fuzzy search
            function performSearch(query) {
                const results = fuse.search(query);
                // Implement code to display search results
                console.log(results);
            }

            // Example: Perform search when input value changes
            document.getElementById('search-input').addEventListener('input', function(event) {
                performSearch(event.target.value);
            });
        })
        .catch(error => console.error('Error loading JSON data:', error));
});
