'use strict';

(function () {

  let data = [];

  const getData = function () {
    return data;
  };

  const setData = function (newData) {
    data = newData;
  };

  window.data = {
    get: getData,
    set: setData
  };

})();
