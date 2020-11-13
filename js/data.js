'use strict';

(() => {

  let data = [];

  const getData = () => {
    return data;
  };

  const setData = (newData) => {
    data = newData;
  };

  window.data = {
    get: getData,
    set: setData
  };

})();
