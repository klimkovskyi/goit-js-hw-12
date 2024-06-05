export function renderImage(data) {
    return data.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
                <img class="gallery-image" src="${webformatURL}" alt="${tags}">
                <ul class="wrapper">
                    <li>Likes<span>${likes}</span></li>
                    <li>Views<span>${views}</span></li>
                    <li>Comments<span>${comments}</span></li>
                    <li>Downloads<span>${downloads}</span></li>
                </ul>
            </a>
        </li>
    `).join('');
}