const API_KEY = '37446225-ced4f53dd81a7d760f8a029fd';
const BASE_URL = 'https://pixabay.com/api/';
let currentPage = 1;

// formEl = document.querySelector('#search-form');
galleryEl = document.querySelector('.gallery');
btnLoadMoreEl = document.querySelector('.load-more');
// btnSearchEl = document.querySelector('.searchBtn');

// let savedValue = 'q';

// formEl.addEventListener('input', function (event) {
//   savedValue = event.target.value;
//   console.log('message', savedValue);
// });
// btnSearchEl.addEventListener('click', function () {
//   console.log('message', savedValue);
// });

let userSearch = 'dog';

async function logJSONData(currentPage) {
  const response = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${userSearch}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`
  );
  const jsonData = await response.json();
  //   console.log(jsonData);
  renderCard(jsonData);
}
logJSONData();

function renderCard(items) {
  // Проходимо по кожному об'єкту в масиві hits
  items.hits.forEach(item => {
    console.log('item', item);
    // Створюємо новий елемент div для кожного об'єкту
    const cardEl = document.createElement('div');
    cardEl.classList.add('photo-card');
    // Створюємо розмітку для кожного об'єкту
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
    // Додаємо створений елемент до галереї
    galleryEl.appendChild(cardEl);
  });
}

btnLoadMoreEl.addEventListener('click', event => {
  console.log(event);
  currentPage += 1;
  logJSONData(currentPage);
});
