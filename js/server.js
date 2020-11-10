'use strict';

(function () {

  const getURL = `https://21.javascript.pages.academy/kekstagram/data`;

  const postURL = `https://21.javascript.pages.academy/kekstagram`;

  const xhr = new XMLHttpRequest();

  xhr.responseType = `json`;

  const load = function (onSuccess, onError) {

    xhr.addEventListener(`load`, function () {
      let error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          error = `Неверный запрос`;
          break;
        case 401:
          error = `Пользователь не авторизован`;
          break;
        case 404:
          error = `Ничего не найдено`;
          break;
        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = 1000;

    xhr.open(`GET`, getURL);

    xhr.send();
  };

  const upload = function (data, onSuccess, onError) {

    xhr.addEventListener(`load`, function () {
      onSuccess(xhr.response);
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = 1000;

    xhr.open(`POST`, postURL);
    xhr.send(data);
  };

  window.server = {
    load: load,
    upload: upload
  };

})();
