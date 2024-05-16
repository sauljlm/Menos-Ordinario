import Singleton from '../singleton';
import Validate from './validate'
let validate = new Validate();
let singleton = new Singleton();
import { goToHome } from '../header';

const modalContainer = document.querySelector('.modal-container');
const postContainer = document.querySelector('.js-tasks-container');
const contNewPostPreview = document.querySelector('.js-new-post-preview');
const contEditPostPreview = document.querySelector('.js-edit-post-preview');
const cancelEditBtn = document.querySelector('#cancel-button');
const newPostForm = document.querySelector('#new-post-form');
const newPostFile = document.querySelector('#new-post-file');
const editPostFile = document.querySelector('#edit-post-file');
const editForm = document.querySelector('#edit-post-form');
const editPostTitle = document.querySelector('#edit-post-title');
const editPostDescription = document.querySelector('#edit-post-description');

let loggedUser = null;

function closeModal() {
	modalContainer.style.display = "none";
}

export async function updatePosts() {
	console.log("updating Posts")
	loggedUser = await singleton.getLoggedUser();
	postContainer.innerHTML = '';
	const posts = await singleton.getPosts();
	posts.forEach(post => {
		renderPosts(post);
	});
}

function generateUpdatedPost(id) {
	const newPost = {
		postTitle: editPostTitle.value,
		postDescription: editPostDescription.value,
	}

	if (validate.validatePostUpdateInformation(newPost)) {
		singleton.updatePost(id, newPost);
	}
} 

function manageEditPost(post) {
	modalContainer.style.display = "block";
	editPostTitle.value = post.postTitle;
	editPostDescription.value = post.postDescription;

	editForm.addEventListener('submit', async (e) => {
		e.preventDefault();
		await generateUpdatedPost(post._id);
		updatePosts();
		closeModal();
	});
}

async function manageDeletePost(post) {
	await singleton.deletePost(post._id);
	updatePosts();
}

function formatDate(date) {
	let newDate = new Date(date);
	newDate = `${newDate.getDate() + 1}/${newDate.getMonth()+1}/${newDate.getFullYear()}`;
	return newDate;
}

function renderPreview(formData) {
	const file = formData.get('file');
	const image = URL.createObjectURL(file);
	contNewPostPreview.classList.add('form__item-preview');
	contNewPostPreview.style.backgroundImage = `url(${image})`;
	contEditPostPreview.classList.add('form__item-preview');
	contEditPostPreview.style.backgroundImage = `url(${image})`;
}

async function getProfilePhoto(email) {
	const tmpUser = await singleton.getUserByEmail(email);
	return tmpUser.imageURL;
}

async function renderPosts(post) {
    const newDate = formatDate(post.postDate);
    const postItem = document.createElement('li');
    const topContainer = document.createElement('div');
    const bottomContainer = document.createElement('div');
    const userName = document.createElement('p');
	const title = document.createElement('p');
    const description = document.createElement('p');
	const image = document.createElement('div');
	const profilePhoto = document.createElement('div');
    const date = document.createElement('p');
    const optionsContainer = document.createElement('div');
    const editBTN = document.createElement('div');
    const deleteBTN = document.createElement('div');
  
    postItem.setAttribute('class', 'task-container');
    topContainer.setAttribute('class', 'task__top-container');
    bottomContainer.setAttribute('class', 'task__bottom-container');
    userName.setAttribute('class', 'task__name');
	title.setAttribute('class', 'task__title');
    description.setAttribute('class', 'task__description');
	image.setAttribute('class', 'task__image');
    profilePhoto.setAttribute('class', 'task__profile-photo');
    date.setAttribute('class', 'task__date');
 
    editBTN.setAttribute('class', 'task__edit-btn');
    deleteBTN.setAttribute('class', 'task__delete-btn');
    optionsContainer.setAttribute('class', 'task__options-container');
  
    editBTN.addEventListener('click', () => manageEditPost(post));
    deleteBTN.addEventListener('click', () => manageDeletePost(post));
  
    userName.innerHTML = `${post.userName}`;
	title.innerHTML = `${post.postTitle}`;
    description.innerHTML = `${post.postDescription}`;
    date.innerHTML= `${newDate}`;
	image.style.backgroundImage = `url(${post.imageURL})`;
	let profileImage = await getProfilePhoto(post.userEmail);
	profilePhoto.style.backgroundImage = `url(${profileImage})`;
	topContainer.appendChild(profilePhoto);
    topContainer.appendChild(userName);
    bottomContainer.appendChild(date);
	if (loggedUser) {
		if (loggedUser.userEmail == post.userEmail) {
			optionsContainer.appendChild(editBTN);
			optionsContainer.appendChild(deleteBTN);
		}
	}
    bottomContainer.appendChild(optionsContainer);
    postItem.appendChild(topContainer);
	postItem.appendChild(image);
	postItem.appendChild(title);
    postItem.appendChild(description);
    postItem.appendChild(bottomContainer);
    postContainer.insertBefore(postItem, postContainer.childNodes[0]);
}

async function generateNewPost(e) {
	const userName = loggedUser.userName;
	const userEmail = loggedUser.userEmail;

	const formData = new FormData(e.currentTarget);

	formData.append('postDate', new Date());
	formData.append('userName', userName);
    formData.append('userEmail', userEmail);

	if (validate.validateNewPost(formData)) {
		await singleton.createNewPost(formData);
		await updatePosts();
		goToHome();
	}
}

cancelEditBtn.addEventListener('click', () => closeModal());

newPostFile.addEventListener('change', () => {
    const formData = new FormData(newPostForm);
    renderPreview(formData);
});

editPostFile.addEventListener('change', () => {
    const formData = new FormData(editForm);
    renderPreview(formData);
});

newPostForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	loggedUser = await singleton.getLoggedUser();
	generateNewPost(e);
});