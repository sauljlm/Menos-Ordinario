import Singleton from './singleton';

export default class UI {
  constructor() {
    // elements
    
    // instances
    this.singleton = new Singleton();

    // events
  }

  render(songData) {
    // this.contCover.setAttribute('src', `img/covers/${songData.cover}`);
    // this.contCover.setAttribute('alt', `cover of ${songData.title}`);
    // this.contName.innerHTML = `${songData.title}`;
    // this.contActiveName.innerHTML = `${songData.title}`;
    // this.contArtist.innerHTML = `${songData.artist}`;
  }

  newPostItem() {
    const taskItem = document.createElement('li');

    taskItem.setAttribute('class', 'task-container');

    return taskItem;
  }

  newBottomContainerPost(task, newDate) {
    const bottomContainer = document.createElement('div');
    const date = this.newDatePost(newDate);
    const manager = this.newManagerPost(task);

    bottomContainer.setAttribute('class', 'task__bottom-container');

    bottomContainer.appendChild(date);
    bottomContainer.appendChild(manager);
    return bottomContainer;
  }

  newTopContainerPost(task) {
    const topContainer = document.createElement('div');
    const taskName = document.createElement('p');
    const priority = document.createElement('div');

    topContainer.setAttribute('class', 'task__top-container');
    taskName.setAttribute('class', 'task__name');
    priority.setAttribute('class', 'task__priority');

    if (task.taskPriority == 'Alta') {
      topContainer.classList.add('task-priority--hight');
    } else if (task.taskPriority == 'Media'){
      topContainer.classList.add('task-priority--medium');
    } else {
      topContainer.classList.add('task-priority--low');
    }

    taskName.innerHTML = `${task.taskName}`;
    priority.innerHTML = `Prioridad ${task.taskPriority}`;

    topContainer.appendChild(taskName);
    topContainer.appendChild(priority);

    return topContainer;
  }
  
  newDatePost(task, newDate) {
    const date = document.createElement('p');

    date.setAttribute('class', 'task__date');
    date.innerHTML= `${newDate}`;

    return date
  }

  newManagerPost(task) {
    const manager = document.createElement('p');

    manager.setAttribute('class', 'task__manager');
    manager.innerHTML = `${task.taskManager}`;

    return manager
  }

  newDescriptionPost(task) {
    const description = document.createElement('p');

    description.setAttribute('class', 'task__description');
    description.innerHTML = `${task.taskDescription}`;

    return description
  }


  // renderSongItem(dataSongs, song, index) {
  //   const item = document.createElement('li');
  //   item.setAttribute('data-id', `${dataSongs[index]._id}`);
  //   item.setAttribute('class', 'songs-list__item clearfix');
  
  //   const title = document.createElement('p');
  //   title.innerHTML = `${song.title} - ${song.artist}`;
  
  //   item.appendChild(title);
  
  //   return item;
  // }

  // cleanContainer(container) { 
  //   container.innerHTML = '';
  // }
}
