const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_MAX_COUNT = 200;
const COMMENT_COUNT = 30;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const createRandomId = createRandomIdFromRangeGenerator(1, 25);
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

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];


const createPublicPhoto = () => ({
  id: createRandomId(1, PICTURE_COUNT),
  url: 'photos/'+ getRandomInteger(1, PICTURE_COUNT)+'.jpg',
  description: getRandomArrayElement(CHARACTERISTICS),
  likes: getRandomInteger( LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from({ length: getRandomInteger(0, COMMENT_COUNT) }, createComment)
});

const createComment = () => ({
  id: createRandomId(1, COMMENT_MAX_COUNT) ,
  avatar: 'img/avatar-'+ getRandomInteger(1, AVATAR_COUNT) +'.svg',
  message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES)
});


function getRandomSentences() {
  const chosenSentences = [];
  const usedIndices = [];
  if (getRandomInteger(1,2) === 1){
    const randomIndex = Math.floor(Math.random() * MESSAGES.length);
    return MESSAGES[randomIndex];
  }
  else {
    while (chosenSentences.length < 2) {
    const randomIndex = Math.floor(Math.random() * MESSAGES.length);
      if (!usedIndices.includes(randomIndex)) {
        chosenSentences.push(MESSAGES[randomIndex]);
        usedIndices.push(randomIndex);
      }
    }
  }
  return chosenSentences;
}
