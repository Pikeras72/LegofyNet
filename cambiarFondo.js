document.querySelector('.theme-switch__checkbox').addEventListener('change', function() {
    // Cambia el fondo de toda la página con una transición suave
    if (this.checked) {
        document.body.style.backgroundColor = '#333';
    } else {
        document.body.style.backgroundColor = 'lightgray';
    }
});