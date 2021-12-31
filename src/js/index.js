// Load scripts.
import Aplication from './aplication';
import Singleton from './singleton';
import './header';

import '../scss/style.scss'; 
import './registerServiceWorker';

let aplication = null;
let singleton = new Singleton();

function appStar() {
	aplication = new Aplication();
}

async function init() {
	await singleton.updateData();
	appStar();
}

document.addEventListener('DOMContentLoaded', init);
