import axios from 'axios';

const API_KEY = '37446225-ced4f53dd81a7d760f8a029fd';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchIMG(currentPage, userSearch) {
  return axios.get(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: userSearch,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 40,
      page: currentPage,
    },
  });
}
