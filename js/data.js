import {getRandomInteger, getRandomArrayElement } from './util.js';
const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_MAX_COUNT = 200;
const COMMENT_COUNT = 30;
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо.',
  'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const CHARACTERISTICS = [
  'Милый котик',
  'Это фото моей жены',
  'Закатное солнце в Калифорнии',
  'Рисунок пятилетней Кати',
  'Портрет Эйнштейна',
  'Показания счётчиков за 15 апреля',
];

const createPublicPhoto = () => ({
  id: getRandomInteger(1, PICTURE_COUNT),
  url: photos/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg,
  description: getRandomArrayElement(PICTURE_CHARACTERISTICS),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from({ length: getRandomInteger(0, COMMENT_COUNT) }, createComment),
});


const generatePhotos = () =>
  Array.from({ length: PICTURE_COUNT }, (_, photoIndex) =>
    createPublicPhoto(photoIndex + 1)
  );

const createComment = () => ({
  id: getRandomInteger(1, COMMENT_MAX_COUNT),
  avatar: img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const getRandomSentences = () => {
  const chosenSentences = [];
  const usedIndices = [];
  if (getRandomInteger(1, 2) === 1) {
    const randomIndex = Math.floor(Math.random() * MESSAGES.length);
    return MESSAGES[randomIndex];
  } else {
    while (chosenSentences.length < 2) {
      const randomIndex = Math.floor(Math.random() * MESSAGES.length);
      if (!usedIndices.includes(randomIndex)) {
        chosenSentences.push(MESSAGES[randomIndex]);
        usedIndices.push(randomIndex);
      }
    }
  }
  return chosenSentences;
};
export { generatePhotos };
