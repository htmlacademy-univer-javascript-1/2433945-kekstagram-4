import { isEscapeKey } from './util.js';
import { initEffects, initScale, resetEffects } from './slider.js';
import { sendData } from './api.js';
import { showErrorMessage, showSuccessMessage } from './message.js';

const VALID_SYMBOLS = /^#[a-zа-ё0-9]{1,19}$/i;
const VALID_FILE_TYPES = ['jpg', 'jpeg', 'png'];
const MAX_HASHTAG_COUNT = 5;

const SubmitButtonText = {
  DEFAULT: 'Опубликовать',
  SENDING: 'Публикую...'
};

const ErrorText = {
  INVALID_HASHTAGS_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE_HASHTAG: 'Не уникальный хэштег',
  INVALID_PATTERN_HASHTAG: 'Неправильный хэштег',
  INVALID_LENGTH: 'Слишком длинный комментарий',
};

const bodyElement = document.querySelector('body');
const inputUploadElement = bodyElement.querySelector('.img-upload__input');
const formElement = bodyElement.querySelector('.img-upload__form');
const overlayElement = bodyElement.querySelector('.img-upload__overlay');
const cancelButtonElement = overlayElement.querySelector('.img-upload__cancel');
const hashtagFieldElement = formElement.querySelector('.text__hashtags');
const descriptionFieldElement = formElement.querySelector('.text__description');
const submitButtonElement = formElement.querySelector('.img-upload__submit');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const isTextFieldFocused = () =>
  document.activeElement === hashtagFieldElement || document.activeElement === descriptionFieldElement;

const normilizeHashtags = (hashtagString) => hashtagString.trim().split(' ').filter((hashtag) => hashtag.length > 0);
const validateHashtagCount = (value) => normilizeHashtags(value).length <= MAX_HASHTAG_COUNT;
const validateHashtags = (value) => normilizeHashtags(value).every((hashtag) => VALID_SYMBOLS.test(hashtag));
const validateDescription = (value) => value.length <= 140;

const validateUniqueHashtag = (value) => {
  const lowerCaseHashtags = normilizeHashtags(value).map((hashtag) => hashtag.toLowerCase());
  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};

const isValidFileType = () => {
  const file = inputUploadElement.files[0];
  return VALID_FILE_TYPES.some((type) => file.name.endsWith(type));
};

const initValidation = () => {
  pristine.addValidator(hashtagFieldElement, validateUniqueHashtag, ErrorText.NOT_UNIQUE_HASHTAG);
  pristine.addValidator(hashtagFieldElement, validateHashtagCount, ErrorText.INVALID_HASHTAGS_COUNT);
  pristine.addValidator(hashtagFieldElement, validateHashtags, ErrorText.INVALID_PATTERN_HASHTAG);
  pristine.addValidator(descriptionFieldElement, validateDescription, ErrorText.INVALID_DESCRIPTION);
};

const openEditPopup = () => {
  bodyElement.classList.add('modal-open');
  overlayElement.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeyDown);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  formElement.addEventListener('submit', onFormElementSubmit);
};

const resetEditPopup = () => {
  bodyElement.classList.remove('modal-open');
  overlayElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeyDown);
  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
  formElement.removeEventListener('submit', onFormElementSubmit);
  formElement.reset();
  pristine.reset();
  resetEffects();
};

function onCancelButtonClick() {
  resetEditPopup();
}

const toggleSubmitButton = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
  if (isDisabled) {
    submitButtonElement.textContent = SubmitButtonText.SENDING;
  } else {
    submitButtonElement.textContent = SubmitButtonText.IDLE;
  }
};

function onFormElementSubmit(evt) {
  evt.preventDefault();
  if (pristine.validate()) {
    toggleSubmitButton(true);
    sendData(new FormData(evt.target))
      .then(() => {
        resetEditPopup();
        showSuccessMessage();
      })
      .catch(showErrorMessage)
      .finally(toggleSubmitButton);
  }
}

const onInputUploadElementChange = () => {
  if (isValidFileType()){
    openEditPopup();
    initValidation();
    initScale();
    initEffects();
  } else {
    showErrorMessage();
    formElement.reset();
  }
};

function onDocumentKeyDown(evt) {
  if (isEscapeKey && !isTextFieldFocused()) {
    evt.preventDefault();
    resetEditPopup();
  }
}

const initEditPopup = () => {
  inputUploadElement.addEventListener('change', onInputUploadElementChange);
};

export { initEditPopup };
