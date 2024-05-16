import { updatePosts } from './helpers/post';
import { signUpUser } from './helpers/user';
import { manageView, manageActiveItem } from './header';
import Singleton from './singleton';

export default class Aplication {
	constructor() {
		// elements
		this.singleton = new Singleton();
		this.loguedUser = JSON.parse(window.sessionStorage.getItem('loggedUser'));

		// // events
		updatePosts();
		console.log("updatePosts");
	}
}
