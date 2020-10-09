'use strict'

const PHOTOS_AMOUNT = 25;

const AVATARS_AMOUNT = 6;

const allLikes = {
  min: 15,
  max: 200
};

// Рандомизатор
const getRandomNumber = function (min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

const getAvatarNumber = function () {
  return getRandomNumber(1, AVATARS_AMOUNT);
}

const getLikesNumber = function () {
  return getRandomNumber(allLikes.min, allLikes.max);
}

const getMessage = function () {
  const allMessages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  return allMessages[getRandomNumber(1, allMessages.length)];
}

const getName = function () {
  const allNames = [
    'Пётр',
    'Елена',
    'Владимир',
    'Алексей',
    'Анастасия',
    'Владислав',
    'Евгений',
    'Анжела',
    'Илья',
    'Стас',
    'Борис',
    'Фёдор',
    'Олег',
    'Мария',
    'Екатерина',
    'Полина'
  ];

  return allNames[getRandomNumber(1, allNames.length)];
}

const getComment = function () {
  return {
    avatar: `img/avatar-${getAvatarNumber()}.svg`,
    message: getMessage(),
    name: getName()
  }
}

const getComments = function () {
  let comments = [];
  for (let i = 0; i <= getRandomNumber(0, AVATARS_AMOUNT); i++) {
    comments.push(getComment());
  }
  return comments;
}

// Главная функция

const getPhotos = function () {
  let photos = [];
  for (let i = 1; i <= PHOTOS_AMOUNT; i++) {
    photos.push(
      {
        url: `photos/${i}.jpg`,
        description: `Фото номер ${i}`,
        likes: getLikesNumber(),
        comments: getComments()
      }
    );
  }
  return photos;
}

const photosList = getPhotos();

const pictureList = document.querySelector('.pictures');

const picture = document.querySelector('#picture').content;
const pictureElement = picture.querySelector('.picture');

for (var i = 0; i < PHOTOS_AMOUNT; i++) {
  const clonedElement = pictureElement.cloneNode(true);

  const pictureImage = clonedElement.querySelector('.picture__img');
  // const pictureDescription = clonedElement.querySelector('.picture__info');
  const pictureComments = clonedElement.querySelector('.picture__comments');
  const pictureLikes = clonedElement.querySelector('.picture__likes');

  pictureImage.src = photosList[i].url;
  pictureImage.alt = photosList[i].description;
  pictureComments.textContent = photosList[i].comments.length;
  pictureLikes.textContent = photosList[i].likes;

  pictureList.appendChild(clonedElement);
}
