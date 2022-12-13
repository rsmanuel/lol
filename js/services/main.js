const API_URL = "http://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/";

let championNames = [];

const fetchData = async (suffix) => {
	let response = await fetch(API_URL + suffix);
	if (!response) throw new Error("Error fetching champions");
	return await response.json();
};

const getChampionNames = async () => {
	if (championNames.length) {
		return championNames;
	}
	let response = await fetchData("champion.json");
	championNames = Object.keys(response.data)
};

const getChampionDetails = async (name) => {
	let response = await fetchData(`champion/${name}.json`);
	return response.data;
};

const getChampion = async (champion) => {
	if (!championNames.length) {
		await getChampionNames();
	}
	const championDetails = await getChampionDetails(champion !== undefined ? champion : championNames[Math.floor(Math.random() * championNames.length - 1)]);

	return championDetails[Object.keys(championDetails)[0]];
};

export { getChampion, getChampionNames };
