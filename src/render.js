import SimpleLightbox from 'simplelightbox';
let lightbox;
const galleryEl = document.querySelector('.gallery');
export function renderCard(items) {
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

  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a', {});
  }
}
