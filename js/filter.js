'use strict';

(function () {
  var uploadPreview = document.querySelector('.img-upload__preview');
  var preloadImg = uploadPreview.querySelector('img');
  var effects = document.querySelectorAll('.effects__radio');
  var effectsList = document.querySelector('.effects__list');

  effectsList.addEventListener('change', function (evt) {
    for (var i = 0; i < effects.length; i++) {
      preloadImg.classList.remove('effects__preview--' + effects[i].value);
    }
    if (preloadImg) {
      preloadImg.classList.add('effects__preview--' + evt.target.value);
    }
  });

})();
