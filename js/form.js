'use strict';

(function () {

  // Обработчик на открытие и закрытие загрузки фото

  const uploadOpen = document.querySelector(`#upload-file`);
  const upload = document.querySelector(`.img-upload__overlay`);
  const uploadClose = upload.querySelector(`#upload-cancel`);

  const onUploadEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeUpload();
    }
  };

  const openUpload = function () {
    upload.classList.remove(`hidden`);
    window.picture.mainBody.classList.add(`modal-open`);

    document.addEventListener(`keydown`, onUploadEscPress);
  };

  const closeUpload = function () {
    upload.classList.add(`hidden`);
    window.picture.mainBody.classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onUploadEscPress);
  };

  uploadOpen.addEventListener(`change`, function () {
    openUpload();
  });

  uploadOpen.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      openUpload();
    }
  });

  uploadClose.addEventListener(`click`, function () {
    closeUpload();
  });

  uploadClose.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      closeUpload();
    }
  });

  // Хештеги

  const uploadHashtag = upload.querySelector(`.text__hashtags`);

  uploadHashtag.addEventListener(`focus`, function () {
    document.removeEventListener(`keydown`, onUploadEscPress);
  });

  uploadHashtag.addEventListener(`blur`, function () {
    document.addEventListener(`keydown`, onUploadEscPress);
  });

  uploadHashtag.addEventListener(`input`, function (evt) {
    const hashTags = evt.target.value.toLowerCase().split(` `);

    if (!checkHashtagsLength(hashTags)) {
      uploadHashtag.setCustomValidity(`Неправильная длина хэштега: минимум 1 символ, максимум 20`);
    } else if (!isUniTag(hashTags)) {
      uploadHashtag.setCustomValidity(`Хэштеги должны быть уникальными`);
    } else if (!isRightTagFormat(hashTags)) {
      uploadHashtag.setCustomValidity(`Допускаются только теги с # в начале, никаких других символов`);
    } else if (hashTags.length > 5) {
      uploadHashtag.setCustomValidity(`Можно указать не больше пяти хэштегов`);
    } else {
      uploadHashtag.setCustomValidity(``);
    }
  });

  const isRightTagFormat = function (hashTags) {
    for (let i = 0; i < hashTags.length; i++) {
      if (!hashTags[i].match(/^#[0-9a-zа-я]+$/)) {
        return false;
      }
    }

    return true;
  };

  const checkHashtagsLength = function (hashTags) {
    for (let i = 0; i < hashTags.length; i++) {
      if (hashTags[i].length <= 1 || hashTags[i].length > 20) {
        return false;
      }
    }

    return true;
  };

  const isUniTag = function (hashTags) {
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

  // Редактирование изображения и ограничения, накладываемые на поля: Масштаб

  const scaleSmaller = document.querySelector(`.scale__control--smaller`);
  const scaleBigger = document.querySelector(`.scale__control--bigger`);
  const scaleValue = document.querySelector(`.scale__control--value`);
  const uploadPreview = document.querySelector(`.img-upload__preview`);
  const uploadPreviewImage = uploadPreview.querySelector(`img`);
  const scaleValueDefault = 100;
  const scaleValueMin = 25;
  const scaleValueMax = 100;
  scaleValue.value = scaleValueDefault;
  const scaleStep = 25;

  scaleSmaller.addEventListener(`click`, function (evt) {
    if (scaleValue.value > scaleValueMin && scaleValue.value <= scaleValueMax) {
      evt.preventDefault();
      scaleValue.value = +scaleValue.value - scaleStep;
      uploadPreviewImage.style.transform = `scale(${scaleValue.value / 100})`;
    }
  });

  scaleBigger.addEventListener(`click`, function (evt) {
    if (scaleValue.value >= scaleValueMin && scaleValue.value < scaleValueMax) {
      evt.preventDefault();
      scaleValue.value = +scaleValue.value + scaleStep;
      uploadPreviewImage.style.transform = `scale(${scaleValue.value / 100})`;
    }
  });

  // Редактирование изображения и ограничения, накладываемые на поля: Наложение эффекта на изображение

  const effectItems = document.querySelectorAll(`.effects__radio`);
  const saturationToggle = document.querySelector(`.effect-level__pin`);
  // const saturationValue = document.querySelector(`.effect-level__value`);
  const saturationSlider = document.querySelector(`.effect-level__line`);

  for (let i = 0; i < effectItems.length; i++) {
    effectItems[i].addEventListener(`change`, function (evt) {
      if (evt.target.value === `chrome`) {
        uploadPreviewImage.style.filter = ``;
        uploadPreviewImage.className = `effects__preview--chrome`;
      } else if (evt.target.value === `sepia`) {
        uploadPreviewImage.style.filter = ``;
        uploadPreviewImage.className = `effects__preview--sepia`;
      } else if (evt.target.value === `marvin`) {
        uploadPreviewImage.style.filter = ``;
        uploadPreviewImage.className = `effects__preview--marvin`;
      } else if (evt.target.value === `phobos`) {
        uploadPreviewImage.style.filter = ``;
        uploadPreviewImage.className = `effects__preview--phobos`;
      } else if (evt.target.value === `heat`) {
        uploadPreviewImage.style.filter = ``;
        uploadPreviewImage.className = `effects__preview--heat`;
      } else if (evt.target.value === `none`) {
        uploadPreviewImage.style.filter = ``;
        uploadPreviewImage.className = ``;
      }
    });
  }

  saturationToggle.addEventListener(`mouseup`, function () {
    const percent = saturationToggle.offsetLeft / saturationSlider.offsetWidth;
    switch (uploadPreviewImage.className) {
      case `effects__preview--chrome`:
        uploadPreviewImage.style.filter = `grayscale(${percent})`;
        break;
      case `effects__preview--sepia`:
        uploadPreviewImage.style.filter = `sepia(${percent})`;
        break;
      case `effects__preview--marvin`:
        uploadPreviewImage.style.filter = `invert(${percent * 100}%)`;
        break;
      case `effects__preview--phobos`:
        uploadPreviewImage.style.filter = `blur(${percent * 3}px)`;
        break;
      case `effects__preview--heat`:
        uploadPreviewImage.style.filter = `brightness(${1 + percent * 2})`;
        break;
      default:
        uploadPreviewImage.style.filter = ``;
    }
  });

  // Код для валидации комментария при загрузке нового изображения

  const uploadComment = upload.querySelector(`.text__description`);

  uploadComment.addEventListener(`focus`, function () {
    document.removeEventListener(`keydown`, onUploadEscPress);
  });

  uploadComment.addEventListener(`blur`, function () {
    document.addEventListener(`keydown`, onUploadEscPress);
  });

  uploadComment.addEventListener(`input`, function (evt) {
    const uploadComments = evt.target.value.toLowerCase().split(` `);

    if (!checkuploadCommentsLength(uploadComments)) {
      uploadComment.setCustomValidity(`Комментарий должен быть не больше 140 символов`);
    } else {
      uploadComment.setCustomValidity(``);
    }
  });

  const checkuploadCommentsLength = function (uploadComments) {
    for (let i = 0; i < uploadComments.length; i++) {
      if (uploadComments[i].length > 140) {
        return false;
      }
    }

    return true;
  };

})();
