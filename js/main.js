import { renderMiniatures } from './miniature.js';
import { initEditPopup } from './form.js';
import { getData } from './api.js';
import { debounce, showAlert } from './util.js';
import { initFilters } from './filters.js';

getData()
  .then((pictures) => {
    renderMiniatures(pictures);
    initFilters(pictures, debounce(renderMiniatures));
  })
  .catch((err) => showAlert(err.message));

initEditPopup();
