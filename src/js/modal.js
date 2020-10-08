import images from '../gallery-items.js';

const lightboxContainer = document.querySelector('.js-lightbox');

const galleryList = document.querySelector('.js-gallery');

const modalImage = document.querySelector('.lightbox__image');
// console.log(modalImage);

const closeModalBtn = document.querySelector(
  'button[data-action="close-lightbox"]',
);

const backdrop = document.querySelector('.lightbox__overlay');

galleryList.addEventListener('click', openModal);

closeModalBtn.addEventListener('click', closeModal);

backdrop.addEventListener('click', onBackDropClick);

function openModal(evt) {
  const modalImageSrc = evt.target.dataset.source;
  const modalImageAlt = evt.target.alt;
  //   console.log(modalImageSrc);

  const isOnImageClick = evt.target.classList.contains('gallery__image');
  //   console.log(evt);

  if (!isOnImageClick) {
    return;
  }
  evt.preventDefault();
  lightboxContainer.classList.add('is-open');

  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onArrowRightClick);
  window.addEventListener('keydown', onArrowLeftClick);

  makeOriginalImage(modalImageSrc, modalImageAlt);
}

function closeModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onArrowRightClick);
  window.removeEventListener('keydown', onArrowLeftClick);

  lightboxContainer.classList.remove('is-open');
  cleanModalImageSrc();
}

function makeOriginalImage(src, alt) {
  modalImage.src = src;
  modalImage.alt = alt;
  //   console.log(modalImage);
}

function onBackDropClick() {
  closeModal();
}

function onEscKeyPress(evt) {
  //   console.log(evt);
  if (evt.code === 'Escape') {
    closeModal();
  }
}

function onArrowRightClick(evt) {
  // Ищем текущую картинку в массиве images.find

  const currentImage = images.find(image => image.original === modalImage.src);
  //   console.log(currentImage);

  if (evt.code === 'ArrowRight') {
    //   к индексу текущей картинке добавим 1 чтоб назначить следующую картинку
    const nextModalImageIndex = images.indexOf(currentImage) + 1;
    // console.log(nextModalImageIndex);
    // console.log(images[nextModalImageIndex]);

    // когда все картинки в массиве закончелись назначаем первую картинку в массиве
    if (images[nextModalImageIndex] === undefined) {
      modalImage.src = images[0].original;
      modalImage.alt = images[0].description;
      return;
    }

    modalImage.src = images[nextModalImageIndex].original;
    modalImage.alt = images[nextModalImageIndex].description;
  }
}

function onArrowLeftClick(evt) {
  // Ищем текущую картинку в массиве images.find
  const currentImage = images.find(image => image.original === modalImage.src);
  //   console.log(currentImage);

  if (evt.code === 'ArrowLeft') {
    //   от индексу текущей картинке отнимем 1 чтоб назначить предыдущую картинку
    const previousModalImageIndex = images.indexOf(currentImage) - 1;
    // console.log(images[previousModalImageIndex]);

    // когда все картинки в массиве закончелись назначаем последнюю картинку в массиве
    if (images[previousModalImageIndex] === undefined) {
      modalImage.src = images[images.length - 1].original;
      modalImage.alt = images[images.length - 1].description;
      return;
    }

    modalImage.src = images[previousModalImageIndex].original;
    modalImage.alt = images[previousModalImageIndex].description;
  }
}

function cleanModalImageSrc() {
  modalImage.src = '';
  modalImage.alt = '';
}
