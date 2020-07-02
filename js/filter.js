'use strict';

(function () {
  var filterBtn = document.querySelectorAll('.img-filters__button');
  var randomPicturesAmount = 10;

  // Функция удаляет все карточки
  var destroyedPictures = function () {
    var allPictures = document.querySelectorAll('.picture');
    if (allPictures) {
      allPictures.forEach(function (item) {
        item.remove();
      });
    }
  };

  // Добавляем стиль активной кнопки
  var activateBtn = function () {
    filterBtn.forEach(function (item) {
      item.classList.remove('img-filters__button--active');
    });
    this.classList.add('img-filters__button--active');
  };

  // Добавление активного стиля для кнопки при клике
  filterBtn.forEach(function (item) {
    item.addEventListener('click', function () {
      activateBtn.bind(item)();
    });
  });

  var filtersMap = {
    'filter-default': function (collection) {
      destroyedPictures();
      window.picture.createdPictures(collection);
    },

    'filter-random': function (collection) {
      var randomArray = [];
      var array = Array.from(collection);
      for (var i = 0; i < randomPicturesAmount; i++) {
        var randomIndex = Math.floor(Math.random() * array.length);
        randomArray.push(array[randomIndex]);
        array.splice(randomIndex, 1);
      }
      destroyedPictures();
      window.picture.createdPictures(randomArray);
    },

    'filter-discussed': function (collection) {
      var array = Array.from(collection);
      var copyArray = array.slice().sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      destroyedPictures();
      window.picture.createdPictures(copyArray);
    }
  };

  var successHandler = function (allPictures) {
    var filteredPictures = allPictures;
    document.querySelector('.img-filters__form').addEventListener('click', function (evt) {
      filtersMap[evt.target.id](filteredPictures);
    });
  };

  var errorHandler = function () {
    console.log('oops');
  };

  window.backend.load(successHandler, errorHandler);
})();
