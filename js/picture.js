'use strict';

(function () {

  const photosList = window.gallery.getPhotos();

  const pictureList = document.querySelector(`.pictures`);

  const picture = document.querySelector(`#picture`).content;

  const pictureElement = picture.querySelector(`.picture`);

  const mainPicture = document.querySelector(`.big-picture`);

  const mainPictureClose = mainPicture.querySelector(`.big-picture__cancel`);

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

  for (let i = 0; i < window.main.PHOTOS_AMOUNT; i++) {
    const clonedElement = pictureElement.cloneNode(true);

    const pictureImage = clonedElement.querySelector(`.picture__img`);
    // const pictureDescription = clonedElement.querySelector(`.picture__info`);
    const pictureComments = clonedElement.querySelector(`.picture__comments`);
    const pictureLikes = clonedElement.querySelector(`.picture__likes`);

    pictureImage.src = photosList[i].url;
    pictureImage.alt = photosList[i].description;
    pictureComments.textContent = photosList[i].comments.length;
    pictureLikes.textContent = photosList[i].likes;

    pictureList.appendChild(clonedElement);

    clonedElement.addEventListener(`click`, function () {
      window.preview.showBigPicture(photosList[i]);
    });
  }

  window.picture = {
    mainPicture: mainPicture,
    mainPictureClose: mainPictureClose,
    mainBody: mainBody,
    onMainPictureEscPress: onMainPictureEscPress,
    closeMainPicture: closeMainPicture
  };

})();
