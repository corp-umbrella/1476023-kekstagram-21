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
    window.gallery.mainBody.classList.add(`modal-open`);

    document.addEventListener(`keydown`, onUploadEscPress);
  };

  const closeUpload = function () {
    upload.classList.add(`hidden`);
    window.gallery.mainBody.classList.remove(`modal-open`);
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
  const saturationLine = document.querySelector(`.effect-level__depth`);
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

  saturationToggle.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();
    let togglePosition = evt.clientX;

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      const shift = togglePosition - moveEvt.clientX;
      let newPosition = saturationToggle.offsetLeft - shift;
      togglePosition = moveEvt.clientX;
      if (newPosition <= 0) {
        newPosition = 0;
      } else if (newPosition >= saturationSlider.offsetWidth) {
        newPosition = saturationSlider.offsetWidth;
      } else {
        saturationToggle.style.left = newPosition + `px`;
      }
      getEffect();
      const percent = saturationToggle.offsetLeft / saturationSlider.offsetWidth;
      saturationLine.style.width = `${percent * 100}%`;
    };

    document.addEventListener(`mousemove`, onMouseMove);

    const onMouseUp = function (moveEvt) {
      moveEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      getEffect();
    };
    document.addEventListener(`mouseup`, onMouseUp);
  });

  const getEffect = function () {
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
  };

  const form = document.querySelector(`.img-upload__form`);

  const main = document.querySelector(`main`);

  const showSuccess = function () {

    const success = document.querySelector(`#success`).content;

    const clonedSuccess = success.querySelector(`.success`).cloneNode(true);

    // const successInner = clonedSuccess.querySelector(`.success__inner`);
    // const successTitle = clonedSuccess.querySelector(`.success__title`);
    const successButton = clonedSuccess.querySelector(`.success__button`);

    main.appendChild(clonedSuccess);

    // clonedSuccess.classList.remove(`hidden`);

    const onSuccessEscPress = function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        closeSuccess();
      }
    };

    document.addEventListener(`keydown`, onSuccessEscPress);

    const closeSuccess = function () {
      clonedSuccess.classList.add(`hidden`);
      document.removeEventListener(`keydown`, onSuccessEscPress);
    };

    successButton.addEventListener(`click`, function () {
      closeSuccess();
    });

    successButton.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        closeSuccess();
      }
    });

  };

  const showError = function () {

    const error = document.querySelector(`#error`).content;

    const clonedError = error.querySelector(`.error`).cloneNode(true);

    // const errorInner = clonedError.querySelector(`.error__inner`);
    // const errorTitle = clonedError.querySelector(`.error__title`);
    const errorButton = clonedError.querySelector(`.error__button`);

    main.appendChild(clonedError);

    // clonedError.classList.remove(`hidden`);

    const onErrorEscPress = function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        closeError();
      }
    };

    document.addEventListener(`keydown`, onErrorEscPress);

    const closeError = function () {
      clonedError.classList.add(`hidden`);
      document.removeEventListener(`keydown`, onErrorEscPress);
    };

    errorButton.addEventListener(`click`, function () {
      closeError();
    });

    errorButton.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        closeError();
      }
    });

  };

  form.addEventListener(`submit`, function (evt) {
    window.server.upload(new FormData(form), function () {
      upload.classList.add(`hidden`);
      showSuccess();
    }, function () {
      upload.classList.add(`hidden`);
      showError();
    });
    evt.preventDefault();
  });

  window.form = {
    upload: upload,
    onUploadEscPress: onUploadEscPress
  };

})();

