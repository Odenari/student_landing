const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    close = document.querySelector('.menu--close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});
close.addEventListener('click', () => {
    menu.classList.remove('active');
});

menu.addEventListener('click', (e) => {
    const link = e.target;
    link.closest('.menu').classList.remove('active');
});

const values = document.querySelectorAll('.line--value'),
    lines = document.querySelectorAll('.line--progress span');

values.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
});
