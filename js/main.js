'use strict';

(function () {
  const PHOTOS_AMOUNT = 25;
  const AVATARS_AMOUNT = 6;
  const allLikes = {
    min: 15,
    max: 200
  };

  window.main = {
    PHOTOS_AMOUNT: PHOTOS_AMOUNT,
    AVATARS_AMOUNT: AVATARS_AMOUNT,
    allLikes: allLikes
  };
})();

// Рандомизатор
// const getRandomNumber = function (min, max) {
//   return min + Math.floor(Math.random() * (max - min));
// };

// const getAvatarNumber = function () {
//   return getRandomNumber(1, AVATARS_AMOUNT);
// };

// const getLikesNumber = function () {
//   return getRandomNumber(allLikes.min, allLikes.max);
// };

// const getMessage = function () {
//   const allMessages = [
//     `Всё отлично!`,
//     `В целом всё неплохо. Но не всё.`,
//     `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
//     `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
//     `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
//     `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
//   ];
//   return allMessages[getRandomNumber(1, allMessages.length)];
// };

// const getName = function () {
//   const allNames = [
//     `Пётр`,
//     `Елена`,
//     `Владимир`,
//     `Алексей`,
//     `Анастасия`,
//     `Владислав`,
//     `Евгений`,
//     `Анжела`,
//     `Илья`,
//     `Стас`,
//     `Борис`,
//     `Фёдор`,
//     `Олег`,
//     `Мария`,
//     `Екатерина`,
//     `Полина`
//   ];

//   return allNames[getRandomNumber(1, allNames.length)];
// };

// const getComment = function () {
//   return {
//     avatar: `img/avatar-${getAvatarNumber()}.svg`,
//     message: getMessage(),
//     name: getName()
//   };
// };

// const getComments = function () {
//   let comments = [];
//   for (let i = 0; i <= getRandomNumber(0, AVATARS_AMOUNT); i++) {
//     comments.push(getComment());
//   }
//   return comments;
// };

// Главная функция

// const getPhotos = function () {
//   let photos = [];
//   for (let i = 1; i <= PHOTOS_AMOUNT; i++) {
//     photos.push({
//       url: `photos/${i}.jpg`,
//       description: `Фото номер ${i}`,
//       likes: getLikesNumber(),
//       comments: getComments()
//     }
//     );
//   }
//   return photos;
// };

// const photosList = getPhotos();

// const pictureList = document.querySelector(`.pictures`);

// const picture = document.querySelector(`#picture`).content;

// const pictureElement = picture.querySelector(`.picture`);

// const mainPicture = document.querySelector(`.big-picture`);

// const mainPictureClose = mainPicture.querySelector(`.big-picture__cancel`);

// const onMainPictureEscPress = function (evt) {
//   if (evt.key === `Escape`) {
//     evt.preventDefault();
//     closeMainPicture();
//   }
// };

// const closeMainPicture = function () {
//   mainPicture.classList.add(`hidden`);
//   mainBody.classList.remove(`modal-open`);
//   document.removeEventListener(`keydown`, onMainPictureEscPress);
// };

// for (let i = 0; i < PHOTOS_AMOUNT; i++) {
//   const clonedElement = pictureElement.cloneNode(true);

//   const pictureImage = clonedElement.querySelector(`.picture__img`);
//   // const pictureDescription = clonedElement.querySelector(`.picture__info`);
//   const pictureComments = clonedElement.querySelector(`.picture__comments`);
//   const pictureLikes = clonedElement.querySelector(`.picture__likes`);

//   pictureImage.src = photosList[i].url;
//   pictureImage.alt = photosList[i].description;
//   pictureComments.textContent = photosList[i].comments.length;
//   pictureLikes.textContent = photosList[i].likes;

//   pictureList.appendChild(clonedElement);

//   clonedElement.addEventListener(`click`, function () {
//     showBigPicture(photosList[i]);
//   });
// }

// -------------------------------Приближённая фотография

// const showBigPicture = function (pictureInfo) {
//   mainPicture.classList.remove(`hidden`);
//   mainBody.classList.add(`modal-open`);
//   document.addEventListener(`keydown`, onMainPictureEscPress);

//   const mainPictureImg = mainPicture.querySelector(`.big-picture__img`);
//   mainPictureImg.children[0].src = pictureInfo.url;

//   const mainPictureLikes = mainPicture.querySelector(`.likes-count`);
//   mainPictureLikes.textContent = pictureInfo.likes;

//   const mainPictureComments = mainPicture.querySelector(`.comments-count`);
//   mainPictureComments.textContent = pictureInfo.comments.length;

//   // Создание списка комментариев

//   renderComments(pictureInfo.comments);

//   const mainPictureDescription = mainPicture.querySelector(`.social__caption`);
//   mainPictureDescription.textContent = pictureInfo.description;

