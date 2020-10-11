'use strict';

const PHOTOS_AMOUNT = 25;

const AVATARS_AMOUNT = 6;

const allLikes = {
  min: 15,
  max: 200
};

// Рандомизатор
const getRandomNumber = function (min, max) {
  return min + Math.floor(Math.random() * (max - min));
};

const getAvatarNumber = function () {
  return getRandomNumber(1, AVATARS_AMOUNT);
};

const getLikesNumber = function () {
  return getRandomNumber(allLikes.min, allLikes.max);
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
  for (let i = 0; i <= getRandomNumber(0, AVATARS_AMOUNT); i++) {
    comments.push(getComment());
  }
  return comments;
};

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
};

const photosList = getPhotos();

const pictureList = document.querySelector(`.pictures`);

const picture = document.querySelector(`#picture`).content;
const pictureElement = picture.querySelector(`.picture`);

for (let i = 0; i < PHOTOS_AMOUNT; i++) {
  const clonedElement = pictureElement.cloneNode(true);

  const pictureImage = clonedElement.querySelector(`.picture__img`);
  // const pictureDescription = clonedElement.querySelector(`.picture__info`);
  const pictureComments = clonedElement.querySelector(`.picture__comments`);
  const pictureLikes = clonedElement.querySelector(`.picture__likes`);

  pictureImage.src = photosList[i].url;
  pictureImage.alt = photosList[i].description;
  pictureComments.textContent = photosList[i].comments.length;
  pictureLikes.textContent = photosList[i].likes;

  pictureList.appendChild(clonedElement);
}

// Приближённая фотография

const mainPicture = document.querySelector(`.big-picture`);
mainPicture.classList.remove(`hidden`);

const mainPictureImg = mainPicture.querySelector(`.big-picture__img`);
mainPictureImg.children.src = photosList[0].url;

const mainPictureLikes = mainPicture.querySelector(`.likes-count`);
mainPictureLikes.textContent = photosList[0].likes;

const mainPictureComments = mainPicture.querySelector(`.comments-count`);
mainPictureComments.textContent = photosList[0].comments.length;

// Создание списка комментариев

const commentList = document.querySelector(`.social__comments`);
const comment = document.createElement(`li`);
comment.classList.add(`social__comment`);
commentList.appendChild(comment);

const commentsAvatar = document.createElement(`img`);
commentsAvatar.classList.add(`social__picture`);
commentsAvatar.src = `img/avatar-${getAvatarNumber()}.svg`;
commentsAvatar.alt = getName();
const avatarWidth = 35;
const avatarHeight = avatarWidth;
commentsAvatar.width = avatarWidth;
commentsAvatar.height = avatarHeight;
comment.appendChild(commentsAvatar);

const commentsText = document.createElement(`p`);
commentsText.classList.add(`social__text`);
commentsAvatar.textContent = getMessage();
comment.appendChild(commentsText);


const mainPictureDescription = mainPicture.querySelector(`.social__caption`);
mainPictureDescription.textContent = photosList[0].description;


const commentsCounter = document.querySelector(`.social__comment-count`);
commentsCounter.classList.add(`hidden`);

const commentsDownload = document.querySelector(`.comments-loader`);
commentsDownload.classList.add(`hidden`);

const mainBody = document.querySelector(`body`);
mainBody.classList.add(`modal-open`);
