'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var pictures = document.querySelector('.pictures');

  // Создание DOM элемента
  var getPost = function (post) {
    var clonedPost = pictureTemplate.cloneNode(true);
    clonedPost.querySelector('.picture__img').src = post.url;
    clonedPost.querySelector('.picture__likes').textContent = post.likes;
    clonedPost.querySelector('.picture__comments').innerHTML = post.comments.length;
    return clonedPost;
  };

  // Отрисовка DOM элемента на странице
  var fragment = document.createDocumentFragment();
  var postsAmount = window.data.postsAmount;
  var posts = window.data.posts;
  for (var j = 0; j < postsAmount; j++) {
    fragment.appendChild(getPost(posts[j]));
  }
  pictures.appendChild(fragment);

  // Функция удаляет комментарии по умолчанию из разметки
  var destroyedComments = function () {
    var defaultComments = document.querySelectorAll('.social__comment');
    for (var k = 0; k < defaultComments.length; k++) {
      defaultComments[k].remove();
    }
  };

  // Функция вставляет сгенерированные комментарии в DOM
  var showComments = function (index) {
    var fragmentOfComments = document.createDocumentFragment();
    for (var l = 0; l < posts[index].comments.length; l++) {
      var clonedComment = bigPicture.querySelector('.social__comment').cloneNode(true);
      clonedComment.querySelector('img').src = posts[index].comments[l].avatar;
      clonedComment.querySelector('img').alt = posts[index].comments[l].name;
      clonedComment.querySelector('.social__text').textContent = posts[index].comments[l].message;
      fragmentOfComments.appendChild(clonedComment);
    }
    destroyedComments(); // Подчищаем комменты с разметки
    document.querySelector('.social__comments').appendChild(fragmentOfComments); // Вставляем сгенерированные на страницу
  };

  // Прячем блоки счётчика комментариев и загрузки новых комментариев
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');

  var closePopup = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEcsClose);
  };

  var onPopupEcsClose = function (evt) {
    if (evt.key === 'Escape') {
      closePopup();
    }
  };

  // Заполняем bigPicture информацией из первого элемента массива
  var showUserPicture = function (index) {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = posts[index].url;
    bigPicture.querySelector('.likes-count').textContent = posts[index].likes;
    bigPicture.querySelector('.comments-count').textContent = posts[index].comments.length;
    bigPicture.querySelector('.social__caption').textContent = posts[index].description;
    showComments(index);
    bigPicture.querySelector('.big-picture__cancel').addEventListener('click', function () {
      closePopup();
    });
    document.addEventListener('keydown', onPopupEcsClose);
  };

  var userPictures = document.querySelectorAll('.picture');

  userPictures.forEach(function (pic, index) {
    pic.setAttribute('tabindex', '0');
    pic.addEventListener('click', function () {
      showUserPicture(index);
    });
  });

})();
