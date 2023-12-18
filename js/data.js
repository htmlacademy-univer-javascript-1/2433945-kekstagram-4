import { generateID, getRandomArrayElement, getRandomInteger } from './util.js';

const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUNT = 30;
const COMMENT_MIN_COUNT = 1;
const COMMENT_MAX_COUNT = 2;
const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 35;
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

const CHARACTERISTICS = [
  'Милый котик',
  'Это фото моей жены',
  'Закатное солнце в Калифорнии',
  'Рисунок пятилетней Кати',
  'Портрет Эйнштейна',
  'Показания счётчиков за 15 апреля',
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
  'Лев'
];

const generateCommentID = generateID();

const createMessage = () => Array.from(
  { length: getRandomInteger(COMMENT_MIN_COUNT, COMMENT_MAX_COUNT) },
  () => getRandomArrayElement(MESSAGES),
).join(' ');

const createComment = () => ({
  id: generateCommentID(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(CHARACTERISTICS),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from(
    { length: getRandomInteger(0, COMMENT_COUNT) },
    createComment,
  ),
});

const getPictures = () => Array.from (
  { length : PICTURE_COUNT },
  (_, pictureIndex) => createPicture(pictureIndex + 1),
);

const pictures = getPictures();

export { pictures, AVATAR_WIDTH, AVATAR_HEIGHT};
