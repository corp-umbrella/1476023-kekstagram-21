'use strict';

(() => {

  const getURL = `https://21.javascript.pages.academy/kekstagram/data`;

  const postURL = `https://21.javascript.pages.academy/kekstagram`;

  const ERROR_400 = `Неверный запрос`;

  const ERROR_401 = `Пользователь не авторизован`;

  const ERROR_404 = `Ничего не найдено`;

  const ERROR_STATUS = `Cтатус ответа: : `;

  const query = (method, URL, onSuccess, onError, data) => {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;
  }

  const load = () => {

    query(`GET`, getURL);

    xhr.addEventListener(`load`, () => {

      let error;

      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          error = ERROR_400;
          break;
        case 401:
          error = ERROR_401;
          break;
        case 404:
          error = ERROR_404;
          break;
        default:
          error = ERROR_STATUS + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.open();

    xhr.send();
  };

  const upload = () => {

    query(`POST`, postURL);

    xhr.addEventListener(`load`, () => {
      onSuccess(xhr.response);
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.open();

    xhr.send(data);
  };

  window.server = {
    load,
    upload
  };

})();