//   mainPictureClose.addEventListener(`click`, function () {
//     closeMainPicture();
//   });

//   mainPictureClose.addEventListener(`keydown`, function (evt) {
//     if (evt.key === `Enter`) {
//       closeMainPicture();
//     }
//   });
// };

// const renderComments = function (comments) {
//   const commentList = document.querySelector(`.social__comments`);
//   commentList.innerHTML = ``;

//   for (let i = 0; i < comments.length; i++) {
//     const comment = document.createElement(`li`);
//     comment.classList.add(`social__comment`);
//     commentList.appendChild(comment);

//     const commentsAvatar = document.createElement(`img`);
//     commentsAvatar.classList.add(`social__picture`);
//     commentsAvatar.src = comments[i].avatar;
//     commentsAvatar.alt = comments[i].name;
//     const avatarWidth = 35;
//     const avatarHeight = avatarWidth;
//     commentsAvatar.width = avatarWidth;
//     commentsAvatar.height = avatarHeight;
//     comment.appendChild(commentsAvatar);

//     const commentsText = document.createElement(`p`);
//     commentsText.classList.add(`social__text`);
//     commentsText.textContent = comments[i].message;
//     comment.appendChild(commentsText);
//   }
// };

// const commentsCounter = document.querySelector(`.social__comment-count`);
// commentsCounter.classList.add(`hidden`);

// const commentsDownload = document.querySelector(`.comments-loader`);
// commentsDownload.classList.add(`hidden`);

// const mainBody = document.querySelector(`body`);
// mainBody.classList.add(`modal-open`);

// --------------------------- Задание 4

// // Обработчик на открытие и закрытие загрузки фото

// const uploadOpen = document.querySelector(`#upload-file`);
// const upload = document.querySelector(`.img-upload__overlay`);
// const uploadClose = upload.querySelector(`#upload-cancel`);

// const onUploadEscPress = function (evt) {
//   if (evt.key === `Escape`) {
//     evt.preventDefault();
//     closeUpload();
//   }
// };

// const openUpload = function () {
//   upload.classList.remove(`hidden`);
//   mainBody.classList.add(`modal-open`);

//   document.addEventListener(`keydown`, onUploadEscPress);
// };

// const closeUpload = function () {
//   upload.classList.add(`hidden`);
//   mainBody.classList.remove(`modal-open`);
//   document.removeEventListener(`keydown`, onUploadEscPress);
// };

// uploadOpen.addEventListener(`change`, function () {
//   openUpload();
// });

// uploadOpen.addEventListener(`keydown`, function (evt) {
//   if (evt.key === `Enter`) {
//     openUpload();
//   }
// });

// uploadClose.addEventListener(`click`, function () {
//   closeUpload();
// });

// uploadClose.addEventListener(`keydown`, function (evt) {
//   if (evt.key === `Enter`) {
//     closeUpload();
//   }
// });

// // Хештеги

// const uploadHashtag = upload.querySelector(`.text__hashtags`);

// uploadHashtag.addEventListener(`focus`, function () {
//   document.removeEventListener(`keydown`, onUploadEscPress);
// });

// uploadHashtag.addEventListener(`blur`, function () {
//   document.addEventListener(`keydown`, onUploadEscPress);
// });

// uploadHashtag.addEventListener(`input`, function (evt) {
//   const hashTags = evt.target.value.toLowerCase().split(` `);

//   if (!checkHashtagsLength(hashTags)) {
//     uploadHashtag.setCustomValidity(`Неправильная длина хэштега: минимум 1 символ, максимум 20`);
//   } else if (!isUniTag(hashTags)) {
//     uploadHashtag.setCustomValidity(`Хэштеги должны быть уникальными`);
//   } else if (!isRightTagFormat(hashTags)) {
//     uploadHashtag.setCustomValidity(`Из символов допускается только # в начале тега`);
//   } else if (hashTags.length > 5) {
//     uploadHashtag.setCustomValidity(`Можно указать не больше пяти хэштегов`);
//   } else {
//     uploadHashtag.setCustomValidity(``);
//   }
// });

// const isRightTagFormat = function (hashTags) {
//   for (let i = 0; i < hashTags.length; i++) {
//     if (!hashTags[i].match(/^#[0-9a-zа-я]+$/)) {
//       return false;
//     }
//   }

//   return true;
// };

// const checkHashtagsLength = function (hashTags) {
//   for (let i = 0; i < hashTags.length; i++) {
//     if (hashTags[i].length <= 1 || hashTags[i].length > 20) {
//       return false;
//     }
//   }

//   return true;
// };

// const isUniTag = function (hashTags) {
//   const unicHashtagsList = {};
//   for (let i = 0; i < hashTags.length; i++) {
//     if (hashTags[i] in unicHashtagsList) {
//       return false;
//     } else {
//       unicHashtagsList[hashTags[i]] = true;
//     }
//   }

