import * as mainService from "./main.js";

const SKIN_URL = 'http://ddragon.leagueoflegends.com/cdn/'
const SKIN_URL_SUFFIX = 'img/champion/'

const getSkin = async () => {
	const championDetails = await mainService.getChampion();
	const skin = championDetails.skins[Math.floor(Math.random() * championDetails.skins.length - 1)];
	const champion_name = championDetails.id
	const name = skin.name
	const num = skin.num
	const url = `${SKIN_URL}${SKIN_URL_SUFFIX}splash/${champion_name}_${num}.jpg`

	return {
		champion_name,
		name,
		num,
		url
	}
};

const getChampion = async (champion) => {
	const championDetails = await mainService.getChampion(champion)
	const champion_name = championDetails.id
	const url = `${SKIN_URL}12.23.1/${SKIN_URL_SUFFIX}${champion_name}.png`

	return {
		champion_name,
		url,
	}
}

const isChampionValid = async (champion) => {
	const validChampions = await mainService.getChampionNames();

	return validChampions.indexOf(champion) > -1;
}


export { getSkin, isChampionValid, getChampion };
