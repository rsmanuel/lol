import { start as classicControllerStart } from "./controllers/classic.js";

const ROUTES = {
    classic: {
        hash: "#classic",
        controller: classicControllerStart,
    },
};

const DEFAULT_ROUTE = "classic";
let currentHash = "";

function hashCheck() {
    if (window.location.hash === currentHash) {
        return;
    }

    let routeName = Object.keys(ROUTES).find(
        (name) => ROUTES[name].hash === window.location.hash
    );
    if (!routeName) {
        routeName = DEFAULT_ROUTE;
        window.location.hash = ROUTES[routeName].hash;
    }

    loadController(ROUTES[routeName].controller);
}

function loadController(controller) {
    try {
        controller();
    } catch (err) {
        console.log(err.stack);
        window.location.hash = ROUTES[DEFAULT_ROUTE].hash;
    }
}

function start() {
    window.location.hash = window.location.hash || ROUTES[DEFAULT_ROUTE].hash;
}

window.onhashchange = hashCheck;

export { start };
