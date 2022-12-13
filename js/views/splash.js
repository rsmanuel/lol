let skin = null;
const elements = {};
const callbacks = {};

const render = (newSkin) => {
	skin = newSkin;
	if (!Object.keys(elements).length) {
		createSplash();
		createInput();
	}
}

const bind = (element, cb) => {
	callbacks[element] = cb;
}

const createSplash = () => {
	const app = $('#app')

	skin.position = {
		width: 1944,
		height: 1147,
		top: 0,
		left: 0 
	}
	const canvas = $(`
	<div id="splash-wrapper">
		<img id="splash-img" src="${skin.url}" width="${skin.position.width}" height="${skin.position.height}" style="top:${skin.position.top}px; left: ${skin.position.left}px">
	</div>`)
	app.append(canvas)

	elements.splash = canvas;
	elements.skin = $('#splash-img').get(0)
}

const createInput = () => {
	const app = $('#app');
	const inputDiv = $(`
	<div id="input-wrapper">
		<input id="guess-input" type="text">
	</div>
	`);
	app.append(inputDiv)

	const input = $('#guess-input').get(0)
	elements.guessInput = input;

	$(input).enterKey(() => {
		try {
			callbacks.input(input.value);
			input.value = ''
		} catch (error) {
			console.log(error)
		}
	})
}

const resizeSplash = (correct) => {
	if (correct) {
		elements.skin.width = 608
		elements.skin.height = 359
		return
	}

	elements.skin.width = (elements.skin.width - 120) > 608 ? (elements.skin.width - 120) : 608;
	elements.skin.height = (elements.skin.height - 60) > 358 ? (elements.skin.height - 60) : 359;
}

const renderGuess = (championGuess) => {
	resizeSplash(championGuess.class === 'correct')

	const app = $('#app')
	if (!elements.guess){
		const guess = $(`
			<div id="guess-col"></div>
		`)
		elements.guess = guess;
		app.append(guess)
	}
	const champion = $(`
		<div class="guess">
			<img src="${championGuess.url}">
			<span>${championGuess.champion_name}</span> 
		</div>
	`)
	champion.addClass(championGuess.class)
	elements.guess.prepend(champion)
}

$.fn.enterKey = function (fnc) {
	return this.each(function () {
		$(this).keypress(function (ev) {
			var keycode = (ev.keyCode ? ev.keyCode : ev.which);
			if (keycode == '13') {
				fnc.call(this, ev);
			}
		})
	})
}

export { render, bind, renderGuess }