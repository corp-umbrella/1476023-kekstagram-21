'use strict';

(function () {

  const onSuccess = function (photos) {
    window.data.set(photos);
    window.gallery.renderPictures(photos);
  };

  window.server.load(onSuccess);

})();
