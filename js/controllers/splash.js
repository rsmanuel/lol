import * as splashView from "../views/splash.js";
import * as splashService from "../services/splash.js";

let correctAnswer = null;

const start = () => {
	console.log('start')
	splashService.getSkin().then(skin => {
		if (!correctAnswer) {
			correctAnswer = skin
		}
		splashView.bind("input", submitGuessHandler)
		splashView.render(skin);
	});
};

const submitGuessHandler = async (champion) => {
	if (await splashService.isChampionValid(champion) === false) {
		throw new Error(`${champion} is not a valid champion`)
	}
	const championGuess = await splashService.getChampion(champion);
	championGuess.class = 'wrong'
	if (championGuess.champion_name === correctAnswer.champion_name) {
		championGuess.class = 'correct'
		setTimeout (() => {
			start()
		}, 3000)
	}
	return splashView.renderGuess(championGuess)
}

export { start };
