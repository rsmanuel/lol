const elements = {};
const handlers = {};

function render(film) {
    createButton();

    if (film) {
        createFilm(film);
    }
}

function createButton() {
    if (elements.button) {
        return;
    }
    const app = $("#app");
    const button = $(
        "<button id='new-film'>Click me for a random film</button>"
    );
    elements.button = button;

    $(elements.button).click(handlers.button);
    app.append(elements.button);
}

function bind(element, handler) {
    handlers[element] = handler;
}

function createFilm({ title, year, director, imdbRating }) {
    if (elements.film) {
        $(elements.film).remove();
    }
    const film = $(
        `<div id="film">
            <p><strong>Title: </strong>${title}</p>
            <p><strong>Year: </strong>${year}</p>
            <p><strong>Director: </strong>${director}</p>
            <p><strong>IMDB rating: </strong>${imdbRating}</p>
        </div>`
    );
    elements.film = film;
    $("#app").append(film);
}

export { render, bind };
