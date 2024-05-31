document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const totalItems = carouselItems.length;
    let currentIndex = 0;

    function toggleSearch() {
        const searchContainer = document.querySelector('.search-container');
        searchContainer.classList.toggle('active');
        const searchInput = document.getElementById('search-input');
        if (searchContainer.classList.contains('active')) {
            searchInput.focus();
        }
    }

    document.addEventListener('click', function(event) {
        const searchContainer = document.querySelector('.search-container');
        const searchInput = document.getElementById('search-input');
        if (!searchContainer.contains(event.target)) {
            searchContainer.classList.remove('active');
            searchInput.blur();
        }
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
    document.querySelector('.search-icon').addEventListener('click', toggleSearch);

    // Fetch JSON data
    fetch('../../JavaScript/data.json')
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
        const searchContainer = document.querySelector('.search-container');
        let resultsHTML = '<ul>';
        results.forEach(result => {
            const { text, url } = result.item;
            resultsHTML += `<li><a href="${url}">${text}</a></li>`;
        });
        resultsHTML += '</ul>';
        searchContainer.innerHTML = resultsHTML;
        if (results.length > 0) {
            searchContainer.classList.add('active');
        } else {
            searchContainer.classList.remove('active');
        }
    }
});
