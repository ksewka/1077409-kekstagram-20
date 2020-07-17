'use strict';

(function () {
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

  // Отрисовка DOM элемента на странице, миниатюры фотографий
  var successHandler = function (posts) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < posts.length; j++) {
      fragment.appendChild(getPost(posts[j]));
    }
    pictures.appendChild(fragment);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    window.preview.created(posts);
  };

  var errorHandler = function (errorMessage) {
    window.util.errorHandler(errorMessage);
  };

  window.backend.load(successHandler, errorHandler);

  window.picture = {
    createdPictures: successHandler
  };

})();
