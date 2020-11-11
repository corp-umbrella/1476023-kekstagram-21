'use strict';

(function () {

  const onSuccess = function (photos) {
    window.data.set(photos);
    window.gallery.renderPictures(photos);
  };

  const onError = function () {
    window.server.upload(onError);
  };

  window.server.load(onSuccess, onError);

})();
