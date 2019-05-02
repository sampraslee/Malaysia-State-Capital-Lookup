# Malaysia State-Capital Lookup
This is a basic website that allows users to search a particular state or federal territory in Malaysia by the name or abbreviation.
The search results will return the states/federal territory name, abbreviation, capital, latitude and longitude.
The main focus of developing this website was to learn how to perform <em>autocomplete</em> based on the users input using the <strong>Fetch API</strong>.
This project is based on Brad Traversy's <a href="https://www.youtube.com/watch?v=1iysNUrI3lw&t=0s">tutorial</a>.

<h2>Data</h2>
The data used for this project can be found <a href="https://github.com/sampraslee/Malaysia-State-Capital-Lookup/blob/master/data/states.json">here</a>.

<h2>HTML</h2>

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
        integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <title>Malaysia State-Capital Lookup</title>
</head>
<body>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6 m-auto">
                <h1 class="text-center mb-4"><i class="fas fa-map-marked-alt"></i> Malaysia State Capital Lookup</h1>
                <div class="form-group">
                    <input type="text" class="form-control form-control-lg" id="search" placeholder="Type a state...">
                </div>
                <div id="search-response"></div>
            </div>
        </div>
    </div>

    <script src="js/main.js"></script>
</body>
</html>
```

The search form and the div to show the search results are identified in the JS file as follows.

```js
const search = document.getElementById('search');
const searchResultsList = document.getElementById('search-response');
```

<h2>Fetching and Filtering Data</h2>
This is the function to fetch and filter data. Lets break it down.

```javascript
const searchStates = async (searchText) => {
	// Fetch data
	const response = await fetch('https://sampraslee.github.io/Malaysia-State-Capital-Lookup/data/states.json');
	const states = await response.json();
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
};
```
To declare an asynchronous function, simply type ``async``.

```js
const searchStates = async (searchText) =>
```

To aquire the data simply use ``fetch``. The ``await`` is to state that the promise should be resolved first before moving on.
```js
const response = await fetch('https://sampraslee.github.io/Malaysia-State-Capital-Lookup/data/states.json');
```

We then want the response to be returned as JSON.
```js
const states = await response.json();
```

Now that we have the data in the format we want, the next step is to filter the data according to the user input. This can be accomplished using some simple Regex.

```js

let matches = states.filter((state) => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return state.name.match(regex) || state.abbr.match(regex);
});
```

What we've done here is to create a method called matches that uses the ``filter`` function to go through all the data in ``states``(which will be called ``state``). <br>
We then create a Regular Expression that is a global search <em>(meaning it will search for all the data that fits the requirement and not stop at the first data that fullfills the requirements)</em> and is case insensitive. <br>
Finally, the method will return all the data(s) where the ``name`` or ``abbr`` properties match the Regex.

<h2>Displaying the results</h2>

```js
const outputHTML = (matches) => {
	if (matches.length > 0) {
		const html = matches.map((match) =>
                `
                    <div class="card card-body mb-1">
                    <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
                    <small>Lat: ${match.lat} / Long: ${match.long}</small>
                    </div>
                `
                ).join('');
        searchResultsList.innerHTML = html;
	}
};
```

To display each result, we create a function ``html`` to go through each result returned in the ``matches`` function <em>(known as ``match``)</em> and use the ``map`` function to create a card containing the ``name``,``abbr``,``capital``,``lat`` and ``long`` properties of the data.
The ``innerHTML`` of ``searchResultsList`` (the div that displays the search results) is replaced with the results of ``html``.

<h2>Empty Search Field</h2>
You might have noticed that if you perform a search and then proceed to delete the search from the search field, you'll notice that the search results from the previous search is still displayed. 


```js
	if (searchText.length === 0) {
		matches = [];
		searchResultsList.innerHTML = '';
	}
```

If the search field is blank, we set the value of ``matches`` to an empty array and the ``searchResultsList`` to reflect that.

<h2>Putting it all together</h2>

Now that we have functions to fetch, filter and display the search results, let's put it all together. To do that, simply add the following to the end of the ``searchStates``  function.

```js
outputHTML(matches);
```

Now for the finale, add an event listener to the search field to perform a search whenever a user has entered an input.

```js
search.addEventListener('input', () => searchStates(search.value));
```
