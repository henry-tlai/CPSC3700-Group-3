document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Content Loaded");
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const totalItems = carouselItems.length;
    let currentIndex = 0;

    let isSearchActive = false; // Initialize boolean variable to track search state

    function toggleSearch() {
        console.log("Toggle search function called");
        const searchContainer = document.querySelector('.search-container');
        const searchInput = document.getElementById('search-input');
        
        if (!isSearchActive) {
            console.log("Search container is activated");
            searchContainer.style.display = "block"; // Set display to block
            searchInput.focus();
        } else {
            console.log("Search container is deactivated");
            searchContainer.style.display = "none"; // Set display to none
            searchInput.blur();
        }
        
        isSearchActive = !isSearchActive; // Toggle search state
    }
    
    

    const searchIcon = document.querySelector('.search-icon');
    console.log("Search icon found:", searchIcon);
    
    searchIcon.addEventListener('click', () => {
        console.log("Search icon clicked");
        toggleSearch();
    });
    
    document.addEventListener('click', function(event) {
        console.log("Document clicked");
        const searchContainer = document.querySelector('.search-container');
        const searchInput = document.getElementById('search-input');
        if (!searchContainer.contains(event.target)) {
            console.log("Clicked outside search container");
            searchContainer.classList.remove('active');
            console.log("Search container classList after removal:", searchContainer.classList);
            searchInput.blur();
        }
    });

    function showSlide(index) {
        console.log("Showing slide:", index);
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide() {
        console.log("Next slide");
        currentIndex = (currentIndex + 1) % totalItems;
        showSlide(currentIndex);
    }

    function prevSlide() {
        console.log("Previous slide");
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        showSlide(currentIndex);
    }

    document.querySelector('.carousel-button.next').addEventListener('click', nextSlide);
    document.querySelector('.carousel-button.prev').addEventListener('click', prevSlide);
    document.querySelector('.search-icon').addEventListener('click', toggleSearch);
});
