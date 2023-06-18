const API_KEY = '37446225-ced4f53dd81a7d760f8a029fd';
const BASE_URL = 'https://pixabay.com/api/';
let currentPage = 1;

const galleryEl = document.querySelector('.gallery');
const btnLoadMoreEl = document.querySelector('.load-more');
let userSearch = '';
// const formEl = document.querySelector('#search-form');

document
  .getElementById('search-button')
  .addEventListener('click', function (event) {
    event.preventDefault();
    // Отримуємо значення, введене користувачем у текстове поле
    userSearch = document.getElementsByName('searchQuery')[0].value;
    if (userSearch !== '') {
      galleryEl.innerHTML = '';
      currentPage = 1;
      console.log('currentPage', currentPage);
    }
    // Приклад виведення значення у консоль:
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
  console.log('jsondata', jsonData);
  renderCard(jsonData);
}

function renderCard(items) {
  items.hits.forEach(item => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('photo-card');
    cardEl.innerHTML = `
      <img src="${item.webformatURL}" alt="${item.tags}" width="400" height="300" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes<span>${item.likes}</span> </b>
        </p>
        <p class="info-item">
          <b>Views <span>${item.views}</span></b>
        </p>
        <p class="info-item">
          <b>Comments<span>${item.comments}</span></b>
        </p>
        <p class="info-item">
          <b>Downloads <span>${item.downloads}</span></b>
        </p>
      </div>
    `;
    galleryEl.appendChild(cardEl);
  });
}
