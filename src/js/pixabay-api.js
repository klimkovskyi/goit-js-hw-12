export function searchImage(searchValue) {
    const BASE_URL = 'https://pixabay.com/api/';
    const params = new URLSearchParams({
        key: '13983728-c7bbdcf2d20cfa49f01a0b8c6',
        q: searchValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true
    });
    const url = `${BASE_URL}?${params}`;

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json();
        })
}