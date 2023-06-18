import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
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

    logJSONData(currentPage);
  });

btnLoadMoreEl.addEventListener('click', () => {
  console.log('loadMore');
  currentPage += 1;
  logJSONData(currentPage);
});

async function logJSONData(currentPage) {
  console.log('message', userSearch);
  const response = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${userSearch}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`
  );
  const jsonData = await response.json();
  if (jsonData.hits.length === 0) {
    Notiflix.Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
  } else {
    Notiflix.Notify.success(`Hooray! We found ${jsonData.totalHits} images.`);
  }
  console.log('jsondata', jsonData);
  renderCard(jsonData);
}

function renderCard(items) {
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

  // Ініціалізуємо Simplelightbox після додавання зображень до DOM
  const lightbox = new SimpleLightbox('.gallery a', {});
}
