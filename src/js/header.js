'use strict';
import Singleton from './singleton';
let singleton = new Singleton();

const hamburguerBtn = document.querySelector('.js-hamburguer-btn');
const menu = document.querySelector('.js-menu');
const menuItemsDesktop = document.querySelectorAll('.js-main-menu__link');
const menuItemsMobile = document.querySelectorAll('.js-menu__link');

const contHome = document.querySelector('#cont-home');
const contNewPost = document.querySelector('#cont-new-post');
const contNewUser = document.querySelector('#cont-new-user');
const contLogIn = document.querySelector('#cont-log-in');

const profileBTN = document.querySelectorAll('.js-profile-btn');
const newPostBTN = document.querySelectorAll('.js-new-post-btn');
const logInBTN = document.querySelectorAll('.js-log-in-btn');
const signUpBTN = document.querySelectorAll('.js-sign-up-btn');
const signOutBTN = document.querySelector('.js-sign-out-btn');

let currentUser = false;
let activeView = 0;

export function manageView(newView = activeView) {
	if (newView == 1) {
		contHome.classList.remove('hidden');
		contNewPost.classList.add('hidden');
		contNewUser.classList.add('hidden');
		contLogIn.classList.add('hidden');
	} else if (newView == 2) {
		contHome.classList.add('hidden');
		contNewPost.classList.remove('hidden');
		contNewUser.classList.add('hidden');
		contLogIn.classList.add('hidden');
	} else if (newView == 3) {
		contHome.classList.add('hidden');
		contNewPost.classList.add('hidden');
		contNewUser.classList.add('hidden');
		contLogIn.classList.remove('hidden');
	} else if (newView == 4) {
		contHome.classList.add('hidden');
		contNewPost.classList.add('hidden');
		contNewUser.classList.remove('hidden');
		contLogIn.classList.add('hidden');
	} else if (newView == 5) {
		contHome.classList.add('hidden');
		contNewPost.classList.add('hidden');
		contNewUser.classList.add('hidden');
		contLogIn.classList.add('hidden');

	}
}

function manageMenu() {
	hamburguerBtn.classList.toggle('hamburguer__btn--active');
	menu.classList.toggle('menu--show');
}

function clearActiveItems() {
	menuItemsMobile.forEach(clearItem => {
		clearItem.classList.remove('menu__link--active');
	});
	menuItemsDesktop.forEach(clearItem => {
		clearItem.classList.remove('main-menu__link--active');
	});
}

export function manageActiveItem(activeItem) {
	clearActiveItems();
	menuItemsMobile[activeItem - 1].classList.add('menu__link--active');
	menuItemsDesktop[activeItem - 1].classList.add('main-menu__link--active');
}

function hideOptionsUnloggedUser() {
	profileBTN.forEach(item => {
		item.style.display = "none";
	});
	newPostBTN.forEach(item => {
		item.style.display = "none";
	});
	signOutBTN.style.display = "none";
}

function hideOptionsLoggedUser() {
	logInBTN.forEach(item => {
		item.style.display = "none";
	});
	signUpBTN.forEach(item => {
		item.style.display = "none";
	});
}

function updateSessionBtn() {
	if (!currentUser) {
		hideOptionsUnloggedUser();
	} else {
		hideOptionsLoggedUser();
	}
}

async function signOut() {
	await singleton.updateLoggedUser(false);
	window.location.reload();
    Swal.fire({
        'icon': 'success',
        'title': 'La sesión se cerró con éxito',
        'confirmButtonText': 'Entendido'
    })
	goToHome();
}

export async function goToHome() {
	await updateLoggedUser();
	manageActiveItem(1);
	manageView('1');

	updateSessionBtn();
}

async function updateLoggedUser() {
	currentUser = await JSON.parse(window.sessionStorage.getItem('loggedUser'));
}

menuItemsMobile.forEach(item => {
	item.addEventListener('click', () => {
		activeView = item.getAttribute("data-view");
		manageView();
		menuItemsMobile.forEach(clearItem => {
			clearItem.classList.remove('menu__link--active');
		});
		item.classList.add('menu__link--active');
		manageMenu();
	})
});

menuItemsDesktop.forEach(item => {
	item.addEventListener('click', () => {
		activeView = item.getAttribute("data-view");
		manageView();
		menuItemsDesktop.forEach(clearItem => {
			clearItem.classList.remove('main-menu__link--active');
		});
		item.classList.add('main-menu__link--active');
	})
});

hamburguerBtn.addEventListener('click', () => manageMenu());
signOutBTN.addEventListener('click', () => signOut());

window.onload = async() => {
    await updateLoggedUser();
	updateSessionBtn();
}