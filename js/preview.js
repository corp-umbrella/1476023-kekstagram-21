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
    window.gallery.mainPicture.classList.remove(`hidden`);
    window.gallery.mainBody.classList.add(`modal-open`);
    document.addEventListener(`keydown`, window.gallery.onMainPictureEscPress);

    const mainPictureImg = window.gallery.mainPicture.querySelector(`.big-picture__img`);
    mainPictureImg.children[0].src = pictureInfo.url;

    const mainPictureLikes = window.gallery.mainPicture.querySelector(`.likes-count`);
    mainPictureLikes.textContent = pictureInfo.likes;

    const mainPictureComments = window.gallery.mainPicture.querySelector(`.comments-count`);
    mainPictureComments.textContent = pictureInfo.comments.length;

    // Создание списка комментариев

    renderComments(pictureInfo.comments);

    const mainPictureDescription = window.gallery.mainPicture.querySelector(`.social__caption`);
    mainPictureDescription.textContent = pictureInfo.description;
    const mainPictureClose = window.gallery.mainPicture.querySelector(`.big-picture__cancel`);

    mainPictureClose.addEventListener(`click`, function () {
      window.gallery.closeMainPicture();
    });

    mainPictureClose.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        window.gallery.closeMainPicture();
      }
    });
  };

  const commentsCounter = document.querySelector(`.social__comment-count`);
  commentsCounter.classList.add(`hidden`);

  const commentsDownload = document.querySelector(`.comments-loader`);
  commentsDownload.classList.add(`hidden`);

  window.preview = {
    showBigPicture
  };

})();
