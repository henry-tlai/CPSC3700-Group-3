document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const totalItems = carouselItems.length;
    let currentIndex = 0;

    function toggleSearch() {
        console.log("toggleSearch called"); // Debugging line
        const searchContainer = document.querySelector('.search-container');
        searchContainer.classList.toggle('active');
        const searchInput = document.getElementById('search-input');
        if (searchContainer.classList.contains('active')) {
            searchInput.focus();
        } else {
            searchInput.blur(); // Ensure blur when search is hidden
        }
    }

    document.addEventListener('click', function(event) {
        const searchContainer = document.querySelector('.search-container');
        const searchInput = document.getElementById('search-input');
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

    // Fetch JSON data
    fetch('../../JavaScript/mapdata.json')
        .then(response => response.json())
        .then(data => {
            const fuse = new Fuse(data, {
                keys: ['text']
            });

            const searchInput = document.getElementById('search-input');
            searchInput.addEventListener('input', () => {
                const searchResults = fuse.search(searchInput.value);
                displayResults(searchResults);
            });
        });

    function displayResults(results) {
        const searchResultsContainer = document.querySelector('.search-results');
        let resultsHTML = '<ul>';
        results.forEach(result => {
            const { text, url } = result.item;
            resultsHTML += `<li><a href="${url}">${text}</a></li>`;
        });
        resultsHTML += '</ul>';
        searchResultsContainer.innerHTML = resultsHTML;
    }
});
