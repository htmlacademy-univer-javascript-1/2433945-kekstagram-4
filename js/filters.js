const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};
const PICTURES_COUNT = 10;
const FILTERS_BUTTON_CLASS = 'img-filters__button';
const FILTER_ACTIVE_CLASS = `${FILTERS_BUTTON_CLASS}--active`;

const filtersContainer = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let pictures = [];

const sortRandomly = () => Math.random() - 0.5;
const sortByCommentsCount = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const getRandomPicturesOrder = () => pictures.slice().sort(sortRandomly).slice(0, PICTURES_COUNT);
const getDiscussedPicturesOrder = () => pictures.slice().sort(sortByCommentsCount);

const filterHandlers = {
  [Filter.DEFAULT]: (data) => data,
  [Filter.RANDOM]: (data) => getRandomPicturesOrder(data),
  [Filter.DISCUSSED]: (data) => getDiscussedPicturesOrder(data)
};

const getFilteredPictures = () => filterHandlers[currentFilter]();

const setOnFilterClick = (callback) => {
  filtersContainer.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains(FILTERS_BUTTON_CLASS)) {
      return;
    }
    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }
    filtersContainer.querySelector(`.${FILTER_ACTIVE_CLASS}`).classList.remove(FILTER_ACTIVE_CLASS);
    clickedButton.classList.add(FILTER_ACTIVE_CLASS);
    currentFilter = clickedButton.id;
    callback(getFilteredPictures());
  });
};

const initFilters = (data, callback) => {
  pictures = data.slice();
  filtersContainer.classList.remove('img-filters--inactive');
  setOnFilterClick(callback);
};

export { initFilters };
