import { pictures } from './data.js';

const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 35;

const picturesList = document.querySelector('.pictures');
const fullSizePicture = document.querySelector('.big-picture');
const cancelButton = fullSizePicture.querySelector('.cancel');

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    fullSizePicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

cancelButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  fullSizePicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

const buildComment = ({avatar, message, name}) => {
  const liElement = document.createElement('li');
  const imgComment = document.createElement('img');
  const pElement = document.createElement('p');

  liElement.classList.add('social__comment');
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

  fullSizePicture.querySelector('.social__comments').appendChild(createCommentsBlock(comments));
  fullSizePicture.querySelector('.social__comment-count').classList.add('hidden');
  fullSizePicture.querySelector('.comments-loader').classList.add('hidden');
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
