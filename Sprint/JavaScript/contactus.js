document.getElementById('reason').addEventListener('change', function() {
    var showIf = document.getElementById('who');
    if (this.value === 'change restaurant information') {
        showIf.classList.remove('optional');
    } else {
        showIf.classList.add('optional');
    }
});
