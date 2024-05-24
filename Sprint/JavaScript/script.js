// This will be for our JS if we decide to implement it
const carousel = document.querySelector('.carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
const totalItems = carouselItems.length;
let currentIndex = 0;
// search
function toggleSearch() {
const searchContainer = document.querySelector('.search-container');
searchContainer.classList.toggle('active');
const searchInput = document.getElementById('search-input');
    if (searchContainer.classList.contains('active')) {
        searchInput.focus();
    }
}

// Close the search input when clicking outside of it
document.addEventListener('click', function(event) {
const searchContainer = document.querySelector('.search-container');
const searchInput = document.getElementById('search-input');
    if (!searchContainer.contains(event.target)) {
        searchContainer.classList.remove('active');
        searchInput.blur();
    }
});
// review
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