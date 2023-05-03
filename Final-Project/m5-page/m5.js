const images = document.querySelectorAll('.image');
const modal = document.getElementById('modal');
const modalContent = document.querySelector('.modal-content');
const modalClose = document.getElementById("modal-close");


window.addEventListener('scroll', () => {
    const topViewport = window.pageYOffset;
    const bottomViewport = topViewport + window.innerHeight;

    images.forEach(image => {
        const topImage = image.offsetTop + 100;
        const bottomImage = topImage + image.offsetHeight;

        if (bottomViewport > topImage && topViewport < bottomImage) {
            image.classList.add('loaded');
        } else {
            image.classList.remove('loaded');
        }
    });
});

function showModal(event) {
    modalContent.src = event.target.src;
    modal.style.display = 'flex';
};

function hideModal() {
    modal.style.display = 'none';
};

images.forEach(item => {
    item.addEventListener('click', showModal);
});

modalClose.addEventListener('click', hideModal);
modal.addEventListener('click', hideModal);
modalContent.addEventListener('click', function(event) {
    event.stopPropagation();
})