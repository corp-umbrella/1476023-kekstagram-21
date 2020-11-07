'use strict';

(function () {

  const pictureList = document.querySelector(`.pictures`);

  const picture = document.querySelector(`#picture`).content;

  const mainPicture = document.querySelector(`.big-picture`);

  const mainBody = document.querySelector(`body`);
  mainBody.classList.add(`modal-open`);

  const onMainPictureEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeMainPicture();
    }
  };

  const closeMainPicture = function () {
    mainPicture.classList.add(`hidden`);
    mainBody.classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onMainPictureEscPress);
  };

  const renderPicture = function (photo) {
    const clonedElement = picture.querySelector(`.picture`).cloneNode(true);

    const pictureImage = clonedElement.querySelector(`.picture__img`);
    const pictureComments = clonedElement.querySelector(`.picture__comments`);
    const pictureLikes = clonedElement.querySelector(`.picture__likes`);

    pictureImage.src = photo.url;
    pictureImage.alt = photo.description;
    pictureComments.textContent = photo.comments.length;
    pictureLikes.textContent = photo.likes;

    clonedElement.addEventListener(`click`, function () {
      window.preview.showBigPicture(photo);
    });

    return clonedElement;
  };

  const renderPictures = function (photos) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPicture(photos[i]));
    }
    pictureList.appendChild(fragment);
  };

  window.gallery = {
    mainPicture: mainPicture,
    mainBody: mainBody,
    onMainPictureEscPress: onMainPictureEscPress,
    closeMainPicture: closeMainPicture,
    renderPictures: renderPictures
  };

})();
