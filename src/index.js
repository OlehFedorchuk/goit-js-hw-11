import Notiflix from 'notiflix';
import { fetchIMG } from './api.js';
import { renderCard } from './render.js';

const galleryEl = document.querySelector('.gallery');
const btnLoadMoreEl = document.querySelector('.load-more');

let currentPage = 1;
let userSearch = '';
let test = true;

document
  .getElementById('search-button')
  .addEventListener('click', function (event) {
    event.preventDefault();

    btnLoadMoreEl.hidden = false;

    userSearch = document.getElementsByName('searchQuery')[0].value;

    if (userSearch !== '') {
      test = true;
      galleryEl.innerHTML = '';
      currentPage = 1;
    }

    fetchIMG(currentPage, userSearch)
      .then(response => {
        if (response.data.hits.length === 0) {
          btnLoadMoreEl.hidden = true;
          Notiflix.Notify.failure(
            `Sorry, there are no images matching your search query. Please try again.`
          );
        } else if (test) {
          Notiflix.Notify.success(
            `Hooray! We found ${response.data.totalHits} images.`
          );
        }
        renderCard(response.data);
      })
      .catch(error => console.log('error', error));
  });

btnLoadMoreEl.addEventListener('click', () => {
  test = false;
  currentPage += 1;
  fetchIMG(currentPage, userSearch)
    .then(response => {
      if (('message', response.data.hits.length === 0)) {
        console.log('0000000');
        btnLoadMoreEl.hidden = true;
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
      }
      renderCard(response.data);
    })
    .catch(error => console.log('error', error));
});
