'use strict';

(function () {

  var scale = document.querySelector('.scale');
  var uploadInput = document.querySelector('#upload-file');
  var comments = document.querySelector('.text__description');
  var hashtagsInput = document.querySelector('.text__hashtags');
  var popupEscCloseHandler = function (evt) {
    if (evt.key === 'Escape' && hashtagsInput !== document.activeElement && comments !== document.activeElement) {
      closePopup();
    }
  };

  var closePopup = function () {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', popupEscCloseHandler);
    scale.removeEventListener('click', scaleChangeHandler);
    hashtagsInput.removeEventListener('input', hashtagValidateHandler);
    uploadInput.value = '';
    window.slider.defaultSettings();
    window.scale.defaultSettings();
  };

  var hashtagValidateHandler = function () {
    window.hashtags.validate();
  };
  var scaleChangeHandler = function () {
    window.scale.zooming();
  };

  // Замена изображения
  var changeImgSrc = function () {
    var preview = document.querySelector('.img-upload__preview').querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];
    var smallPreview = document.querySelectorAll('.effects__preview');
    var reader = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
      smallPreview.forEach(function (it) {
        it.style.backgroundImage = 'url(' + reader.result + ')';
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = '';
    }
  };

  // Форма редактирования открывается при загрузке фотографии
  uploadInput.onchange = function () {
    document.querySelector('body').classList.add('modal-open');
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    document.querySelector('.img-upload__cancel').addEventListener('click', function () {
      closePopup();
    });
    changeImgSrc();
    document.addEventListener('keydown', popupEscCloseHandler);
    scale.addEventListener('click', scaleChangeHandler);
    hashtagsInput.addEventListener('input', hashtagValidateHandler);
  };

})();
