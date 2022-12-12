import * as classicView from "../views/classic.js"
import { getChampion } from "../services/classic.js"

const start = () => {
    getChampion();
    classicView.render();
}

export { start }