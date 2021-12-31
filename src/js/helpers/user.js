import Singleton from '../singleton';
import Validate from './validate';
import { goToHome } from '../header';
let validate = new Validate();
let singleton = new Singleton();

const newUserForm = document.querySelector('#new-user-form');
const logInForm = document.querySelector('#log-in-form');
const contNewUserPreview = document.querySelector('.js-new-user-preview');
const newUserFile = document.querySelector('#new-user-file');
const logInEmail = document.querySelector('#email');
const logInPassword = document.querySelector('#password');

let userData = null;

export async function signUpUser(e) {
	const formdata = new FormData(e.currentTarget);

	if (validate.validateNewUser(formdata)) {
		await singleton.createNewUser(formdata);
		goToHome();
	}
}

function renderPreview(formData) {
	const file = formData.get('file');
	const image = URL.createObjectURL(file);
	contNewUserPreview.classList.add('form__item-preview');
	contNewUserPreview.style.backgroundImage = `url(${image})`;
}

newUserFile.addEventListener('change', () => {
    const formData = new FormData(newUserForm);
    renderPreview(formData);
});

newUserForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	signUpUser(e);
});

logInEmail.addEventListener('change', async() => {
    const currentEmail = logInEmail.value;
	await singleton.updateData();
    const currentUser = await singleton.getUserByEmail(currentEmail);
    if (currentUser) {
        userData = currentUser;
    } else {
        Swal.fire({
            'icon': 'warning',
            'title': 'El usuario no existe',
            'text': 'Por favor ingrese un correo electrónico valido',
            'confirmButtonText': 'Entendido'
        });
    }
});

async function logIn(e) {
	e.preventDefault();
	let formData = new FormData();
    formData.append('email', userData.userEmail);
    formData.append('password', logInPassword.value);
	
	await singleton.logIn(formData)
}

logInForm.addEventListener('submit', (e) => logIn(e));