document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Content Loaded");
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const totalItems = carouselItems.length;
    let currentIndex = 0;

    function toggleSearch() {
        console.log("Toggle search function called");
        const searchContainer = document.querySelector('.search-container');
        searchContainer.classList.toggle('active');
        const searchInput = document.getElementById('search-input');
        if (searchContainer.classList.contains('active')) {
            console.log("Search container is active");
            searchInput.focus();
        }
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
