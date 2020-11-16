'use strict';

(() => {

  const uploadOpen = document.querySelector(`#upload-file`);
  const upload = document.querySelector(`.img-upload__overlay`);
  const uploadClose = upload.querySelector(`#upload-cancel`);

  const scaleSmaller = document.querySelector(`.scale__control--smaller`);
  const scaleBigger = document.querySelector(`.scale__control--bigger`);
  const scaleValue = document.querySelector(`.scale__control--value`);
  const uploadPreview = document.querySelector(`.img-upload__preview`);
  const uploadPreviewImage = uploadPreview.querySelector(`img`);
  const SCALE_VALUE_DEFAULT = 100;
  const SCALE_VALUE_MIN = 25;
  const SCALE_VALUE_MAX = 100;
  const SCALE_STEP = 25;

  const effectItems = document.querySelectorAll(`.effects__radio`);
  const saturationToggle = document.querySelector(`.effect-level__pin`);
  const saturationLine = document.querySelector(`.effect-level__depth`);
  const saturationSlider = document.querySelector(`.effect-level__line`);
  const effectLevel = document.querySelector(`.img-upload__effect-level`);

  const form = document.querySelector(`.img-upload__form`);

  const main = document.querySelector(`main`);

  // Обработчик на открытие и закрытие загрузки фото

  const onUploadEscPress = (evt) => {

    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeUpload();
    }
  };

  const openUpload = () => {

    upload.classList.remove(`hidden`);
    window.preview.mainBody.classList.add(`modal-open`);
    document.addEventListener(`keydown`, onUploadEscPress);
    hideSlider();
  };

  const closeUpload = () => {

    upload.classList.add(`hidden`);
    window.preview.mainBody.classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onUploadEscPress);
    uploadOpen.value = ``;
    form.reset();
    uploadPreviewImage.style.filter = ``;
    uploadPreviewImage.className = ``;

  };

  uploadOpen.addEventListener(`change`, () => {
    openUpload();
  });

  uploadOpen.addEventListener(`keydown`, (evt) => {

    if (evt.key === `Enter`) {
      openUpload();
    }
  });

  uploadClose.addEventListener(`click`, () => {
    closeUpload();
  });

  uploadClose.addEventListener(`keydown`, (evt) => {

    if (evt.key === `Enter`) {
      closeUpload();
    }
  });

  // Редактирование изображения и ограничения, накладываемые на поля: Масштаб

  scaleValue.value = SCALE_VALUE_DEFAULT;

  scaleSmaller.addEventListener(`click`, (evt) => {

    if (scaleValue.value > SCALE_VALUE_MIN && scaleValue.value <= SCALE_VALUE_MAX) {
      evt.preventDefault();
      scaleValue.value = +scaleValue.value - SCALE_STEP;
      uploadPreviewImage.style.transform = `scale(${scaleValue.value / 100})`;
    }
  });

  scaleBigger.addEventListener(`click`, (evt) => {

    if (scaleValue.value >= SCALE_VALUE_MIN && scaleValue.value < SCALE_VALUE_MAX) {
      evt.preventDefault();
      scaleValue.value = +scaleValue.value + SCALE_STEP;
      uploadPreviewImage.style.transform = `scale(${scaleValue.value / 100})`;
    }
  });

  // Редактирование изображения и ограничения, накладываемые на поля: Наложение эффекта на изображение

  for (let i = 0; i < effectItems.length; i++) {
    effectItems[i].addEventListener(`change`, (evt) => {
      hideSlider();
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
      getEffect();
    });
  }

  const hideSlider = () => {
    if (document.querySelector(`#effect-none`).checked) {
      effectLevel.classList.add(`hidden`);
    } else {
      effectLevel.classList.remove(`hidden`);
    }
  };

  saturationToggle.addEventListener(`mousedown`, (evt) => {

    evt.preventDefault();
    let togglePosition = evt.clientX;

    const onMouseMove = (moveEvt) => {

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

    const onMouseUp = (moveEvt) => {

      moveEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      getEffect();
    };

    document.addEventListener(`mouseup`, onMouseUp);
  });

  const getEffect = () => {

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

  const showSuccess = () => {

    const success = document.querySelector(`#success`).content;
    const clonedSuccess = success.querySelector(`.success`).cloneNode(true);
    const successButton = clonedSuccess.querySelector(`.success__button`);


    main.appendChild(clonedSuccess);

    const onSuccessEscPress = (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        closeSuccess();
      }
    };

    document.addEventListener(`keydown`, onSuccessEscPress);

    const closeSuccess = () => {
      clonedSuccess.remove();
      document.removeEventListener(`keydown`, onSuccessEscPress);
      document.removeEventListener(`click`, () => {
        closeSuccess();
      });
    };

    successButton.addEventListener(`click`, () => {
      closeSuccess();
    });

    successButton.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        closeSuccess();
      }
    });

    document.addEventListener(`click`, () => {
      closeSuccess();
    });

    form.reset();

  };

  const showError = (errorMessage, buttonText) => {

    const error = document.querySelector(`#error`).content;

    const clonedError = error.querySelector(`.error`).cloneNode(true);
    const errorTitle = clonedError.querySelector(`.error__title`);
    const errorButton = clonedError.querySelector(`.error__button`);

    if (errorMessage) {
      errorTitle.textContent = errorMessage;
    }

    if (buttonText) {
      errorButton.textContent = buttonText;
    }

    main.appendChild(clonedError);

    const onErrorEscPress = (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        closeError();
      }
    };

    document.addEventListener(`keydown`, onErrorEscPress);

    const closeError = () => {
      clonedError.classList.add(`hidden`);
      document.removeEventListener(`keydown`, onErrorEscPress);
      document.removeEventListener(`click`, () => {
        closeError();
      });
    };

    errorButton.addEventListener(`click`, () => {
      closeError();
    });

    errorButton.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        closeError();
      }
    });

    document.addEventListener(`click`, () => {
      closeError();
    });

  };

  form.addEventListener(`submit`, (evt) => {

    window.server.upload(new FormData(form), () => {
      closeUpload();
      showSuccess();
    }, () => {
      closeUpload();
      showError();
    });

    uploadOpen.value = ``;


    evt.preventDefault();
  });

  window.form = {
    upload,
    onUploadEscPress,
    showError
  };

})();

