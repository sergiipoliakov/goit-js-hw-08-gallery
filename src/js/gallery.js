import images from '../gallery-items.js';

const galleryList = document.querySelector('.js-gallery');

const imagesMarkup = createImagesMarkup(images);

galleryList.insertAdjacentHTML('beforeend', imagesMarkup);

function createImagesMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
   href = '${original}';
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
`;
    })
    .join('');
}
