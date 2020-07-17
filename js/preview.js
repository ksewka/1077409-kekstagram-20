'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');
  var commentsLoader = document.querySelector('.comments-loader');
  var showedComment = {
    START: 5, // начинаем отсчет с 5 коммента,т к первые 5 видны
    STEP: 5, // шаг загрузки комментов
  };
  var nextShowedComment = showedComment.STEP;
  var currentCommentNumber = showedComment.START;
  var openCommentsCount = document.querySelector('.open-comments');
  var likesCount = document.querySelector('.likes-count');

  var closePopup = function () {
    bigPicture.classList.add('hidden');

    commentsLoader.classList.remove('hidden');
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


  document.querySelector('.social__comment-count').classList.remove('hidden');

  // Загрузка комментариев по 5 шт
  var showMoreComments = function () {
    var commentsList = document.querySelector('.social__comments');
    var allComments = commentsList.querySelectorAll('li');
    var hiddenComments = commentsList.querySelectorAll('.hidden');

    if (hiddenComments.length < showedComment.STEP) {
      hiddenComments.forEach(function (it) {
        it.classList.remove('hidden');
      });
      commentsLoader.classList.add('hidden');
      currentCommentNumber = showedComment.START;
      nextShowedComment = showedComment.STEP;
      openCommentsCount.textContent = allComments.length;
    } else {
      currentCommentNumber = nextShowedComment;
      nextShowedComment = currentCommentNumber + showedComment.STEP;
      for (var j = currentCommentNumber; j < nextShowedComment; j++) {
        allComments[j].classList.remove('hidden');
      }
      openCommentsCount.textContent = nextShowedComment;
    }
  };

  // Счетчик лайков
  var changeLikes = function () {
    likesCount.classList.toggle('likes-count--active');
    if (likesCount.classList.contains('likes-count--active')) {
      var countIncreased = Number.parseInt(likesCount.textContent);
      countIncreased++;
      likesCount.textContent = countIncreased;
    } else {
      var countDecrease = Number.parseInt(likesCount.textContent);
      countDecrease--;
      likesCount.textContent = countDecrease;
    }
  };


  // Заполняем bigPicture информацией из сервера
  var successHandler = function (posts) {
    var userPictures = document.querySelectorAll('.picture');
    userPictures.forEach(function (item, index) {
      item.addEventListener('click', function () {
        bigPicture.classList.remove('hidden');
        bigPicture.querySelector('.big-picture__img').querySelector('img').src = posts[index].url;
        bigPicture.querySelector('.likes-count').textContent = posts[index].likes;
        bigPicture.querySelector('.comments-count').textContent = posts[index].comments.length;

        // Проверяем количество комментов
        if (posts[index].comments.length < showedComment.START) {
          bigPicture.querySelector('.open-comments').textContent = posts[index].comments.length;
          commentsLoader.classList.add('hidden');
        } else {
          bigPicture.querySelector('.open-comments').textContent = showedComment.START;
          commentsLoader.focus();
        }

        bigPicture.querySelector('.social__caption').textContent = posts[index].description;
        showComments(index, posts);

        bigPicture.querySelector('.big-picture__cancel').addEventListener('click', function () {
          closePopup();
        });
        document.addEventListener('keydown', onPopupEcsClose);

        // Скрываем все комментарии кроме первых 5 шт
        var hiddenComments = document.querySelectorAll('.social__comment:nth-child(n+6)');
        hiddenComments.forEach(function (it) {
          it.classList.add('hidden');
        });
      });
    });

  };


  commentsLoader.addEventListener('click', function (evt) {
    evt.preventDefault();
    showMoreComments();
  });

  likesCount.addEventListener('click', function () {
    changeLikes();
  });

  var errorHandler = function (errorMessage) {
    window.util.errorHandler(errorMessage);
  };

  window.backend.load(successHandler, errorHandler);

  window.preview = {
    created: successHandler
  };

})();
