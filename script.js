const names = [
    'Halina',
    'Rayford',
    'Many',
    'Hans',
    'Danuta',
    'Anisha',
    'Tijuana',
    'Wei',
    'Bob',
    'Veronique',
    'Theodora',
    'Rosita',
    'Johana',
    'Micaela',
    'Owen',
    'Antwan',
    'Valeria',
    'Misty',
    'Angelina',
    'Peggy Laporte'
];

document.addEventListener('DOMContentLoaded', () => {
    const searchField = document.getElementById('search');
    const resultElement = document.getElementById('result');

    // Add event listener to search field
    searchField.addEventListener('input', handleSearch);
    
    // Call once on page load for the names to show initially
    handleSearch();

    function handleSearch() {
        const inputValue = searchField.value;

        // Converting both to lower case so that capitalization doesn't matter
        const filteredNames = names.filter(name => name.toLowerCase().includes(inputValue.toLowerCase()));

        // the sort() function sorts "inside" the array, i.e. the order in the original array changes. It doesn't return anything.
        filteredNames.sort();

        /*
         * Constructing an object with following structure:
         * {
         *   "A": [...Array of names that start with A],
         *   "B": [...Array of names that start with B],
         *   "C": [...Array of names that start with C],
         *   ...
         * }
         *
         * Structures like these, where elements of one kind are separated by one property (in this case, the first letter) are often called 'buckets'.
         */
        const buckets = {};

        filteredNames
            .map(name => {
                // I can access individual characters of the name just like elements in an array
                const firstLetter = name[0].toUpperCase();

                return { firstLetter, name };
            })
            .forEach(({firstLetter, name}) => {
                if (!buckets[firstLetter]) {
                    buckets[firstLetter] = [];
                }
                buckets[firstLetter].push(name);
            });
        
        // Clearing result before displaying new result
        resultElement.innerHTML = '';
        
        // Displaying the filtered result
        for (const firstLetter in buckets) {
            const names = buckets[firstLetter];
            
            // Creating an element for the first letter
            const indexElement = document.createElement('li');
            indexElement.classList.add('index');
            indexElement.innerText = firstLetter;
            resultElement.appendChild(indexElement);
            
            names.forEach(name => {
                // Creating elements for each name
                const nameElement = document.createElement('li');
                nameElement.innerText = name;
                resultElement.appendChild(nameElement);
            });
        }
    }
});