'use strict';

(function () {

  const onSuccess = function (photos) {
    window.data.set(photos);
    window.gallery.renderPictures(photos);
  };

  const onError = function () {

    let xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });
  };

  window.server.load(onSuccess, onError);

})();
