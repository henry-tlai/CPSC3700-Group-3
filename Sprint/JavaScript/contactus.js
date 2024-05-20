document.getElementById('reason').addEventListener('change', function() {
    var showIf = document.getElementById('who');
    if (this.value === 'change restaurant information') {
        additionalDropdown.classList.remove('optional');
    } else {
        additionalDropdown.classList.add('optional');
    }
});
