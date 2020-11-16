'use strict';

(() => {

  const getURL = `https://21.javascript.pages.academy/kekstagram/data`;

  const postURL = `https://21.javascript.pages.academy/kekstagram`;

  const ERROR_400 = `Неверный запрос`;

  const ERROR_401 = `Пользователь не авторизован`;

  const ERROR_404 = `Ничего не найдено`;

  const ERROR_STATUS = `Cтатус ответа: : `;

  const createXhr = (onSuccess, onError) => {

    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

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

    return xhr;
  };

  const load = (onSuccess, onError) => {

    const xhr = createXhr(onSuccess, onError);

    xhr.open(`GET`, getURL);

    xhr.send();
  };

  const upload = (data, onSuccess, onError) => {

    const xhr = createXhr(onSuccess, onError);

    xhr.open(`POST`, postURL);

    xhr.send(data);
  };

  window.server = {
    load,
    upload
  };

})();
