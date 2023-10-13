const images = document.querySelectorAll('.image');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let imageIndex = 0;
showImage(imageIndex);

function showImage(index) {
    if (index < 0) {
        imageIndex = images.length - 1;
    } else if (index >= images.length) {
        imageIndex = 0;
    }

    for (let i = 0; i < images.length; i++) {
        images[i].style.display = 'none';
    }
        
    images[imageIndex].style.display = 'flex';
}

function plusImage(n) {
    imageIndex += n;
    showImage(imageIndex);
}

function goToImage(n) {
    imageIndex = n;
    showImage(imageIndex);
}

prevBtn.addEventListener('click', () => {
    plusImage(-1);
});

nextBtn.addEventListener('click', () => {
    plusImage(1);
});