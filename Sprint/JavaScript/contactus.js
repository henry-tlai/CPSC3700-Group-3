document.getElementById('reason').addEventListener('change', function() {
    var showIf = document.getElementById('author');
    if (this.value === 'change restaurant information') {
        showIf.classList.remove('optional');
    else if (this.value === 'contact author') {
        showIf.classList.remove('optional');
    } else {
        showIf.classList.add('optional');
    }
});
 
