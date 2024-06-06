import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import {searchImage} from './js/pixabay-api';
import {renderImage} from './js/render-functions';

const formEl = document.querySelector('.search-form');
const container = document.querySelector('.gallery-list');
const loader = document.querySelector('.loader');
const btnLoadMore = document.querySelector('.js-btn-load');

const lightbox = new SimpleLightbox ('.gallery-list a', {
        animationSpeed: 200,
        animationSlide: true,
        disableScroll: false,
        history: false,
        captionsData: 'alt',
        captionDelay: 250,
});

let currentPage = 1;
let perPage = 15;
let intputValue = '';
let totalImages = 0;

btnLoadMore.style.display = 'none';

formEl.addEventListener('submit', async event => {
  event.preventDefault();
  intputValue = event.target.elements.search.value.trim();
  currentPage = 1;

  container.innerHTML = '';
  

  if (!intputValue) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    return;
  }

  loader.classList.remove('hidden');
  loader.style.display = 'block';
  btnLoadMore.style.display = 'none';
  
  try {
    const data = await searchImage(intputValue, currentPage);
    if (!data.total) {
        iziToast.error({
        title: 'Error',
        message:
        'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        });
        
        return loader.style.display = 'none';
        }
    else {
        totalImages = data.totalHits;
        const markup = renderImage(data.hits);
        container.innerHTML = markup;
        lightbox.refresh();

        if (totalImages >= currentPage * perPage) {
            btnLoadMore.style.display = 'block';
        }
    }
        loader.classList.add('hidden');
        loader.style.display = 'none';
  } catch (error) {
        console.error('Error searching images:', error.message);
        loader.classList.add('hidden');
        loader.style.display = 'none';
  }
}); 


btnLoadMore.addEventListener('click', async e => {
    currentPage += 1;
  loader.classList.remove('hidden');
  loader.style.display = 'block';

    if (totalImages <= currentPage * perPage) {
        btnLoadMore.style.display = 'none';
        iziToast.error({
            title: 'Error',
            message: "We're sorry, but you've reached the end of search results.",
            position: 'topRight',
        });
        loader.classList.add('hidden');
        loader.style.display = 'none';
    }

    try {
        const data = await searchImage(intputValue, currentPage);
        if (data.hits.length === 0) {
            iziToast.error({
                title: 'Error',
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
            });
        } else {
            const markup = renderImage(data.hits);
            container.insertAdjacentHTML("beforeend", markup)
            lightbox.refresh();

            const galleryItem = document.querySelector('.gallery-item');
            const galleryItemHeight = galleryItem.getBoundingClientRect().height;
            window.scrollBy({
                top: galleryItemHeight * 2,
                behavior: 'smooth'
            });
        }

        loader.classList.add('hidden');
        loader.style.display = 'none';
    } catch (error) {
        console.error('Error loading more images:', error.message);
        loader.classList.add('hidden');
        loader.style.display = 'none';
    }
});
