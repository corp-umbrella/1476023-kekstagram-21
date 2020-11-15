'use strict';

(() => {

  const uploadHashtag = window.form.upload.querySelector(`.text__hashtags`);

  const uploadComment = window.form.upload.querySelector(`.text__description`);

  const HASHTAGS_MAX_NUMBER = 5;

  const HASHTAGS_MAX_LENGTH = 20;

  const COMMENT_MAX_LENGTH = 140;

  // Хэштеги

  uploadHashtag.addEventListener(`focus`, () => {
    document.removeEventListener(`keydown`, window.form.onUploadEscPress);
  });

  uploadHashtag.addEventListener(`blur`, () => {
    document.addEventListener(`keydown`, window.form.onUploadEscPress);
  });

  uploadHashtag.addEventListener(`input`, (evt) => {

    const hashTags = evt.target.value.toLowerCase().split(` `);

    if (!checkHashtagsLength(hashTags)) {
      uploadHashtag.setCustomValidity(`Неправильная длина хэштега: минимум 1 символ, максимум 20`);
    } else if (!isUniqueTag(hashTags)) {
      uploadHashtag.setCustomValidity(`Хэштеги должны быть уникальными`);
    } else if (!isRightTagFormat(hashTags)) {
      uploadHashtag.setCustomValidity(`Допускаются только теги с # в начале, никаких других символов`);
    } else if (hashTags.length > HASHTAGS_MAX_NUMBER) {
      uploadHashtag.setCustomValidity(`Можно указать не больше пяти хэштегов`);
    } else {
      uploadHashtag.setCustomValidity(``);
    }
  });

  const isRightTagFormat = (hashTags) => {

    for (let i = 0; i < hashTags.length; i++) {
      if (!hashTags[i].match(/^#[0-9a-zа-я]+$/)) {
        return false;
      }
    }

    return true;
  };

  const checkHashtagsLength = (hashTags) => {

    for (let i = 0; i < hashTags.length; i++) {
      if (hashTags[i].length <= 1 || hashTags[i].length > HASHTAGS_MAX_LENGTH) {
        return false;
      }
    }

    return true;
  };

  const isUniqueTag = (hashTags) => {

    const unicHashtagsList = {};

    for (let i = 0; i < hashTags.length; i++) {
      if (hashTags[i] in unicHashtagsList) {
        return false;
      } else {
        unicHashtagsList[hashTags[i]] = true;
      }
    }

    return true;
  };

  // Код для валидации комментария при загрузке нового изображения

  uploadComment.addEventListener(`focus`, () => {
    document.removeEventListener(`keydown`, window.form.onUploadEscPress);
  });

  uploadComment.addEventListener(`blur`, () => {
    document.addEventListener(`keydown`, window.form.onUploadEscPress);
  });

  uploadComment.addEventListener(`input`, (evt) => {

    const uploadComments = evt.target.value.toLowerCase().split(` `);

    if (!checkUploadCommentsLength(uploadComments)) {
      uploadComment.setCustomValidity(`Комментарий должен быть не больше 140 символов`);
    } else {
      uploadComment.setCustomValidity(``);
    }
  });

  const checkUploadCommentsLength = (uploadComments) => {

    for (let i = 0; i < uploadComments.length; i++) {
      if (uploadComments[i].length > COMMENT_MAX_LENGTH) {
        return false;
      }
    }

    return true;
  };

})();
