async function getData(url) {
    const response = await axios.get(url);
    return response.data;
}

function clearData() {
    const container = document.querySelector('.results');
    container.innerHTML = '';
}

function init() {
    function generateArtistData(artistName, genre) {
        const infoContainer = document.querySelector('.results');

        const artcontainer = document.createElement('div');
        artcontainer.className = 'artcontainer';
        infoContainer.appendChild(artcontainer);

        const artName = document.createElement('h3');
        artName.innerText = `Artist name: ${artistName}`;
        artcontainer.appendChild(artName);

        const artGenre = document.createElement('p');
        artGenre.innerText = `Genre: ${genre}`;
        artcontainer.appendChild(artGenre);
    }

    function handleSearch(ev) {
        ev.preventDefault();

        const formData = new FormData(form);
        const searchResult = formData.get('form');

        const url = `https://itunes.apple.com/search?entity=allArtist&attribute=allArtistTerm&term=${searchResult}`;

        if (searchResult.trim() !== '') {
            clearData();
            showArtist(url);
            form.reset();
        } else {
            const infoContainer = document.querySelector('.results');

            const artcontainer = document.createElement('div');
            artcontainer.className = 'artcontainer';
            infoContainer.appendChild(artcontainer);

            const artName = document.createElement('h3');
            artName.innerText = `Artist does not exist`;
            artcontainer.appendChild(artName);
            form.reset();
        }
    }

    async function showArtist(url) {
        const data = await getData(url);

        for (let i = 0; i < 20; i++) {
            const nm = data.results[i].artistName;
            const gnr = data.results[i].primaryGenreName;
            generateArtistData(nm, gnr);
        }
    }
    const form = document.getElementById('formSearch');

    form.addEventListener('submit', (ev) => handleSearch(ev));
}

init();
