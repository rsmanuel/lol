import { start as splashControllerStart } from "./controllers/splash.js";

const ROUTES = {
    menu: {
        hash: '',
        controller: () => { console.log('main') }
    },
    splash: {
        hash: "#splash",
        controller: splashControllerStart,
    },
    ability: {
        hash: "#ability",
        controller: () => { console.log('ability') }
    }
};

const DEFAULT_ROUTE = "splash";
let currentHash = null;

const hashCheck = () => {
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

const loadController = (controller) => {
    try {
        controller();
    } catch (err) {
        console.log(err.stack);
        window.location.hash = ROUTES[DEFAULT_ROUTE].hash;
    }
}

const start = hashCheck;
window.onhashchange = hashCheck;

export { start };
