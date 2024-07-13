var hamburger = document.getElementById('hamburger_img');
var nav = document.getElementById('left_nav');
var close_btn = document.getElementById('close_img');

// Hamburger toggler
hamburger.addEventListener("click", () => {
    nav.style.display = 'block';
    hamburger.style.display = 'none';
    close_btn.style.display = 'block';
});

close_btn.addEventListener("click", () => {
    nav.style.display = 'none';
    close_btn.style.display = 'none';
    hamburger.style.display = 'block';
});
