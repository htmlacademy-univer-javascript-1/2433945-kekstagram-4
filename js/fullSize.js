import { pictures } from './data.js';
import { AVATAR_HEIGHT, AVATAR_WIDTH } from './data.js';

const picturesList = document.querySelector('.pictures');
const fullSizePicture = document.querySelector('.big-picture');
const cancelButton = fullSizePicture.querySelector('.cancel');
const commentLoaderButton = fullSizePicture.querySelector('.comments-loader');

const closeFullSizePicture = () => {
  fullSizePicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentLoaderButton.classList.remove('hidden');
};

const loadComments = (hiddenComments) => {
  let commentCount = 5;
  if (hiddenComments.length <= commentCount) {
    commentCount = hiddenComments.length;
    commentLoaderButton.classList.add('hidden');
  }
  for (let i = 0; i < commentCount; i++) {
    hiddenComments[i].classList.remove('hidden');
  }
  const commentsShown = fullSizePicture.querySelector('.comments-shown');
  commentsShown.textContent = Number(commentsShown.textContent) + commentCount;
};

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeFullSizePicture();
  }
});

cancelButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeFullSizePicture();
});

const buildComment = ({avatar, message, name}) => {
  const liElement = document.createElement('li');
  const imgComment = document.createElement('img');
  const pElement = document.createElement('p');

  liElement.classList.add('social__comment');
  liElement.classList.add('hidden');
  pElement.classList.add('social__text');
  imgComment.classList.add('social__picture');
  imgComment.src = avatar;
  imgComment.alt = name;
  imgComment.width = AVATAR_WIDTH;
  imgComment.height = AVATAR_HEIGHT;
  pElement.textContent = message;
  liElement.appendChild(imgComment);
  liElement.appendChild(pElement);

  return liElement;
};

const createCommentsBlock = (comments) =>{
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentItem = buildComment(comment);
    fragment.append(commentItem);
  });
  return fragment;
};

const showFullSizePicture = ({url, description, likes, comments}) =>{
  fullSizePicture.querySelector('.big-picture__img').querySelector('img').src = url;
  fullSizePicture.querySelector('.social__caption').textContent = description;
  fullSizePicture.querySelector('.likes-count').textContent = likes;
  fullSizePicture.querySelector('.comments-count').textContent = comments.length;
  fullSizePicture.querySelector('.comments-shown').textContent = '0';
  fullSizePicture.querySelector('.social__comments').innerHTML = '';

  fullSizePicture.querySelector('.social__comments').appendChild(createCommentsBlock(comments));
  loadComments(fullSizePicture.querySelector('.social__comments').querySelectorAll('.hidden'));
  fullSizePicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const getPictureById = (id) =>{
  const picture = pictures.find((el) => el.id === Number(id));
  return picture;
};

picturesList.addEventListener('click', (evt) => {
  evt.preventDefault();
  const target = evt.target;

  if (target.tagName === 'IMG') {
    showFullSizePicture(getPictureById(target.id));
  }
});

commentLoaderButton.addEventListener('click', (evt) =>{
  evt.preventDefault();

  const hiddenComments = fullSizePicture.querySelector('.social__comments').querySelectorAll('.hidden');

  loadComments(hiddenComments);
});
