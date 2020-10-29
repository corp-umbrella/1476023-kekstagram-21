'use strict';

(function () {

  // Приближённая фотография

  const renderComments = function (comments) {
    const commentList = document.querySelector(`.social__comments`);
    commentList.innerHTML = ``;

    for (let i = 0; i < comments.length; i++) {
      const comment = document.createElement(`li`);
      comment.classList.add(`social__comment`);
      commentList.appendChild(comment);

      const commentsAvatar = document.createElement(`img`);
      commentsAvatar.classList.add(`social__picture`);
      commentsAvatar.src = comments[i].avatar;
      commentsAvatar.alt = comments[i].name;
      const avatarWidth = 35;
      const avatarHeight = avatarWidth;
      commentsAvatar.width = avatarWidth;
      commentsAvatar.height = avatarHeight;
      comment.appendChild(commentsAvatar);

      const commentsText = document.createElement(`p`);
      commentsText.classList.add(`social__text`);
      commentsText.textContent = comments[i].message;
      comment.appendChild(commentsText);
    }
  };

  const showBigPicture = function (pictureInfo) {
    window.picture.mainPicture.classList.remove(`hidden`);
    window.picture.mainBody.classList.add(`modal-open`);
    document.addEventListener(`keydown`, window.picture.onMainPictureEscPress);

    const mainPictureImg = window.picture.mainPicture.querySelector(`.big-picture__img`);
    mainPictureImg.children[0].src = pictureInfo.url;

    const mainPictureLikes = window.picture.mainPicture.querySelector(`.likes-count`);
    mainPictureLikes.textContent = pictureInfo.likes;

    const mainPictureComments = window.picture.mainPicture.querySelector(`.comments-count`);
    mainPictureComments.textContent = pictureInfo.comments.length;

    // Создание списка комментариев

    renderComments(pictureInfo.comments);

    const mainPictureDescription = window.picture.mainPicture.querySelector(`.social__caption`);
    mainPictureDescription.textContent = pictureInfo.description;

    window.picture.mainPictureClose.addEventListener(`click`, function () {
      window.picture.closeMainPicture();
    });

    window.picture.mainPictureClose.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        window.picture.closeMainPicture();
      }
    });
  };

  const commentsCounter = document.querySelector(`.social__comment-count`);
  commentsCounter.classList.add(`hidden`);

  const commentsDownload = document.querySelector(`.comments-loader`);
  commentsDownload.classList.add(`hidden`);

  window.preview = {
    showBigPicture: showBigPicture
  };

})();
