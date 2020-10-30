particlesJS.load("particles", "scripts/particlesjs-config.json", function () {
	console.log("śmiga");
});

//przenoszenie :
const btnAbout = document.querySelector("li.about");
let aboutSection = document.querySelector("main.about").offsetTop;

function btnMove(section) {
	window.scrollTo(0, section);
	console.log("co");
}

btnAbout.addEventListener("click", () => {
	btnMove(aboutSection);
});

const btnWhy = document.querySelector("li.why");
let whySection = document.querySelector("section.why").offsetTop - 60;
btnWhy.addEventListener("click", () => {
	btnMove(whySection);
});
const recruitmentBtn = document.querySelector("li.recruitment");
let recruitmentSection = document.querySelector("section.recruitment").offsetTop;

recruitmentBtn.addEventListener("click", () => {
	btnMove(recruitmentSection);
});

const arrow = document.querySelector("i.fa-angle-double-down");
arrow.addEventListener("click", () => {
	btnMove(recruitmentSection);
});
//random text:
class TextScramble {
	constructor(el) {
		this.el = el;
		this.chars = "!<>-_#/[@]{}—=+*^?#___$!!?%";
		this.update = this.update.bind(this);
	}
	setText(newText) {
		const oldText = this.el.innerText;
		const length = Math.max(oldText.length, newText.length);
		const promise = new Promise((resolve) => (this.resolve = resolve));
		this.queue = [];
		for (let i = 0; i < length; i++) {
			const from = oldText[i] || "";
			const to = newText[i] || "";
			const start = Math.floor(Math.random() * 45);
			const end = start + Math.floor(Math.random() * 45);
			this.queue.push({
				from,
				to,
				start,
				end,
			});
		}
		cancelAnimationFrame(this.frameRequest);
		this.frame = 0;
		this.update();
		return promise;
	}
	update() {
		let output = "";
		let complete = 0;
		for (let i = 0, n = this.queue.length; i < n; i++) {
			let { from, to, start, end, char } = this.queue[i];
			if (this.frame >= end) {
				complete++;
				output += to;
			} else if (this.frame >= start) {
				if (!char || Math.random() < 0.28) {
					char = this.randomChar();
					this.queue[i].char = char;
				}
				output += `<span class="let">${char}</span>`;
			} else {
				output += from;
			}
		}
		this.el.innerHTML = output;
		if (complete === this.queue.length) {
			this.resolve();
		} else {
			this.frameRequest = requestAnimationFrame(this.update);
			this.frame++;
		}
	}
	randomChar() {
		return this.chars[Math.floor(Math.random() * this.chars.length)];
	}
}

const phrases = ["Rekrutacja od 11.03.2021", "Dołącz do elitarnego grona", "Tylko dno jest limitem", "Przeżyj przygodę swojego życia", "Złap klucz do sukcesu"];

const el = document.querySelector("p.sloganApp");
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
	fx.setText(phrases[counter]).then(() => {
		setTimeout(next, 1000);
	});
	counter = (counter + 1) % phrases.length;
};

next();
