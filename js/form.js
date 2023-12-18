const MAX_HASHTEGS = 5;
const MAX_COMMENTS_LENGTH = 140;

const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const body = document.body;
const form = document.querySelector('.img-upload__form');
const pictureInput = form.querySelector('input[name="filename"]');
const cancelButton = form.querySelector('#upload-cancel');
const pictureOverlay = form.querySelector('.img-upload__overlay');
const textDescriptionElement = form.querySelector('.text__description');
const textHashtagsElement = form.querySelector('.text__hashtags');
const scale = form.querySelector('input[name="scale"]');

const ErrorText = {
  INVALID_COUNT:  `Максимум ${MAX_HASHTEGS} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег',
  INVALID_LENGTH: 'Комментарий не может быть длиннее 140 символов'
};

const isTextFiledFocused = () =>
  document.activeElement === textHashtagsElement ||
  document.activeElement === textDescriptionElement;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const closeOverlay =() => {
  if (isTextFiledFocused()){
    return;
  }
  body.classList.remove('modal-open');
  pictureOverlay.classList.add('hidden');
  cancelButton.removeEventListener('click', closeOverlay);
  pristine.reset();
  pictureInput.value = '';
};

pictureInput.addEventListener('change', () => {
  pictureOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  cancelButton.addEventListener('click', closeOverlay);
});

const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) =>  Boolean(tag.length));

const validateHashtags = (value) =>  normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const validateHashtagsCount = (value) => normalizeTags(value).length <= MAX_HASHTEGS;

const validateHashtagsRepeate = (value) =>  {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateComment = (value) => value.length <= MAX_COMMENTS_LENGTH;

pristine.addValidator(
  textDescriptionElement,
  validateComment,
  ErrorText.INVALID_LENGTH
);

pristine.addValidator( textHashtagsElement, validateHashtagsRepeate, ErrorText.NOT_UNIQUE, 1, true );

pristine.addValidator( textHashtagsElement, validateHashtags, ErrorText.INVALID_PATTERN, 2, true );

pristine.addValidator( textHashtagsElement, validateHashtagsCount, ErrorText.INVALID_COUNT, 3, true );

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if(pristine.validate()){
    closeOverlay();
    pictureInput.value = '';
    textDescriptionElement.value = '';
    textHashtagsElement.value = '';
    scale.value = '100%';
  }
});

export {closeOverlay};
