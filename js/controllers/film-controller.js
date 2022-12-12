import * as filmView from "../views/film-view.js";
import { getFilm, totalNOfFilms } from "../services/film-service.js";

function start() {
    filmView.bind("button", buttonHandler);
    filmView.render();
}

function buttonHandler() {
    const filmIndex = Math.floor(Math.random() * totalNOfFilms);
    getFilm(filmIndex, filmView.render);
}

export { start };
