const search = document.getElementById('search');
const searchResultsList = document.getElementById('search-response');
// Add an event listener to the search form
search.addEventListener('input', () => searchStates(search.value));
