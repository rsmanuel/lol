const API_URL = 'http://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/';

let championNames = [];

const fetchData = async (url) => {
    let response = await fetch(url);
    if (!response) throw new Error('Error fetching champions');
    return await response.json();
}

const getChampionNames = async () => {
    let response = await fetchData(API_URL + 'champion.json')
    championNames = Object.keys(response.data);
}

const getChampionDetails = async (name) => {
    let response = await fetchData(API_URL + `champion/${name}.json`);
    return response.data;
}

const initChampionObject = async () => {
    if (!championNames.length){
       await getChampionNames();
    }
    const champion = await getChampionDetails(championNames[Math.floor(Math.random() * championNames.length - 1)]);
    console.log(champion);
}
const getChampion = async () => {
    const champion = await initChampionObject();
}

export { getChampion }