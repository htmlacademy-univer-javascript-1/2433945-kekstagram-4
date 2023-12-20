import { isEscapeKey } from './util.js';

const COMMENTS_LOADED_COUNT = 5;

const bigPictureElement = document.querySelector('.big-picture');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentsShownCountElement = bigPictureElement.querySelector('.comments-shown');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const loadButtonElement = bigPictureElement.querySelector('.social__comments-loader');
const bodyElement = document.querySelector('body');

let commentsShownCount = 0;
let commentsArray= [];

const getCommentTemplate = (comment) => `
  <li class="social__comment">
    <img
      class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
    <p class="social__text">${comment.message}</p>
  </li>`;

const renderComments = () => {
  commentsShownCount += COMMENTS_LOADED_COUNT;
  loadButtonElement.classList.toggle('hidden', commentsShownCount >= commentsArray.length);
  const commentsSet = commentsArray.slice(0, commentsShownCount);
  commentsListElement.innerHTML = commentsSet.map((comment) => getCommentTemplate(comment)).join('');
  commentsShownCountElement.textContent = commentsShownCount;
};

const onLoadButtonClick = () => {
  renderComments();
};

const loadComments = () => {
  renderComments();
  loadButtonElement.addEventListener('click', onLoadButtonClick);
};

const hideComments = () => {
  loadButtonElement.removeEventListener('click', onLoadButtonClick);
  commentsShownCount = 0;
};

const renderPicture = (picture) => {
  bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.social__caption').textContent = picture.description;
  bigPictureElement.querySelector('.comments-count').textContent = commentsArray.length;
};


const closeFullsizePicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeyDown);
  hideComments();
};

function onDocumentKeyDown(evt) {
  if (isEscapeKey) {
    evt.preventDefault();
    closeFullsizePicture();
  }
}

const onCancelButtonClick = () => {
  closeFullsizePicture();
};

const showFullsizePicture = (picture) => {
  commentsArray= picture.comments.slice();
  renderPicture(picture);
  loadComments();
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
};

export { showFullsizePicture };
