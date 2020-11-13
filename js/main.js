'use strict';

(() => {

  let photos = [];

  const onSuccess = (data) => {

    photos = data;

    window.data.set(photos);

    window.gallery.renderPictures(photos);

    window.filter.activateFilters();
  };

  const onError = () => {

    window.form.showError(`Ошибка загрузки изображений`, `Попробуйте ещё раз`);
  };

  window.server.load(onSuccess, onError);

})();
