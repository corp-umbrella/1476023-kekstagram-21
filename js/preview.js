'use strict';

(function () {

  const COMMENTS_PER_CLICK = 5;

  const AVATAR_WIDTH = 35;

  const mainPicture = document.querySelector(`.big-picture`);

  const mainBody = document.querySelector(`body`);

  const commentsCounter = document.querySelector(`.social__comment-count`);
  commentsCounter.classList.add(`hidden`);

  // Приближённая фотография

  const clearCommentsList = function () {
    const commentList = document.querySelector(`.social__comments`);
    commentList.innerHTML = ``;
  };

  const renderComments = function (comments) {
    const commentList = document.querySelector(`.social__comments`);
    // commentList.innerHTML = ``;

    for (let i = 0; i < comments.length; i++) {
      const comment = document.createElement(`li`);
      comment.classList.add(`social__comment`);
      commentList.appendChild(comment);

      const commentsAvatar = document.createElement(`img`);
      commentsAvatar.classList.add(`social__picture`);
      commentsAvatar.src = comments[i].avatar;
      commentsAvatar.alt = comments[i].name;
      const avatarWidth = AVATAR_WIDTH;
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
    mainPicture.classList.remove(`hidden`);
    mainBody.classList.add(`modal-open`);
    document.addEventListener(`keydown`, window.gallery.onMainPictureEscPress);

    const mainPictureImg = mainPicture.querySelector(`.big-picture__img`);
    mainPictureImg.children[0].src = pictureInfo.url;

    const mainPictureLikes = mainPicture.querySelector(`.likes-count`);
    mainPictureLikes.textContent = pictureInfo.likes;

    const mainPictureComments = mainPicture.querySelector(`.comments-count`);
    mainPictureComments.textContent = pictureInfo.comments.length;

    // Создание списка комментариев

    const commentsLoader = document.querySelector(`.comments-loader`);

    let visibleComments = Math.min(COMMENTS_PER_CLICK, pictureInfo.comments.length);

    clearCommentsList();

    renderComments(pictureInfo.comments.slice(0, COMMENTS_PER_CLICK));

    const hideCommentLoader = function () {
      if (visibleComments >= pictureInfo.comments.length) {
        commentsLoader.classList.add(`hidden`);
      }
    };

    hideCommentLoader();

    const commentsLoaderClickHandler = function () {
      renderComments(pictureInfo.comments.slice(visibleComments, visibleComments + COMMENTS_PER_CLICK));
      visibleComments += COMMENTS_PER_CLICK;
      hideCommentLoader();
    };

    commentsLoader.addEventListener(`click`, commentsLoaderClickHandler);

    const mainPictureDescription = mainPicture.querySelector(`.social__caption`);
    mainPictureDescription.textContent = pictureInfo.description;
    const mainPictureClose = mainPicture.querySelector(`.big-picture__cancel`);

    const closeMainPicture = function () {
      mainPicture.classList.add(`hidden`);
      mainBody.classList.remove(`modal-open`);
      document.removeEventListener(`keydown`, onMainPictureEscPress);
      commentsLoader.removeEventListener(`click`, commentsLoaderClickHandler);
      commentsLoader.classList.remove(`hidden`);
    };

    const onMainPictureEscPress = function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        closeMainPicture();
      }
    };

    document.addEventListener(`keydown`, onMainPictureEscPress);

    mainPictureClose.addEventListener(`click`, function () {
      closeMainPicture();
    });

    mainPictureClose.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        closeMainPicture();
      }
    });
  };

  window.preview = {
    mainBody,
    showBigPicture
  };

})();
