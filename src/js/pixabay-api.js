import axios from 'axios';

const axiosMetod = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '13983728-c7bbdcf2d20cfa49f01a0b8c6',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  }
});


export async function searchImage(searchValue, page = 1) {
  const { data } = await axiosMetod.get('', {
    params: {
      q: searchValue,
      page: page,
      per_page: 15,
    }
  });

  return data;
}
