export default class Validate {
  	constructor() {    
		// elements
		this.postTitle = document.querySelector('#post-title');
		this.postDescription = document.querySelector('#post-description');

		this.editPostTitle = document.querySelector('#edit-post-title');
		this.editPostDescription = document.querySelector('#edit-post-description');

		this.userName = document.querySelector('#user-name');
		this.userBirthDate = document.querySelector('#user-birth-date');
		this.bibliography = document.querySelector('#user-bibliography');
		this.userEmail = document.querySelector('#user-email');
		this.userPassword = document.querySelector('#user-password');
		this.userPasswordConfirm = document.querySelector('#user-password-confirm');

		// instances

		// values
  	}

  	validateNewPost(formData) {
		let error = false;
	
		if (formData.get('postTitle') == '') {
			error = true;
			this.postTitle.classList.add('form__item--error');
		} else {
			this.postTitle.classList.remove('form__item--error');
		}
	
		if (formData.get('postDescription') == '') {
			error = true;
			this.postDescription.classList.add('form__item--error');
		} else {
			this.postDescription.classList.remove('form__item--error');
		}
	
		if (error == false) {
			return true;
		} else {
			Swal.fire({
				'icon': 'warning',
				'title': 'No se pudo publicar el post',
				'text': 'Por favor revise los campos resaltados',
				'confirmButtonText': 'Entendido'
			});
			return false
		}
	}

	validatePostUpdateInformation(data) {
		let error = false;
	
		if (data.editPostTitle == '') {
			error = true;
			this.editPostTitle.classList.add('form__item--error');
		} else {
			this.editPostTitle.classList.remove('form__item--error');
		}
	
		if (data.editPostDescription == '') {
			error = true;
			this.editPostDescription.classList.add('form__item--error');
		} else {
			this.editPostDescription.classList.remove('form__item--error');
		}
	
		if (error == false) {
			return true;
		} else {
			Swal.fire({
				'icon': 'warning',
				'title': 'No se pudo actualizar el post',
				'text': 'Por favor revise los campos resaltados',
				'confirmButtonText': 'Entendido'
			});
			return false
		}
	}

	validateNewUser(formData) {
		let error = false;

		let regexEmail = /^[a-zA-Z.0-9_]+\@{1}[a-zA-Z.]+$/;
		let regexName = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;
		let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){6,20}$/;

		if (regexName.test(formData.get('userName')) == false) {
			error = true;
			this.userName.classList.add('form__item--error');
		} else {
			this.userName.classList.remove('form__item--error');
		}

		if (formData.get('userBirthDate') == '') {
			error = true;
			this.userBirthDate.classList.add('form__item--error');
		} else {
			this.userBirthDate.classList.remove('form__item--error');
		}

		if (formData.get('bibliography') == '') {
			error = true;
			this.bibliography.classList.add('form__item--error');
		} else {
			this.bibliography.classList.remove('form__item--error');
		}

		if (regexEmail.test(formData.get('userEmail')) == false) {
			error = true;
			this.userEmail.classList.add('form__item--error');
		} else {
			this.userEmail.classList.remove('form__item--error');
		}

		if (regexPassword.test(formData.get('userPassword')) == false) {
			error = true;
			this.userPassword.classList.add('form__item--error');
			Swal.fire({
				'icon': 'warning',
				'title': 'No se pudo registrar la cuenta',
				'text': 'La contraseña debe tener entre 6 y 20 caracteres, al menos una mayúscula, una minúscula, un caracter especial y un número',
				'confirmButtonText': 'Entendido'
			});
		} else {
			this.userPassword.classList.remove('form__item--error');
		}

		if (formData.get('userPassword') != formData.get('confirmUserPassword')) {
			error = true;
			this.userPasswordConfirm.classList.add('form__item--error');
			Swal.fire({
				'icon': 'warning',
				'title': 'Las contraseñas no coinciden',
				'confirmButtonText': 'Entendido'
			});
		} else {
			this.userPasswordConfirm.classList.remove('form__item--error');
		}

		if (error == false) {
			return true;
		} else {
			Swal.fire({
				'icon': 'warning',
				'title': 'No se pudo registrar la cuenta',
				'text': 'Por favor revise los campos resaltados',
				'confirmButtonText': 'Entendido'
			});
			return false
		}
	}
}