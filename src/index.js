import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import axios from 'axios';

const API_KEY = '37446225-ced4f53dd81a7d760f8a029fd';
const BASE_URL = 'https://pixabay.com/api/';

const galleryEl = document.querySelector('.gallery');
const btnLoadMoreEl = document.querySelector('.load-more');

let currentPage = 1;
let userSearch = '';

document
  .getElementById('search-button')
  .addEventListener('click', function (event) {
    event.preventDefault();
    btnLoadMoreEl.hidden = false;
    // Отримуємо значення, введене користувачем у текстове поле
    userSearch = document.getElementsByName('searchQuery')[0].value;
    if (userSearch !== '') {
      galleryEl.innerHTML = '';
      currentPage = 1;
      console.log('currentPage', currentPage);
    }
    //  Bиведення значення у консоль:
    console.log('Пошуковий запит:', userSearch);
    fetchIMG(currentPage);
  });

btnLoadMoreEl.addEventListener('click', () => {
  console.log('loadMore');
  currentPage += 1;
  console.log('cuPAGE', currentPage);
  fetchIMG(currentPage);
});
async function fetchIMG() {
  console.log('inputValue');
  return axios
    .get(`${BASE_URL}`, {
      params: {
        key: API_KEY,
        q: userSearch,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 4,
        page: currentPage,
      },
    })
    .then(response => {
      console.log('response.data.hits', response.data);
      if (response.data.hits.length === 0) {
        btnLoadMoreEl.hidden = true;
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
      } else {
        Notiflix.Notify.success(
          `Hooray! We found ${response.data.totalHits} images.`
        );
      }
      renderCard(response.data);
    })
    .catch(error => console.log('error', error));
}

function renderCard(items) {
  console.log('render', items);
  items.hits.forEach(item => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('photo-card');
    cardEl.innerHTML = `
      <a href="${item.largeImageURL}" data-lightbox="gallery">
        <img src="${item.webformatURL}" alt="${item.tags}" width="400" height="300" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes<span class='span'>${item.likes}</span> </b>
        </p>
        <p class="info-item">
          <b>Views <span class='span'>${item.views}</span></b>
        </p>
        <p class="info-item">
          <b>Comments<span class='span'>${item.comments}</span></b>
        </p>
        <p class="info-item">
          <b>Downloads <span class='span'>${item.downloads}</span></b>
        </p>
      </div>
    `;
    galleryEl.appendChild(cardEl);
  });

  const lightbox = new SimpleLightbox('.gallery a', {});
}
