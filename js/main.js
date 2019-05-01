const search = document.getElementById('search');
const searchResultsList = document.getElementById('search-response');

// Asynchronous function to search through the JSON file and return relevant results based on users input
const searchStates = async (searchText) => {
	// Fetch data
	const results = await fetch('../data/states.json');
	const states = await results.json();
	// Filter data
	let matches = states.filter((state) => {
		// regex expression to perform a global search 'g', case insensitive 'i' on search text
		const regex = new RegExp(`^${searchText}`, 'gi');
		return state.name.match(regex) || state.abbr.match(regex);
	});

	// if search form is blank
	if (searchText.length === 0) {
		matches = [];
		searchResultsList.innerHTML = '';
	}
	outputHTML(matches);
};

// Output search results
const outputHTML = (matches) => {
	if (matches.length > 0) {
		const html = matches
			.map(
				(match) => `
            <div class="card card-body mb-1">
                <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
                <small>Lat: ${match.lat} / Long: ${match.long}</small>
            </div>
        `
			)
			.join('');
		searchResultsList.innerHTML = html;
	}
};

// Add an event listener to the search form
search.addEventListener('input', () => searchStates(search.value));