//   return true;
// };

// // Редактирование изображения и ограничения, накладываемые на поля: Масштаб

// const scaleSmaller = document.querySelector(`.scale__control--smaller`);
// const scaleBigger = document.querySelector(`.scale__control--bigger`);
// const scaleValue = document.querySelector(`.scale__control--value`);
// const uploadPreview = document.querySelector(`.img-upload__preview`);
// const uploadPreviewImage = uploadPreview.querySelector(`img`);
// const scaleValueDefault = 100;
// const scaleValueMin = 25;
// const scaleValueMax = 100;
// scaleValue.value = scaleValueDefault;
// const scaleStep = 25;

// scaleSmaller.addEventListener(`click`, function (evt) {
//   if (scaleValue.value > scaleValueMin && scaleValue.value <= scaleValueMax) {
//     evt.preventDefault();
//     scaleValue.value = +scaleValue.value - scaleStep;
//     uploadPreviewImage.style.transform = `scale(${scaleValue.value / 100})`;
//   }
// });

// scaleBigger.addEventListener(`click`, function (evt) {
//   if (scaleValue.value >= scaleValueMin && scaleValue.value < scaleValueMax) {
//     evt.preventDefault();
//     scaleValue.value = +scaleValue.value + scaleStep;
//     uploadPreviewImage.style.transform = `scale(${scaleValue.value / 100})`;
//   }
// });

// // Редактирование изображения и ограничения, накладываемые на поля: Наложение эффекта на изображение

// const effectItems = document.querySelectorAll(`.effects__radio`);
// const saturationToggle = document.querySelector(`.effect-level__pin`);
// // const saturationValue = document.querySelector(`.effect-level__value`);
// const saturationSlider = document.querySelector(`.effect-level__line`);

// for (let i = 0; i < effectItems.length; i++) {
//   effectItems[i].addEventListener(`change`, function (evt) {
//     if (evt.target.value === `chrome`) {
//       uploadPreviewImage.style.filter = ``;
//       uploadPreviewImage.className = `effects__preview--chrome`;
//     } else if (evt.target.value === `sepia`) {
//       uploadPreviewImage.style.filter = ``;
//       uploadPreviewImage.className = `effects__preview--sepia`;
//     } else if (evt.target.value === `marvin`) {
//       uploadPreviewImage.style.filter = ``;
//       uploadPreviewImage.className = `effects__preview--marvin`;
//     } else if (evt.target.value === `phobos`) {
//       uploadPreviewImage.style.filter = ``;
//       uploadPreviewImage.className = `effects__preview--phobos`;
//     } else if (evt.target.value === `heat`) {
//       uploadPreviewImage.style.filter = ``;
//       uploadPreviewImage.className = `effects__preview--heat`;
//     } else if (evt.target.value === `none`) {
//       uploadPreviewImage.style.filter = ``;
//       uploadPreviewImage.className = ``;
//     }
//   });
// }

// saturationToggle.addEventListener(`mouseup`, function () {
//   const percent = saturationToggle.offsetLeft / saturationSlider.offsetWidth;
//   switch (uploadPreviewImage.className) {
//     case `effects__preview--chrome`:
//       uploadPreviewImage.style.filter = `grayscale(${percent})`;
//       break;
//     case `effects__preview--sepia`:
//       uploadPreviewImage.style.filter = `sepia(${percent})`;
//       break;
//     case `effects__preview--marvin`:
//       uploadPreviewImage.style.filter = `invert(${percent * 100}%)`;
//       break;
//     case `effects__preview--phobos`:
//       uploadPreviewImage.style.filter = `blur(${percent * 3}px)`;
//       break;
//     case `effects__preview--heat`:
//       uploadPreviewImage.style.filter = `brightness(${1 + percent * 2})`;
//       break;
//     default:
//       uploadPreviewImage.style.filter = ``;
//   }
// });

// // Код для валидации комментария при загрузке нового изображения

// const uploadComment = upload.querySelector(`.text__description`);

// uploadComment.addEventListener(`focus`, function () {
//   document.removeEventListener(`keydown`, onUploadEscPress);
// });

// uploadComment.addEventListener(`blur`, function () {
//   document.addEventListener(`keydown`, onUploadEscPress);
// });

// uploadComment.addEventListener(`input`, function (evt) {
//   const uploadComments = evt.target.value.toLowerCase().split(` `);

//   if (!checkuploadCommentsLength(uploadComments)) {
//     uploadComment.setCustomValidity(`Комментарий должен быть не больше 140 символов`);
//   } else {
//     uploadComment.setCustomValidity(``);
//   }
// });

// const checkuploadCommentsLength = function (uploadComments) {
//   for (let i = 0; i < uploadComments.length; i++) {
//     if (uploadComments[i].length > 140) {
//       return false;
//     }
//   }

//   return true;
// };
