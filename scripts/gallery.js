document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    let clone = gallery.innerHTML;
    gallery.innerHTML += clone;
  });