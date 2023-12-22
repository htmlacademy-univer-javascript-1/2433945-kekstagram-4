import { renderMiniatures } from './miniature.js';
import { initEditPopup } from './form.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

getData().then((pictures) => renderMiniatures(pictures)).catch((error) => showAlert(error.message));

initEditPopup();
