'use strict';

(function () {


  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var scale = document.querySelector('.scale');
  var uploadInput = document.querySelector('#upload-file');
  var comments = document.querySelector('.text__description');
  var maxLengthOfComments = 140;
  var hashtagsInput = document.querySelector('.text__hashtags');


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

  // Заполняем bigPicture информацией из первого элемента массива
  bigPicture.classList.remove('hiddenn');
  bigPicture.querySelector('.big-picture__img').src = posts[0].url;
  bigPicture.querySelector('.likes-count').textContent = posts[0].likes;
  bigPicture.querySelector('.comments-count').textContent = posts[0].comments.length;
  bigPicture.querySelector('.social__caption').textContent = posts[0].description;

  // Функция удаляет комментарии по умолчанию из разметки
  var destroyedComments = function () {
    var defaultComments = document.querySelectorAll('.social__comment');
    for (var k = 0; k < defaultComments.length; k++) {
      defaultComments[k].remove();
    }
  };

  // Функция вставляет сгенерированные комментарии в DOM
  var showComments = function () {
    var fragmentOfComments = document.createDocumentFragment();
    for (var l = 0; l < posts[0].comments.length; l++) {
      var clonedComment = bigPicture.querySelector('.social__comment').cloneNode(true);
      clonedComment.querySelector('img').src = posts[0].comments[l].avatar;
      clonedComment.querySelector('img').alt = posts[0].comments[l].name;
      clonedComment.querySelector('.social__text').textContent = posts[0].comments[l].message;
      fragmentOfComments.appendChild(clonedComment);
    }
    destroyedComments(); // Подчищаем комменты с разметки
    document.querySelector('.social__comments').appendChild(fragmentOfComments); // Вставляем сгенерированные на страницу
  };

  showComments();

  // Прячем блоки счётчика комментариев и загрузки новых комментариев
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');

  var onPopupEcsClose = function (evt) {
    if (evt.key === 'Escape' && hashtagsInput !== document.activeElement && comments !== document.activeElement) {
      closePopup();
    }
  };

  var closePopup = function () {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEcsClose);
    scale.removeEventListener('click', scaleChangeHandler);
    uploadInput.value = '';
  };

  // Форма редактирования открывается при загрузке фотографии

  uploadInput.onchange = function () {
    document.querySelector('body').classList.add('modal-open');
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    document.querySelector('.img-upload__cancel').addEventListener('click', function () {
      closePopup();
    });
    document.addEventListener('keydown', onPopupEcsClose);
    scale.addEventListener('click', scaleChangeHandler);
    hashtagsInput.addEventListener('input', hashtagValidateHandler);
    comments.addEventListener('input', commentsValidateHandler);
  };

  var hashtagValidateHandler = function () {
    window.hashtags.validate();
  };
  var scaleChangeHandler = function () {
    window.scale.zooming();
  };
  var commentsValidateHandler = function () {
    comments.setCustomValidity('Длина комментария не может составлять больше 140 символов');
  };

})();
