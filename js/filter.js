'use strict';

(function () {

  const filter = document.querySelector(`.img-filters`);

  const activateFilters = function () {
    filter.classList.remove(`img-filters--inactive`);
  };

  const filterDefault = filter.querySelector(`#filter-default`);

  // filterDefault.addEventListener(`click`, function () {
  //   window.gallery.removeAllPictures();
  //   filter.querySelector(`.img-filters__button--active`).classList.remove(`img-filters__button--active`);
  //   filterDefault.classList.add(`img-filters__button--active`);
  //   window.gallery.renderPictures(window.data.get());
  // });

  const filterRandom = filter.querySelector(`#filter-random`);

  // filterRandom.addEventListener(`click`, function () {
  //   window.gallery.removeAllPictures();
  //   filter.querySelector(`.img-filters__button--active`).classList.remove(`img-filters__button--active`);
  //   filterRandom.classList.add(`img-filters__button--active`);
  //   const randomArray = getRandomData(window.data.get());
  //   window.gallery.renderPictures(randomArray);
  // });

  const filterDiscussed = filter.querySelector(`#filter-discussed`);

  // filterDiscussed.addEventListener(`click`, function () {
  //   window.gallery.removeAllPictures();
  //   filter.querySelector(`.img-filters__button--active`).classList.remove(`img-filters__button--active`);
  //   filterDiscussed.classList.add(`img-filters__button--active`);
  //   const discussArray = sortCommentedDesc(window.data.get());
  //   window.gallery.renderPictures(discussArray);
  // });

  const getRandomData = function (array) {
    return array.slice().sort(function () {
      return Math.random() - 0.5;
    }).slice(0, 10);
  };

  const sortCommentedDesc = function (array) {
    return array.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  const filterForm = filter.querySelector(`.img-filters__form`);

  const filterPhotos = function (evt) {
    window.gallery.removeAllPictures();
    filter.querySelector(`.img-filters__button--active`).classList.remove(`img-filters__button--active`);
    let filteredList = [];
    switch (evt.target.id) {
      case `filter-default`:
        filterDefault.classList.add(`img-filters__button--active`);
        filteredList = window.data.get();
        break;
      case `filter-random`:
        filterRandom.classList.add(`img-filters__button--active`);
        filteredList = getRandomData(window.data.get());
        break;
      case `filter-discussed`:
        filterDiscussed.classList.add(`img-filters__button--active`);
        filteredList = sortCommentedDesc(window.data.get());
        break;
    }
    window.gallery.renderPictures(filteredList);
  };

  filterForm.addEventListener(`click`, window.debounce(filterPhotos));

  window.filter = {
    activateFilters
  };

})();
