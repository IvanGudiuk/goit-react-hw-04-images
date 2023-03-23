const KEY = '33902556-cd401344584c8349e7f35e0d0';
const URL = 'https://pixabay.com/api/';

export async function fetchApi(query, page) {
  const response = await fetch(
    `${URL}?key=${KEY}&q=${query}&page=${page}&per_page=12`
  );

  if (!response.ok) {
    throw new Error(`Error fetching API: ${response.statusText}`);
  }

  const data = await response.json();

  return data;
}
