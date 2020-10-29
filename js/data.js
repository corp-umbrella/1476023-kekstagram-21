'use strict';

(function () {

  const getRandomNumber = function (min, max) {
    return min + Math.floor(Math.random() * (max - min));
  };

  const getAvatarNumber = function () {
    return getRandomNumber(1, window.main.AVATARS_AMOUNT);
  };

  const getLikesNumber = function () {
    return getRandomNumber(window.main.allLikes.min, window.main.allLikes.max);
  };

  const getMessage = function () {
    const allMessages = [
      `Всё отлично!`,
      `В целом всё неплохо. Но не всё.`,
      `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
      `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
      `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
      `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
    ];
    return allMessages[getRandomNumber(1, allMessages.length)];
  };

  const getName = function () {
    const allNames = [
      `Пётр`,
      `Елена`,
      `Владимир`,
      `Алексей`,
      `Анастасия`,
      `Владислав`,
      `Евгений`,
      `Анжела`,
      `Илья`,
      `Стас`,
      `Борис`,
      `Фёдор`,
      `Олег`,
      `Мария`,
      `Екатерина`,
      `Полина`
    ];

    return allNames[getRandomNumber(1, allNames.length)];
  };

  const getComment = function () {
    return {
      avatar: `img/avatar-${getAvatarNumber()}.svg`,
      message: getMessage(),
      name: getName()
    };
  };

  const getComments = function () {
    let comments = [];
    for (let i = 0; i <= getRandomNumber(0, window.main.AVATARS_AMOUNT); i++) {
      comments.push(getComment());
    }
    return comments;
  };

  window.data = {
    getLikesNumber: getLikesNumber,
    getComments: getComments
  };

})();
