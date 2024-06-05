import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import {searchImage} from './js/pixabay-api';
import {renderImage} from './js/render-functions';

const formEl = document.querySelector('.search-form');
const container = document.querySelector('.gallery-list');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox ('.gallery-list a', {
        animationSpeed: 200,
        animationSlide: true,
        disableScroll: false,
        history: false,
        captionsData: 'alt',
        captionDelay: 250,
});

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    const intputValue = event.target.elements.search.value.trim();
  
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

    searchImage(intputValue)
        .then(data => {
            if (!data.total) {
                iziToast.error({
                title: 'Error',
                message:
                'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
                });
                
                return loader.style.display = 'none';
            }
            
            const markup = renderImage(data.hits);
            container.innerHTML = markup;

            loader.classList.add('hidden');
            loader.style.display = 'none';
        })
        .catch(error => console.log(error))
        .finally(() => lightbox.refresh())
})


