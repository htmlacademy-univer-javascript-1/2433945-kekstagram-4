import { getRandomInteger, getRandomArrayElement } from './util.js';
import { PICTURE_COUNT, AVATAR_COUNT, LIKE_MIN_COUNT, LIKE_MAX_COUNT, COMMENT_MAX_COUNT, COMMENT_COUNT, MESSAGES, NAMES, CHARACTERISTICS,createPublicPhoto, createComment, getRandomSentences } from './data.js';

const photos = [];

for (let i = 0; i < PICTURE_COUNT; i++) {
  photos.add(createPublicPhoto());
}
