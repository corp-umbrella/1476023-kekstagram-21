'use strict';

(function () {

  let photos = [];

  const onSuccess = function (data) {
    photos = data;
    window.data.set(photos);
    window.gallery.renderPictures(photos);
    window.filter.activateFilters();
  };

  const onError = function () {
    window.form.showError(`Ошибка загрузки изображений`, `Попробуйте ещё раз`);
  };

  window.server.load(onSuccess, onError);

})();
