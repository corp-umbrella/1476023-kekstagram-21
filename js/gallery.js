'use strict';

(() => {

  const pictureList = document.querySelector(`.pictures`);

  const picture = document.querySelector(`#picture`).content;

  const renderPicture = (photo) => {

    const clonedElement = picture.querySelector(`.picture`).cloneNode(true);

    const pictureImage = clonedElement.querySelector(`.picture__img`);
    const pictureComments = clonedElement.querySelector(`.picture__comments`);
    const pictureLikes = clonedElement.querySelector(`.picture__likes`);

    pictureImage.src = photo.url;
    pictureImage.alt = photo.description;
    pictureComments.textContent = photo.comments.length;
    pictureLikes.textContent = photo.likes;

    clonedElement.addEventListener(`click`, () => {
      window.preview.showBigPicture(photo);
    });

    return clonedElement;
  };

  const renderPictures = (photos) => {

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPicture(photos[i]));
    }

    pictureList.appendChild(fragment);
  };

  const removeAllPictures = () => {

    const pictures = pictureList.querySelectorAll(`.picture`);

    for (let i = 0; i < pictures.length; i++) {
      pictures[i].remove();
    }
  };

  window.gallery = {
    renderPictures,
    removeAllPictures
  };

})();
