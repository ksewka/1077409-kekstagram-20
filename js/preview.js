'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');

  var closePopup = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEcsClose);
  };

  var onPopupEcsClose = function (evt) {
    if (evt.key === 'Escape') {
      closePopup();
    }
  };

  // Функция удаляет комментарии по умолчанию из разметки
  var destroyedComments = function () {
    var defaultComments = document.querySelectorAll('.social__comment');
    for (var k = 0; k < defaultComments.length; k++) {
      defaultComments[k].remove();
    }
  };

  // Функция вставляет сгенерированные комментарии в DOM
  var showComments = function (index, posts) {
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


  // Заполняем bigPicture информацией из сервера
  var successHandler = function (posts) {
    var userPictures = document.querySelectorAll('.picture');
    userPictures.forEach(function (item, index) {
      item.addEventListener('click', function () {
        bigPicture.classList.remove('hidden');
        bigPicture.querySelector('.big-picture__img').querySelector('img').src = posts[index].url;
        bigPicture.querySelector('.likes-count').textContent = posts[index].likes;
        bigPicture.querySelector('.comments-count').textContent = posts[index].comments.length;
        bigPicture.querySelector('.social__caption').textContent = posts[index].description;
        showComments(index, posts);

        bigPicture.querySelector('.big-picture__cancel').addEventListener('click', function () {
          closePopup();
        });
        document.addEventListener('keydown', onPopupEcsClose);
      });
    });
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: white; margin-top: 150px; width: 400px';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

})();
