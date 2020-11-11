'use strict';

(function () {

  const onSuccess = function (photos) {
    window.data.set(photos);
    window.gallery.renderPictures(photos);
  };

  const onError = function () {
    window.form.showError(`Ошибка загрузки изображений`, `Попробуйте ещё раз`);
  };

  window.server.load(onSuccess, onError);

})();
