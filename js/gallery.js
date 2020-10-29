'use strict';

(function () {

  const getPhotos = function () {
    let photos = [];
    for (let i = 1; i <= window.main.PHOTOS_AMOUNT; i++) {
      photos.push({
        url: `photos/${i}.jpg`,
        description: `Фото номер ${i}`,
        likes: window.data.getLikesNumber(),
        comments: window.data.getComments()
      }
      );
    }
    return photos;
  };

  window.gallery = {
    getPhotos: getPhotos
  };

})();
