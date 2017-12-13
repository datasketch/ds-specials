const recipes = document.querySelectorAll('.recipe-modal');
const header = document.querySelector('.nav');
const close = document.querySelectorAll('.close-overlay');
const body = document.body;
const addClass = (element, className) => element.classList.add(className);
const removeClass = (element, className) => element.classList.remove(className);

recipes.forEach(recipe => recipe.addEventListener('click', recipeModal));
close.forEach(button => button.addEventListener('click', closeModal));

function recipeModal(event) {
	event.preventDefault();
	const target = event.target;
	const data = target.getAttribute('data-recipe');
	const overlay = document.getElementById(`${data}`);
	addClass(body, 'no-scroll');
	addClass(overlay, 'show');
}

function closeModal(event) {
	event.preventDefault();
	const overlay = document.querySelector('.show');
	removeClass(body, 'no-scroll');
	removeClass(overlay, 'show');
}